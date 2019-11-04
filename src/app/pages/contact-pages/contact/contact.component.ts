import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2'
import { AngularButtonLoaderService } from 'angular-button-loader';
import { environment } from 'src/environments/environment';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
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
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;
  public recaptcha: any = null;
  @ViewChild('captchaElem', { static: false }) captchaElem: InvisibleReCaptchaComponent;
siteKey=environment.siteKey;

  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService,
    private loaderbutton:AngularButtonLoaderService,
    private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.contactForm= new FormGroup({
      Fullname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

      message: new FormControl('', [Validators.required]),
      recaptcha: new FormControl([this.recaptcha, Validators.required])

    })
  }
  
  execute(): void {
    console.log("captaha",this.recaptcha)
    this.captchaElem.execute();
 
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  handleReady(): void {
    this.captchaIsReady = true;
    this.cdr.detectChanges();
  }
  contactUs(val){
    
    this.submitted=true;
    //this.spinner.show();
    if(this.contactForm.valid){
      $("#contactRequest").css("cursor", 'not-allowed');
    $("#contactRequest").attr("disabled", true);
      this.loadingBar.start();
      this.loaderbutton.displayLoader();
     
      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('api/contactUs', val)
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
            $("#contactRequest").css("cursor", 'pointer');
            $("#contactRequest").attr("disabled", false);
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
