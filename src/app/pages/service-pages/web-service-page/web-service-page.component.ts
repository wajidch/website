import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-web-service-page',
  templateUrl: './web-service-page.component.html',
  styleUrls: ['./web-service-page.component.css']
})
export class WebServicePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.owl-carousel').owlCarousel({
      
      nav:true,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:5
        }
    }
  })
  }

}
