import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public apiService:ApiService) {}
  
  ngOnInit() {
     this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
    this.apiService.getSetCurrentUser();     
    },400);
  }

  async logout(){
    this.apiService.presentAlertConfirm('Logout','Are you sure you want to logout?','logout').then((res:any)=>{
      if(res){
        //delete the refresh token
        document.cookie = `directus_refresh_token=; path=/;`;
         location.href="/admin/logout";
            }
          
        });
      }

}
