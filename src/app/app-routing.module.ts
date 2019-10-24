import { MobileServicePageComponent } from './pages/service-pages/mobile-service-page/mobile-service-page.component';
import { WebServicePageComponent } from './pages/service-pages/web-service-page/web-service-page.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact-pages/contact/contact.component';
import { SeoServiceComponent } from './pages/service-pages/seo-service/seo-service.component';
import { UxuiServiceComponent } from './pages/service-pages/uxui-service/uxui-service.component';
import { ContentServiceComponent } from './pages/service-pages/content-service/content-service.component';

const routes: Routes = [

      { path:'',component:HomeComponent,data: {title: 'Appflox | Home'}},
      { path:'about',component:AboutComponent,data: {title: 'Appflox | About Us'}},
      { path:'blog',component:BlogComponent,data: {title: 'Appflox | Blog'}},
      { path:'webservice',component:WebServicePageComponent,data: {title: 'Appflox | Web Development'}},
      { path:'mobileservice',component:MobileServicePageComponent,data: {title: 'Appflox | Mobile Development'}},
      { path:'contact',component:ContactComponent,data: {title: 'Appflox | Contact Us'}},
      { path:'seoservice',component:SeoServiceComponent,data: {title: 'Appflox | SEO'}},
      { path:'uxuiservice',component:UxuiServiceComponent,data: {title: 'Appflox | UXUI'}},
      { path:'contentservice',component:ContentServiceComponent,data: {title: 'Appflox | Content Writing'}},
      {path:'**',redirectTo:'',pathMatch:'full',data: {title: 'Appflox | Home'}}
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
