import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd ,ActivatedRoute} from '@angular/router'
import { catchError,filter, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiService } from './services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { authService } from './services/auth.service';
import { Title } from '@angular/platform-browser';

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
    private authenticationService: authService,
    private titleService:Title,
    private activatedRoute:ActivatedRoute) {
      
     }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  
    this.router.events.subscribe((route)=>{
      if(route instanceof NavigationEnd){
        
        if(route.url==='/'){
            this.showMainheader=true;
            this.showInnerHeader=false;
            
            
        }
        else if(route.url==='/about' ||route.url==='/blog'
         ||route.url==='/webservice'||route.url==='/mobileservice' 
         ||route.url==='/seoservice' || route.url==='/contentservice' 
         || route.url==='/uxuiservice'  ||route.url==='/contact'
          || route.url==='/career' || route.url==='/careerdetail'  ){
          
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
