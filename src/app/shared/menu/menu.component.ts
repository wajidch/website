import { environment } from './../../../environments/environment';
import { Component, OnInit,HostListener, Inject, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
declare var jquery: any;
declare var $: any;
import { DOCUMENT } from '@angular/common';
import { ReCaptchaV3Service, InvisibleReCaptchaComponent } from 'ngx-captcha';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
userName=localStorage.getItem('user_name');
token=localStorage.getItem('token');
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
    private titleService: Title,
    private reCaptchaV3Service: ReCaptchaV3Service,
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
    // this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
    //   console.log('This is your token: ', token);
    // }, {
    //     useGlobalDomain: false
    // });
  
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
   
    this.captchaElem.execute();
    this.submitted=true;
    //this.spinner.show();
    if(this.QuoteForm.valid){
      $("#sendRequest").css("cursor", 'not-allowed');
      $("#sendRequest").attr("disabled", true);

      this.loadingBar.start();

      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('api/quote', val)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);

          //this.spinner.hide();
          this.loadingBar.complete();
        
          return throwError(err);
        })
      )
      .subscribe(
        (res: any) => {
          this.loadingBar.complete();

            this.loadingBar.complete();

           
            $("#quoteform").trigger("reset");

            Swal.fire({
              title: 'Thank you we will contact you soon!',
        
              type: 'success',
           
            
            })
            
            $("#sendRequest").css("cursor", 'pointer');
            $("#sendRequest").attr("disabled", false);;

            $(".close").click();
            //this.spinner.hide();
           
          

        })




  }
  else{
    return;
  }
  }
  home(){
    $("#home").addClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").removeClass('active');
    $("#career").removeClass('active');

  }
  
  about(){
    $("#home").removeClass('active');
    $("#about").addClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#career").removeClass('active');
    $("#contact").removeClass('active');
  }
  service(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").addClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#career").removeClass('active');
    $("#contact").removeClass('active');
  }
  work(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").addClass('active');
    $("#blog").removeClass('active');
    $("#career").removeClass('active');
    $("#contact").removeClass('active');
  }
  blog(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").addClass('active');
    $("#career").removeClass('active');
    $("#contact").removeClass('active');
  }
  contact(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").addClass('active');
    $("#career").removeClass('active');
  }
  career(){
    $("#home").removeClass('active');
    $("#about").removeClass('active');
    $("#service").removeClass('active');
    $("#work").removeClass('active');
    $("#blog").removeClass('active');
    $("#contact").removeClass('active');
    $("#career").addClass('active');
  }

}
