import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {

  jobid= localStorage.getItem("jobid");
  detailist: any;
  constructor(private apiservice:apiService) { }
applyJobObj={
  fullname:'',
  email:'',
  phone:'',
  subject:'',
  message:''
}


  ngOnInit() {
  }
  applyforjob(){

    this.apiservice.post("applyjob",this.applyJobObj).subscribe(data=>{

    })
  }
  getdetailofjob(){
    this.apiservice.get(`detail?id=${this.jobid}`).subscribe(list=>{
      this.detailist=list
    })
  }
}
