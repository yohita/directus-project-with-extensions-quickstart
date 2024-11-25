import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  model:any={};
  loading=false;

  returnUrl: string='';
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit() {
  }

  formSubmit($event:any){
    this.loading=true;
    console.log(this.model);
//    this.apiService.is_autologout=false;
    this.apiService.auth('login',this.model).subscribe((response:any)=>{
      console.log(response);
      this.loading=false;
      this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });

    },(error:any)=>{
      this.loading=false;
      console.log(error);
    })
  }

}
