//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }

   if($(window).scrollTop() + $(window).height() > $(document).height() - ($('#how').height()/2)) {
       $('#last-btn').attr("href", "#who");
       $('#last-btn i').addClass("fa-angle-up").removeClass("fa-angle-down");
   } else {
       $('#last-btn').attr("href", "#how");
       $('#last-btn i').removeClass("fa-angle-up").addClass("fa-angle-down");
   }

});

$('#surname').on('touchstart mouseenter', function () {
      $('#cuckoo').stop().animate({"left": "0px"}, 2000);
    }
);

$('#surname').on('touchend mouseleave', function () {
      $('#cuckoo').stop().animate({"left": "-200px"}, 2000);
    }
);

$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var target = $(this).attr("href");
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 2000);
        event.preventDefault();
    });
});

$(function () {

var filterList = {

    init       : function () {

      // MixItUp plugin
      // http://mixitup.io
      $('#portfoliolist').mixitup({
        targetSelector: '.portfolio',
        filterSelector: '.filter',
        effects       : ['fade'],
        easing        : 'snap',
        // call the hover effect
        onMixEnd      : filterList.hoverEffect()
      });

    },
    hoverEffect: function () {

      // Simple parallax effect
      $('#portfoliolist .portfolio').on('touchstart mouseenter', function () {
        $(this).find('.work-label').stop().animate({
          bottom: 0
        }, 200);
        $(this).find('img').stop().animate({
          top: -15
        }, 500);
      });

      $('#portfoliolist .portfolio').on('touchend mouseleave', function () {
        $(this).find('.work-label').stop().animate({
          bottom: -100
        }, 200);
        $(this).find('img').stop().animate({
          top: 0
        }, 300);
      });

    }

  };

// Run the show!
filterList.init();
});

$(document).ready(function() {
    var scrollorama = $.scrollorama({
        blocks:'.row',
        enablePin: false
    });
    scrollorama
    .animate('#milan',{ delay: $(window).height()/2, duration: $(window).height()/2, property:'top', start:-$(window).height(), end:0 })
    .animate('#dot',{ delay: $(window).height()/2, duration: $(window).height()/2, property:'left', start:-$(window).width(), end:0 })
    .animate('#unimi',{ delay: $(window).height()/2, duration: $(window).height()/2, property:'right', start:-$(window).width(), end:0 })
    .animate('#portfoliolist',{delay: 100, duration: $(window).height()-100, property:'opacity', start:0 });
});

window.onorientationchange = function()
{
   window.location.reload();
};
