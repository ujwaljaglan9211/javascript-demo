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

  $(document).ready(function() {   
    // show mini cart on click
    $("li.shopping-cart-items-listing").on("click", function(){
      $("li.shopping-cart-items-listing .shopping-cart-container").show();
    });
    // close mobile menu on button click
    $(document).on("click", ".checkout-button", function () {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('.mobile-nav-overly').fadeOut();
      }
    }); 
    // Get products from json using AJAX call
    $.ajax({
      url: 'assets/data/data.json',
      dataType: 'json',
      success: function(data) {
        // All products slider 
        $('#load-all-products').html('<div id="all-products-slider" class="products-slider owl-carousel owl-theme"></div>');
        $.each(data, function (key, value){
          $('#all-products-slider').append('<div class="item"><div class="product"><img src="'+ value.itemImage+'" alt="'+ value.itemName+'" title="'+ value.itemName+'" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>'+ value.itemName+'</h5><p>Price: '+ value.itemPrice+'/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="'+ value.id+'" product-name="'+ value.itemName+'" product-image="'+ value.itemImage+'" product-price="'+ value.itemPrice+'" product-category="'+ value.category+'">Add</a></div></div></div>');
        });
        // products slider (uses the Owl Carousel library)
        $("#all-products-slider").owlCarousel({
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
        // Fruits slider
        $('#load-all-fruits').html('<div id="all-fruits-slider" class="products-slider owl-carousel owl-theme"></div>');
        $.each(data, function (key, value){
          if(value.category === 'fruit'){
            $('#all-fruits-slider').append('<div class="item"><div class="product"><img src="'+ value.itemImage+'" alt="'+ value.itemName+'" title="'+ value.itemName+'" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>'+ value.itemName+'</h5><p>Price: '+ value.itemPrice+'/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="'+ value.id+'" product-name="'+ value.itemName+'" product-image="'+ value.itemImage+'" product-price="'+ value.itemPrice+'" product-category="'+ value.category+'">Add</a></div></div></div>');
          }           
        });
        // products slider (uses the Owl Carousel library)
        $("#all-fruits-slider").owlCarousel({
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
        // Vegetables slider
        $('#load-all-vegetables').html('<div id="all-vegetables-slider" class="products-slider owl-carousel owl-theme"></div>');
          $.each(data, function (key, value){
            if(value.category === 'vegetable'){
              $('#all-vegetables-slider').append('<div class="item"><div class="product"><img src="'+ value.itemImage+'" alt="'+ value.itemName+'" title="'+ value.itemName+'" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>'+ value.itemName+'</h5><p>Price: '+ value.itemPrice+'/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="'+ value.id+'" product-name="'+ value.itemName+'" product-image="'+ value.itemImage+'" product-price="'+ value.itemPrice+'" product-category="'+ value.category+'">Add</a></div></div></div>');
            }           
          });
          // products slider (uses the Owl Carousel library)
          $("#all-vegetables-slider").owlCarousel({
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
      },
      statusCode: {
        404: function() {
          console.log('There was a problem with the server.  Try again soon!');
        }
      }
    });
    // Flip functionality   
    $("#flip-container").click(function() {
      $(this).toggleClass("flip-container");
    });
    // GET user accout details fromLocalStorage
    var account = JSON.parse(localStorage.getItem("account"));
    checkLoggedIn(account);
    // email validation function
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    // password validation function
    function validatePassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
      return re.test(String(password));
    }
    // check whether user is logged in or not
    function checkLoggedIn(account){
      if(account && account.isLoggedIn === true){
        $("#checkoutForm h4").text("Checkout");
        $("#signin").hide();
        $("#registeration").hide();
        $("#paymentclick").hide();
      }else if(account && account.isLoggedIn === false){
        $("#checkoutForm h4").text("Login");
        $("#pay-now span").text("");
        $("#signin").show();
        $("#registeration").hide();
        $("#paymentclick").hide();
      }else{
        $("#pay-now span").text("");
        $("#signin").hide();
        $("#registeration").show();
        $("#paymentclick").hide();
      }
    }
    // Login form submit action
    $("#loginForm").submit(function(e) {
      e.preventDefault();
      var emailLogin = $("#emailLogin").val();
      if(!validateEmail(emailLogin)){
        $(".emailLoginError").text("Email is invalid!").show().delay(5000).fadeOut();
      }
      var passwordLogin = $("#passwordLogin").val();
      if(!validatePassword(passwordLogin)){
        $(".passwordLoginError").text("Password is invalid!").show().delay(5000).fadeOut();
      }
      if(account.email === emailLogin && account.password === passwordLogin){
        account.isLoggedIn = true;
        $("#signin").hide();
        $("#registeration").hide();
        $("#paymentclick").show();
        localStorage.setItem("account", JSON.stringify(account));
      }else{
        $("#loginError").text("Either email or password are incorrect!").show().delay(5000).fadeOut();
      }
    });
    // Register form submit action
    $("#registrationForm").submit(function(e) {
      e.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var address = $("#shippingAddress").val();
      if(!validateEmail(email)){
        $(".emailError").text("Email is invalid!").show().delay(5000).fadeOut();
        return false;
      }
      var password = $("#password").val();
      if(!validatePassword(password)){
        $(".passwordError").text("Password is invalid!").show().delay(5000).fadeOut();
        return false;
      }
      var account = {};
      account.name = name;
      account.email = email;
      account.phone = phone;
      account.address = address;
      account.password = password;
      account.isLoggedIn = false;
      localStorage.setItem("account", JSON.stringify(account))
      $("#signin").show();
      $("#registeration").hide();
      // payment function
      payment();
    });
    // buy now button click call payment function
    $("#paymentclick").on('click', function(){ 
      payment();
    });
    // Payment function
    function payment(){
      var total_ammount = 0;
      var description = '';
      if(wishlist.length>0){
        for (var i = 0; i < wishlist.length; i++) {
          total_ammount = total_ammount + wishlist[i]['ammount'];
          description = description +  wishlist[i]['name'] + "(" +  wishlist[i]['quantity'] + "),";         
        }
        // Pay via Razorpay     
        var options = {
          "key": "rzp_test_WKwmEQsqHL0Vgj",
          "amount": total_ammount*100, // Example: 2000 paise = INR 20
          "name": "iMarket",
          "description": "Purchase of following products - " + description ,
          "image": "assets/images/logo.svg",// COMPANY LOGO
          "handler": function (response) {
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE
            console.log('response',response);
            var temp = {};
            temp.razorpay_payment_id = response.razorpay_payment_id;
            temp.email = account.email;
            temp.phone = account.phone;
            temp.ammount = total_ammount;
            payments.push(temp);
            localStorage.setItem("payments", JSON.stringify(payments));
            wishlist=[];
            appendWishlist(wishlist);
          },
          "prefill": {
            "name": account.name, // pass customer name
            "email": account.email,// customer email
            "contact": account.phone //customer phone no.
          },
          "notes": {
            "address": account.address //customer address 
          },
          "theme": {
            "color": "#52AF3C" // screen color
          }
        };
        console.log('options', options);
        var propay = new Razorpay(options);
        propay.open();
      }else{
        $("#pay-now span").text("Your cart is empty!");
        $("#paymentclick").hide();
      }
    }
 });
})(jQuery);