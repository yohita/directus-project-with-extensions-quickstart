import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { ApiService } from './api.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    alertService: any;
    constructor(private apiService:ApiService, private toastController: ToastController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       
        setTimeout(()=>{                           // <<<---using ()=> syntax
       // this.apiService.globalloading=false;
       // console.log('here');
        }, 500);

        return next.handle(request).pipe(catchError(err => {
          

            let errormsg="Something went wrong, Please wait for a moment.";
            
            let error=err.error;

            if(err.error.error){
                this.apiService.present_toast('error',err.error.error);
            }

            let errors=err.errors ?? err.error.errors;
            if(errors){
                if(errors[0].message.includes('nknown')){
                    errormsg="Something went wrong, Please wait for a moment.";
                }else{
                    errormsg=errors[0].message;
                }
                this.apiService.present_toast('error',errormsg);
            }

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                //this.apiService.logout();
                //this.apiService.storage_clear();
                  location.href="/";
            }
            return throwError(error);
        }))
    }
}
