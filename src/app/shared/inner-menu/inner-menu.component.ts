import { Component, OnInit,HostListener, Inject, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
declare var jquery: any;
declare var $: any;
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inner-menu',
  templateUrl: './inner-menu.component.html',
  styleUrls: ['./inner-menu.component.css']
})
export class InnerMenuComponent implements OnInit {
  QuoteForm: FormGroup;
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
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) document
    ) { }

  ngOnInit() {
    this.QuoteForm= new FormGroup({
      Fullname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
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
  // Hide Header on on scroll down
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 550) {
       let element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      let element = document.getElementById('navbar');
        element.classList.remove('sticky'); 
     }
  }
  sendRequest(val){
    $("#sendRequest").css("cursor", 'not-allowed');
    $("#sendRequest").attr("disabled", true);
    this.captchaElem.execute();
    this.submitted=true;
    //this.spinner.show();
    if(this.QuoteForm.valid){
      this.loadingBar.start();

      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('quote', val)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.loadingBar.complete();

        
          this.loadingBar.complete();
        
          return throwError(err);
        })
      )
      .subscribe(
        (res: any) => {
          this.loadingBar.complete();

   

            this.loadingBar.complete();
            //this.spinner.hide();
            Swal.fire({
              title: 'Thank you we will contact you soon!',
        
              type: 'success',
           
            
            })
            $("#sendRequest").css("cursor", 'pointer');
            $("#sendRequest").attr("disabled", false);
            $(".close").click();

        })




  }
  else{
    return;
  }
  }
  about(){
    $("#home").removeClass('active');
    $("#about").addClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").removeClass('active');
  }
  service(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").addClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").removeClass('active');
  }
  work(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").addClass('active');
    $("#blog").removeClass('active');
    $("#contact").removeClass('active');
  }
  blog(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").addClass('active');
    $("#contact").removeClass('active');
  }
  contact(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").addClass('active');
  }
}
