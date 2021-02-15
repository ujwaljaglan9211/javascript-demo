(function ($) {
  'use strict';
  // Add or remove class on topbar & header on scroll
  var header = $("#header");
  var topbar = $("#topbar");
  $(window).scroll(function () {
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

  $(document).ready(function () {
    // show mini cart on click
    $("a.shopping-cart-items-listing-mobile").on("click", function () {
      $(this).siblings(".shopping-cart-container").toggle();
    });
    // close mobile menu on button click
    $(document).on("click", ".checkout-button", function () {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('.mobile-nav-overly').fadeOut();
      }
    });
    // mobile menu
    $(".mobile-nav-toggle").click(function () {
      $(".main-nav").toggle();
      $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
    });
    // Get products from json using AJAX call
    $.ajax({
      url: 'assets/data/data.json',
      dataType: 'json',
      success: function (data) {
        // All products slider 
        $('#load-all-products').html('<div id="all-products-slider" class="products-slider owl-carousel owl-theme"></div>');
        $.each(data, function (key, value) {
          $('#all-products-slider').append('<div class="item"><div class="product"><img src="' + value.itemImage + '" alt="' + value.itemName + '" title="' + value.itemName + '" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>' + value.itemName + '</h5><p>Price: ' + value.itemPrice + '/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="' + value.id + '" product-name="' + value.itemName + '" product-image="' + value.itemImage + '" product-price="' + value.itemPrice + '" product-category="' + value.category + '">Add</a></div></div></div>');
        });
        // products slider (uses the Owl Carousel library)
        owlCarausel('#all-products-slider');
        // Fruits slider
        $('#load-all-fruits').html('<div id="all-fruits-slider" class="products-slider owl-carousel owl-theme"></div>');
        $.each(data, function (key, value) {
          if (value.category === 'fruit') {
            $('#all-fruits-slider').append('<div class="item"><div class="product"><img src="' + value.itemImage + '" alt="' + value.itemName + '" title="' + value.itemName + '" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>' + value.itemName + '</h5><p>Price: ' + value.itemPrice + '/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="' + value.id + '" product-name="' + value.itemName + '" product-image="' + value.itemImage + '" product-price="' + value.itemPrice + '" product-category="' + value.category + '">Add</a></div></div></div>');
          }
        });
        // products slider (uses the Owl Carousel library)
        owlCarausel('#all-fruits-slider');
        // Vegetables slider
        $('#load-all-vegetables').html('<div id="all-vegetables-slider" class="products-slider owl-carousel owl-theme"></div>');
        $.each(data, function (key, value) {
          if (value.category === 'vegetable') {
            $('#all-vegetables-slider').append('<div class="item"><div class="product"><img src="' + value.itemImage + '" alt="' + value.itemName + '" title="' + value.itemName + '" /><div class="product-description d-inline-block pt-3 pb-2 text-center"><h5>' + value.itemName + '</h5><p>Price: ' + value.itemPrice + '/kg</p><a href="javascript:void(0);" class="btn button" onclick="addWishlist(this); return false;" product-id="' + value.id + '" product-name="' + value.itemName + '" product-image="' + value.itemImage + '" product-price="' + value.itemPrice + '" product-category="' + value.category + '">Add</a></div></div></div>');
          }
        });
        // products slider (uses the Owl Carousel library)
        owlCarausel('#all-vegetables-slider');
        $(".owl-prev").html('<i class="fa fa-chevron-left"></i>');
        $(".owl-next").html('<i class="fa fa-chevron-right"></i>');
      },
      statusCode: {
        404: function () {
          console.log('There was a problem with the server.  Try again soon!');
        }
      }
    });
    // owl carosel function initialise
    function owlCarausel(sliderId){
      return $(sliderId).owlCarousel({
        autoplay: true,
        infinite: true,
        margin: 20,
        dots: true,
        autoplayHoverPause: true,
        loop: true,
        slideSpeed: 1000,
        paginationSpeed: 500,
        autoplaySpeed: 2500,
        navigation: true,
        paginationNumbers: true,
        nav: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
          0: { items: 1 },
          768: { items: 3 },
          900: { items: 4 }
        }
      });
    }
    // Flip functionality   
    $("#flip-container").click(function () {
      $(this).toggleClass("flip-container");
    });
    // GET user accout details fromLocalStorage
    var userDetails = getLocalStorage();

    function getLocalStorage() {
      return JSON.parse(localStorage.getItem("userDetails"));
    }
    checkLoggedIn(userDetails);
    // check whether user is logged in or not
    function checkLoggedIn(userDetails) {
      if (userDetails && userDetails.isLoggedIn === true) {
        $("#checkoutForm h4").text("Checkout");
        $("#signin").hide();
        $("#registeration").hide();
        $("#pay-now span").text("");
        $("#pay-now").show();
      } else if (userDetails && userDetails.isLoggedIn === false) {
        $("#checkoutForm h4").text("Login");
        $("#pay-now span").text("");
        $("#signin").show();
        $("#registeration").hide();
        $("#pay-now").hide();
      } else {
        $("#pay-now span").text("");
        $("#signin").hide();
        $("#registeration").show();
        $("#pay-now").hide();
      }
    }
    // Login form submit action
    $("#loginForm").submit(function (e) {
      e.preventDefault();
      userDetails = getLocalStorage();
      var emailLogin = $("#emailLogin").val();
      var passwordLogin = $("#passwordLogin").val();
      if (userDetails.email === emailLogin && userDetails.password === passwordLogin) {
        userDetails.isLoggedIn = true;
        $("#signin").hide();
        $("#registeration").hide();
        $("#pay-now").show();
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        $("#loginError").text("Either email or password are incorrect!").show().delay(5000).fadeOut();
      }
      // Payment & checkedLoggedIn function call
      if(wishlist.length > 0){
        checkLoggedIn(userDetails);
        payment();
      }
    });
    // Register form submit action
    $("#registrationForm").submit(function (e) {
      e.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var address = $("#shippingAddress").val();
      var password = $("#password").val();
      var userDetails = {};
      userDetails.name = name;
      userDetails.email = email;
      userDetails.phone = phone;
      userDetails.address = address;
      userDetails.password = password;
      userDetails.isLoggedIn = false;
      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      $("#signin").show();
      $("#registeration").hide();
      $("#pay-now").hide();
    });
    // buy now button click call payment function
    $("#paymentclick").on('click', function () {
      payment();
    });
    // Payment function
    function payment() {
      var total_ammount = 0;
      var description = '';
      userDetails = getLocalStorage();
      if (wishlist.length > 0 && userDetails.isLoggedIn === true) {
        $("#pay-now #paymentclick").show();
        $("#pay-now span").text("");
        for (var i = 0; i < wishlist.length; i++) {
          total_ammount = total_ammount + wishlist[i]['ammount'];
          description = description + wishlist[i]['name'] + "(" + wishlist[i]['quantity'] + "),";
        }
        // Pay via Razorpay     
        var options = {
          "key": "rzp_test_WKwmEQsqHL0Vgj",
          "amount": total_ammount * 100, // Example: 2000 paise = INR 20
          "name": "iMarket",
          "description": "Purchase of following products - " + description,
          "image": "assets/images/logo.svg", // COMPANY LOGO
          "handler": function (response) {
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE
            // console.log('response',response);
            var temp = {};
            temp.razorpay_payment_id = response.razorpay_payment_id;
            temp.email = userDetails.email;
            temp.phone = userDetails.phone;
            temp.ammount = total_ammount;
            payments.push(temp);
            localStorage.setItem("payments", JSON.stringify(payments));
            wishlist = [];
            appendWishlist(wishlist);
          },
          "prefill": {
            "name": userDetails.name, // pass customer name
            "email": userDetails.email, // customer email
            "contact": userDetails.phone //customer phone no.
          },
          "notes": {
            "address": userDetails.address //customer address 
          },
          "theme": {
            "color": "#52AF3C" // screen color
          }
        };
        var propay = new Razorpay(options);
        propay.open();
      } else {
        $("#pay-now span").text("Your cart is empty!").fadeOut(2000);       
      }
    }
  });
})(jQuery);