import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ApiService} from './api.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private apiService:ApiService) {
        //console.log("AuthGuard")
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const currentUser = this.apiService.currentUserValue; 
        if (currentUser) { 
            return true; 
        }

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}