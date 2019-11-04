import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
declare var jquery: any;
declare var $: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {

  jobid= localStorage.getItem("jobid");
  detailist: any;
  file: any;
  jobForm: any;
  recaptcha: any;
  submitted: boolean;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;
  
  @ViewChild('captchaElem', { static: false }) captchaElem: InvisibleReCaptchaComponent;
siteKey=environment.siteKey;
  constructor(private apiservice:apiService, private cdr: ChangeDetectorRef,
    private loadingBar:LoadingBarService) { }
applyJobObj={
  fullname:'',
  email:'',
  phone:'',
  subject:'',
  message:''
}


  ngOnInit() {
    this.getdetailofjob()
    this.jobForm= new FormGroup({
      name :new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

      message: new FormControl('', [Validators.required]),
     
      
    })
  }
  
  execute(): void {
   try {
    this.captchaElem.execute();
   } catch (error) {
     
   }
    
 
  }

  handleReset(): void {
    try {
      this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.cdr.detectChanges();
    } catch (error) {
      
    }
    
  }

  handleSuccess(captchaResponse: string): void {
    try {
      this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
    } catch (error) {
      
    }
    
  }

  handleLoad(): void {
    try {
      this.captchaIsLoaded = true;
    this.cdr.detectChanges();
    } catch (error) {
      
    }
    
  }

  handleReady(): void {
    try {
      this.captchaIsReady = true;
      this.cdr.detectChanges();
    } catch (error) {
      
    }

  }
  uploadFile(event){
 this.file = event.target.files[0];

  }
  applyforjob(val){
    this.submitted=true;

    if(this.jobForm.valid){
      this.loadingBar.start();
      this.submitted=false
      $("#applyjob").css("cursor", 'not-allowed');
    $("#applyjob").attr("disabled", true);
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('email',val.email)
    formData.append('message',val.message)
    formData.append('phone',val.phone)
    formData.append('subject',val.subject)
    formData.append('name',val.name)
    
    this.apiservice.post("api/job/store",formData)  
    .pipe(
      catchError(err => {

        if (err.status === 404) {
          this.loadingBar.complete();
       
     
        }
        else {
        
   
          this.loadingBar.complete();
        
        }
        $("#applyjob").css("cursor", 'pointer');
        $("#applyjob").attr("disabled", false);
        Swal.fire({
          title: 'Invalid file format!',
    
          type: 'error',
        
        })
        return throwError(err);
      })
    )
    .subscribe((res: any) => {

      this.loadingBar.complete();
      if (res.status === 200) {
        $("#applyjob").css("cursor", 'pointer');
        $("#applyjob").attr("disabled", false);
        this.loadingBar.complete();
        Swal.fire({
          title: 'Applied for Job,Thank You!',
    
          type: 'success',
        
        })
        $("#applyjobform").trigger("reset");
        //this.spinner.hide();

      }

  
    })
  }
  }
  getdetailofjob(){
    this.apiservice.get(`career/${this.jobid}`).subscribe((list:any)=>{
      this.loadingBar.start();
      this.detailist=list.body.data
      this.loadingBar.complete();
 
    })
  }

}
