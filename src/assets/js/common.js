
// OWL Carousel
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



// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar').outerHeight();

$(window).scroll(function(event){
   didScroll = true;
});

setInterval(function() {
   if (didScroll) {
       hasScrolled();
       didScroll = false;
   }
}, 500);

function hasScrolled() {
   var st = $(this).scrollTop();
   
   // Make sure they scroll more than delta
   if(Math.abs(lastScrollTop - st) <= delta)
       return;
   
   // If they scrolled down and are past the navbar, add class .nav-up.
   // This is necessary so you never see what is "behind" the navbar.
   if (st > lastScrollTop && st > navbarHeight){
       // Scroll Down
       $('.navbar').addClass('sticky');
   } else {
       // Scroll Up
       if(st + $(window).height() < $(document).height()) {
           $('.navbar').removeClass('sticky');
       }
   }
     lastScrollTop = st;
}