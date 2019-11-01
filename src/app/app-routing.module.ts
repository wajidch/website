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
import { CareerComponent } from './pages/career/career.component';
import { CareerDetailComponent } from './pages/career-detail/career-detail.component';


const routes: Routes = [

      { path:'',component:HomeComponent,data: {title: 'Home | Appflox'}},
      { path:'about',component:AboutComponent,data: {title: 'About Us | Appflox'}},
      { path:'blog',component:BlogComponent,data: {title: 'Blog | Appflox'}},
      { path:'webservice',component:WebServicePageComponent,data: {title: 'Web Development | Appflox'}},
      { path:'mobileservice',component:MobileServicePageComponent,data: {title: 'Mobile Development | Appflox'}},
      { path:'contact',component:ContactComponent,data: {title: 'Contact Us | Appflox'}},
      { path:'seoservice',component:SeoServiceComponent,data: {title: 'SEO | Appflox'}},
      { path:'uxuiservice',component:UxuiServiceComponent,data: {title: 'UI/UX | Appflox'}},
      { path:'career',component:CareerComponent,data: {title: 'Career | Appflox'}},
      { path:'careerdetail',component:CareerDetailComponent,data: {title: 'Career Detail | Appflox'}},

      { path:'contentservice',component:ContentServiceComponent,data: {title: 'Content Writing | Appflox'}},
  
      {path:'**',redirectTo:'',pathMatch:'full',data: {title: 'Home | Appflox'}}
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
