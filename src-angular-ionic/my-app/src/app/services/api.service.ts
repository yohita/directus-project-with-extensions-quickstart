import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  //only if running on locally load from environment else load from the server
  public portal_url = location.href.includes('8100')? environment.portal_url : '';
  
  constructor( private http: HttpClient, public toastController: ToastController , public alertController: AlertController) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }


   auth(action:any='login',payload:any={},provider:any=''){
    let is_matrix=false;
    let url=this.portal_url+'/auth';
    let method='post';
        switch(action){
          case 'login': 
            url+='/login';
          break;
        }

       // if(method=='post'){
          //send POST request
          return this.http.post<any>(url, payload).pipe(
            map((res) => {
            //  console.log(res);
              if (res.data?.access_token) { 
                res.data.date_created=new Date();   
                document.cookie = `directus_refresh_token=${res.data.refresh_token}; path=/;`;  
              }
              return res;
            })
          );
        //  }

    }
    
 async getSetCurrentUser(){
    try {

      let rt = await this.http.post<any>(this.portal_url+'/auth/refresh', {refresh_token:this.getCookie('directus_refresh_token')},{withCredentials:true}).toPromise();
     // console.log(rt);
        if(rt?.data?.access_token){

          if(this.getCookie('directus_refresh_token')){
            document.cookie = `directus_refresh_token=${rt.data.refresh_token}; path=/;`;
          }

      let params={access_token:rt.data.access_token};
      let r = await this.http.get<any>(this.portal_url+'/users/me', {
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
        console.log(location.href);
       if(location.href.includes('auth')){
        console.log('auth page running on dev mode');
        
       }
       else if(location.href.includes('8100')){ 
        // Code is running in the browser dev mode
        location.href = '/auth';
      }
      else if (window.top && window.top !== window.self) {
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

  async presentAlertConfirm(header:any,message:any,ok:any='OK',cancel:any='Cancel') {
    //create alert controller and return yes for true and false for no

     return new Promise((resolve) => {
       const alert = this.alertController.create({
         header: header,
         message: message,
         backdropDismiss: false,
         buttons: [
          
           {
             text: ok,
             handler: () => {
               resolve(true);
             },
           },
           {
             text: cancel,
             role: 'cancel',
             handler: () => {
               resolve(false);
             },
           },
         ],
       });
       alert.then((alert: { present: () => any }) => alert.present());
     });


 }

  getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

}
