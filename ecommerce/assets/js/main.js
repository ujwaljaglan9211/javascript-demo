(function($) {
  'use strict';
  // Add or remove class on topbar & header on scroll
  var header = $("#header");
  var topbar = $("#topbar");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      header.addClass("header-scrolled");
      topbar.addClass("topbar-scrolled");
    } else {
      header.removeClass("header-scrolled");
      topbar.removeClass("topbar-scrolled");
    }
  });
  // Define selector for selecting anchor links with the hash 
  let anchorSelector = 'a[href^="#"]'; 
  $(anchorSelector).on('click', function (e) {  
    // Prevent scrolling if the hash value is blank 
    e.preventDefault(); 
    // Get the destination to scroll to using the hash property 
    let destination = $(this.hash); 
    // Get the postion of the destination using the coordinates returned by offset() method 
    let scrollPosition = destination.offset().top - 150; 
    // Specify animation duration 
    let animationDuration = 500; 
    // Animate the html/body with  the scrollTop() method 
    $('html, body').animate({ 
        scrollTop: scrollPosition 
    }, animationDuration); 
  }); 
  // products slider (uses the Owl Carousel library)
  $(".all-products-slider").owlCarousel({
    autoplay: true,
    infinite: true,
    margin:20,
    dots: true,
    autoplayHoverPause:true,
    loop: true,
    slideSpeed: 1000,
    paginationSpeed: 500,
    autoplaySpeed:2500,
    navigation: true,
    paginationNumbers: true,
    nav: true,
    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 900: { items: 4 }
    }
  });
  $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
  $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
  
  // Mobile Navigation
  if ($('.main-nav').length) {
    var $mobile_nav = $('.main-nav').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
})(jQuery);