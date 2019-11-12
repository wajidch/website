import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
joblist:any;
  pages: any[];
  pager = {
    current_page: 1
  };
  constructor(private apiservice:apiService,
    private route:Router, private loadingBar:LoadingBarService) { }

  ngOnInit() {
    this.getJobs(1);
  }



  getJobs(page){

   

    this.loadingBar.start()
    this.apiservice.get(`career/all?page=${page}`)

      .pipe(
        catchError(err => {

          if (err.status === 404) {
            this.loadingBar.complete();
         
            this.pages = [];
          }
          else {
          
            this.pages = [];
            this.loadingBar.complete();
          
          }
          return throwError(err);
        })
      )
      .subscribe((res: any) => {

        this.loadingBar.complete();
        if (res.status === 200) {
          this.loadingBar.complete();
          this.pager = res.body.data;
          this.pages = []
          for (let i = 1; i <= res.body.data.last_page; i++) {
            this.pages.push(i)
          }
          this.joblist=res.body.data.data;
       
          //this.spinner.hide();

        }

        if (res.status === 404) {
          this.joblist= [];
          this.loadingBar.complete();
       
          //this.spinner.hide();
        }
      })
}

loadPage(page) {
  this.getJobs(page)
}
jobdetail(id){

  localStorage.removeItem('jobid');
  localStorage.setItem("jobid",id);
  // this.route.navigate(['careerdetail'], { queryParams: { id: id } });
  this.route.navigateByUrl(`careerdetail?id=${id}`)
}
}