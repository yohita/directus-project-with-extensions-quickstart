import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service'; 

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private apiService:ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        
        //currentUser?.token ?? 
        let currentUser = this.apiService.currentUserValue; 
        let cu_token = currentUser?.session.access_token;

        if ((cu_token) && !( request.url.includes('/auth/refresh')|| request.url.includes('/custom-login'))) {
            
            
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${cu_token}`
                    }
                });
         

         }

        return next.handle(request);
    }
}