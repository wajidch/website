import { MobileServicePageComponent } from './pages/service-pages/mobile-service-page/mobile-service-page.component';
import { WebServicePageComponent } from './pages/service-pages/web-service-page/web-service-page.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InnerMenuComponent } from './shared/inner-menu/inner-menu.component';
import { ContactComponent } from './pages/contact-pages/contact/contact.component';
// import { LoginComponent } from './users/login/login.component';


const routes: Routes = [
  { path:'',component:HomeComponent},

 
      { path:'about',component:AboutComponent},
      { path:'blog',component:BlogComponent},
      { path:'webservice',component:WebServicePageComponent},
      { path:'mobileservice',component:MobileServicePageComponent},
      { path:'contact',component:ContactComponent},
      {path:'**',redirectTo:'',pathMatch:'full'}
      
    
  
 



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
