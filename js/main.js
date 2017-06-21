var loading = true;
var inStopScroll = false;

$(document).ready(function(){
    $(".loading-animation-letters").addClass('flashing-letters');
    setTimeout( function(){ 
        if(!loading) return;
        $(".loading-animation-letters").removeClass('flashing-letters').addClass('writing-letters');
        setTimeout( function(){
            if(!loading) return;
            $(".loading-animation-letters").removeClass('writing-letters').addClass('disappearing-letters');
            setTimeout( function(){
                preventLoadingAnimation();
            }  , 1500 );
        }  , 2200 );
    }  , 3000 );

    window.addEventListener('deviceorientation', handleOrientation);
    
    function handleOrientation(event) {
        var y = -event.gamma;
        if(y > 25){y = 25;}
        else if(y < -25){y = -25;}
        $("#skewed").css("transform","skewX("+y+"deg)");
    }

    document.addEventListener("touchmove", preventLoadingAnimation, false);
    document.addEventListener("mousewheel", preventLoadingAnimation, false);
    document.addEventListener("DOMMouseScroll", preventLoadingAnimation, false);

    function preventLoadingAnimation(event){        
        if(loading){            
            window.scrollTo(0,0);
            if(event){
                event.stopPropagation();
                event.preventDefault();
                event.returnValue = false;
                event.cancelBubble = true;
            }
            
            if(!inStopScroll){
                inStopScroll = true;
                setTimeout( function(){ loading = false; }, 500);
                
                $(".loading").addClass('finish-loading');
                $(".hamb-menu-parent").css({"opacity":"1"});
            }
        }
    }
    var hambtimeout,hambcolor;
    $(".hamb-menu-clickable").on({"click": function(){
        clickOnHamburger(this);
    }},false);

    function clickOnHamburger(obj){
        if($(".hamb-menu-menumod-active").length)
        {
            $("#container").css("z-index", "1");            
            $(obj).removeClass("hamb-menu-menumod-active");
            $(".hamburger-menu").removeClass("white-hamb-color");
            $(".menu-page ul").addClass("no-animation").removeClass("slideInUp");
            $(".menu-page").css({"opacity":"0","pointer-events":"none"});
            hambtimeout = setTimeout( function(){ $(".menu-page").css({"z-index":"-1"}); }, 800);       
        }
        else{
            clearTimeout(hambtimeout);
            $("#container").css("z-index", "-1");
            $(".hamburger-menu").addClass("white-hamb-color");
            $(obj).addClass("hamb-menu-menumod-active");
            $(".menu-page ul").addClass("slideInUp").removeClass("no-animation");
            $(".menu-page").css({"opacity":"1","z-index":"2","pointer-events":"auto"});//z-index 1
        }
    }

    var lastElements = {first: 0,last: 0}, lastDistance = 0;

    $('.site-pages').children().each(function() {
        lastElements.first = lastElements.last;
        lastDistance += lastElements.last = $(this).outerHeight(true);
    });
    var padding = ($('.hamb-menu-parent').offset().top - $(window).scrollTop());
    var distance = document.documentElement.clientHeight - padding;
    lastDistance -= lastElements.first + lastElements.last + padding;


    $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();
            if (scrollDistance >= distance && lastDistance >= scrollDistance ) {
                    $(".hamb-menu-parent div span").css({"background-color":"black"});
            } else {
                    $(".hamb-menu-parent div span").css({"background-color":"white"});
            }
    });

    $(".menu-page a").each(function(k){
        $(this).css("animation-delay",((k+1) * 0.1) +"s");
    });
    

    $("a[href^=#]").on("click", function(e) {//$("a[href^=#]")
        e.preventDefault();
        if($(this).attr('id') == "home-link"){
            $('html,body').animate({
                scrollTop: 0
            }, 1500);
        }
        else{
            pos = $(this.hash);
            clickOnHamburger($(".hamb-menu-clickable"));
            $('html,body').animate({
                scrollTop: pos.offset().top
            }, 1500);
        }
    });

});

function contactformsend(){
    var email = $("#email").val() , 
        fullname = $("#fullname").val(),
        message = $("#message").val();
    var _fullname = /^[\w\s]+$/,
        _email = /^\S+\@\S+\.\S{2,4}$/;
    
    var num = 0;

    if(!_fullname.test(fullname))
    {
        num++;
        errorMessage("#fullname");
    }
    if(!_email.test(email.trim()))
    {
        num++;
        errorMessage("#email");
    }
    if(message.length <= 10)
    {
        num++;
        errorMessage("#message");
    }

    if(num > 0){
        return false;
    }
    
    return true;
}

function errorMessage(id){
    $(id).parent().parent().children(".error-message").css("opacity","1");
}

function initMap() {
    
    var uluru = {lat: 44.8509538 , lng: 20.3375905};//44.850  - 20.337 // 44.8509538,20.3375905
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        scrollwheel: false,
        center: uluru,
        styles: [
            {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "lightness": -8 },
        { "gamma": 1.18 }
      ]
  }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "gamma": 1 },
        { "lightness": -24 }
      ]
  }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "transit",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "road",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "landscape",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "poi",
      "stylers": [
        { "saturation": -100 }
      ]
  }
        ]
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}


//
//This is for fade-up animation 
AOS.init({
    duration: 1000,
    easing: 'ease-in-out-sine'
})