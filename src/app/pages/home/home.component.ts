import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.owl-carousel').owlCarousel({
      loop:true,
      nav:true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:2
          }
      }
  })
  
  }

}
