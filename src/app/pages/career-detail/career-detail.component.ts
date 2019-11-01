import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var jquery: any;
declare var $: any;
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
  constructor(private apiservice:apiService) { }
applyJobObj={
  fullname:'',
  email:'',
  phone:'',
  subject:'',
  message:''
}


  ngOnInit() {
    this.jobForm= new FormGroup({
      fullname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

      message: new FormControl('', [Validators.required]),
      recaptcha: new FormControl([this.recaptcha, Validators.required]),
      
    })
  }
  uploadFile(event){
 this.file = event.target.files[0];

  }
  applyforjob(){
    this.submitted=true;
    if(this.jobForm.valid){
      this.submitted=false
      $("#applyjob").css("cursor", 'not-allowed');
    $("#applyjob").attr("disabled", true);
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.apiservice.post("applyjob",this.applyJobObj).subscribe(data=>{

    })
  }
  }
  getdetailofjob(){
    this.apiservice.get(`detail?id=${this.jobid}`).subscribe(list=>{
      this.detailist=list
    })
  }

}
