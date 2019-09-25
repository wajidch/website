import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private loadingBar:LoadingBarService,) { }

  ngOnInit() {
    this.contactForm= new FormGroup({
      name:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

      message: new FormControl('', [Validators.required]),

    })
  }
  contactUs(val){
    this.loadingBar.start();
    this.submitted=true;
    //this.spinner.show();
    if(this.contactForm.valid){

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
            this.loadingBar.complete();
           
          }

        })




  }
  else{
    return;
  }
  }

}
