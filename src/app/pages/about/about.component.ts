import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DOCUMENT } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AngularButtonLoaderService } from 'angular-button-loader';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  QuoteForm: FormGroup;
  submitted: boolean;
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService,
    private loaderbutton:AngularButtonLoaderService,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
    
    this.QuoteForm= new FormGroup({
      Fullname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),

    })
  
  }
  sendRequest(val){
    this.submitted=true;
    //this.spinner.show();
    if(this.QuoteForm.valid){
      this.loadingBar.start();
      this.loaderbutton.displayLoader();

      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.post('quote', val)
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

            this.loadingBar.complete();
            this.loaderbutton.hideLoader();
             $("#aboutquoteform").trigger("reset");

            Swal.fire({
              title: 'Thank you we will contact you soon!',
        
              type: 'success',
           
            
            })
            //this.spinner.hide();
            $(".close").click();
          

        })




  }
  else{
    return;
  }
  }

}
