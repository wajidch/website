import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  emailSubscribe: FormGroup;
  submitted: boolean;
  constructor(private apiservice:apiService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private loadingBar:LoadingBarService,) { }

  ngOnInit() {
      
    this.emailSubscribe= new FormGroup({
      email: new FormControl('', [Validators.required,
      Validators.email]),
     

    })
  }
  subscribe(val){
    this.submitted=true;
    //this.spinner.show();
    if(this.emailSubscribe.valid){
      this.loadingBar.start();

      this.submitted=false;
    
    this.loadingBar.start();
    this.apiservice.get(`subscribers.php?email=${val.email}`)
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

}
