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

      { path:'',component:HomeComponent},
      { path:'about',component:AboutComponent},
      { path:'blog',component:BlogComponent},
      { path:'webservice',component:WebServicePageComponent},
      { path:'mobileservice',component:MobileServicePageComponent},
      { path:'contact',component:ContactComponent},
      { path:'seoservice',component:SeoServiceComponent},
      { path:'uxuiservice',component:UxuiServiceComponent},
      { path:'contentservice',component:ContentServiceComponent},
      {path:'**',redirectTo:'',pathMatch:'full'}
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
