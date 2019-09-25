import { Component, OnInit ,HostListener, Inject } from '@angular/core';
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

@Component({
  selector: 'app-inner-menu',
  templateUrl: './inner-menu.component.html',
  styleUrls: ['./inner-menu.component.css']
})
export class InnerMenuComponent implements OnInit {
  QuoteForm: FormGroup;
  submitted: boolean;
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService,
    @Inject(DOCUMENT) document
    ) { }

  ngOnInit() {
    this.QuoteForm= new FormGroup({
      name:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),

    })
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
    this.loadingBar.start();

    this.submitted=true;
    //this.spinner.show();
    if(this.QuoteForm.valid){

      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('sendrequest', val)
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
          if (res.status === 200) {

            this.loadingBar.complete();
            //this.spinner.hide();
           
          }

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
