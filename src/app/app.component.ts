import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiService } from './services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { authService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showheader:boolean;
  currentUser:any;
  showlogin: boolean;
  showcreateaccount: boolean;
  showdemocreateaccount:boolean;
  showMainheader: boolean;
  showInnerHeader: boolean;
  constructor( public router: Router,
    private apiservice:apiService,
    private loadingBar:LoadingBarService,
    private authenticationService: authService) {
      
     }

  ngOnInit() {
    this.router.events.subscribe((route)=>{
      if(route instanceof NavigationEnd){
        
        if(route.url==='/'){
            this.showMainheader=true;
            this.showInnerHeader=false;
            
            
        }
        else if(route.url==='/about' ||route.url==='/blog'
         ||route.url==='/webservice'||route.url==='/mobileservice' ||route.url==='/contact'   ){
          
          this.showMainheader=false;
          this.showInnerHeader=true;
          
        }
        else{
          this.showMainheader=true;
          this.showInnerHeader=false;
        }
       
      
      }
    })
    this.currentUser=localStorage.getItem('token');
  }
  
}
