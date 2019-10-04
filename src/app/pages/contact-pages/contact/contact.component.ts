import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2'
import { AngularButtonLoaderService } from 'angular-button-loader';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean;


  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService,
    private loaderbutton:AngularButtonLoaderService) { }

  ngOnInit() {
    this.contactForm= new FormGroup({
      Fullname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

      message: new FormControl('', [Validators.required]),

    })
  }
  contactUs(val){
    this.submitted=true;
    //this.spinner.show();
    if(this.contactForm.valid){
      this.loadingBar.start();
      this.loaderbutton.displayLoader();
     
      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('contactUs', val)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);

          //this.spinner.hide();
          this.loadingBar.complete();
        this.loaderbutton.hideLoader();
          return throwError(err);
        })
      )
      .subscribe(
        (res: any) => {
          this.loadingBar.complete();

          this.loaderbutton.hideLoader();
          $("#contactform").trigger("reset");
          if (res.status === 200) {
            Swal.fire({
              title: 'Thank you we will contact you soon!',
        
              type: 'success',
            
            })
            //this.spinner.hide();
            this.loadingBar.complete();

            this.loaderbutton.hideLoader();
           
          }

        })




  }
  else{
    return;
  }
  }

}
