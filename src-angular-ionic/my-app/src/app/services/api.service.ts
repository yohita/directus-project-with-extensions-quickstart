import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor( private http: HttpClient, public toastController: ToastController) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }

 async getSetCurrentUser(){
    try {

      let rt = await this.http.post<any>('/auth/refresh', {},{withCredentials:true}).toPromise();
      console.log(rt);
        if(rt?.data?.access_token){


      let params={access_token:rt.data.access_token};
      let r = await this.http.get<any>('/users/me', {
        params: params
      ,withCredentials:true}).toPromise();

        let udata=r.data;

        if(udata){
          udata.session=rt.data;
          localStorage.setItem('currentUser', JSON.stringify(udata));
          this.currentUserSubject.next(udata);
        }

      }

    }
    catch (error:any) {
       localStorage.removeItem('currentUser');
      if (window.top && window.top !== window.self) {
        // Code is running inside an iframe
        window.top.location.href = '/admin/login?redirect=custom-app';
      } else {
        // Code is running in the main window
        window.location.href = '/admin/login?redirect=custom-app';
      }
       //this.present_toast('error','Error',error.error.message);
       //location.href = '/admin/login';
    }
  }


  async present_toast(type:any, header:any, msg = '',options:any={}) {
    let color = 'primary';
    //console.log(type);
    switch (type) {
      case 'success':
        color = 'success';
        break;

      case 'info':
        color = 'success';
        break;

      case 'error':
        color = 'danger';
        break;

      default:
        color = 'primary';
    }
    const toast = await this.toastController.create({
      header: header,
      message: msg ?? '',
      duration: options.duation ?? 3000,
      color: color,
      position: 'top',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

}
