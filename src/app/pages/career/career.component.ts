import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
joblist:any;
  constructor(private apiservice:apiService,
    private route:Router) { }

  ngOnInit() {
    this.getJobs();
  }



  getJobs(){

    this.apiservice.get('joblist').subscribe(list=>{

      this.joblist=list;

    });
}
jobdetail(id){

  localStorage.setItem("jobid",id);
this.route.navigateByUrl("careerdetail")
}
}