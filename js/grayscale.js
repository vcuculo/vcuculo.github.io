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

$('#math').on('touchstart mouseenter', function () {
      $('#math').text('in Affective Computing');
    }
);

$('#math').on('touchend mouseleave', function () {
      $('#math').text('in Mathematical Sciences');
    }
);

$('#surname').on('touchstart mouseenter', function () {
      $('#cuckoo').stop().animate({"left": "0px"}, 2000);
      $('#surname').text('Cuckoo');
    }
);

$('#surname').on('touchend mouseleave', function () {
      $('#cuckoo').stop().animate({"left": "-200px"}, 2000);
      $('#surname').text('Cuculo');
    }
);

$(function() {
    $('.light-bulb').bind('click', function(event) {
        turnOnLight();
    });
});


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

    $('#intro-modal').modal('show');

});

window.onorientationchange = function()
{
   window.location.reload();
};

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function gumSuccess( stream ) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
        vid.srcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function() {
        //adjustVideoProportions();
        vid.play();
    }
    vid.onresize = function() {
        //adjustVideoProportions();
        if (trackingStarted) {
            ctrack.stop();
            ctrack.reset();
            ctrack.start(vid);
        }
    }
    startVideo();
}

function gumFail() {
    alert("There was some problem trying to get video from your webcam. To continue the navigation just click on the small bulb on the top right.");
}


var vid = document.getElementById('videoel');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
} else if (navigator.getUserMedia) {
    navigator.getUserMedia({video : true}, gumSuccess, gumFail);
} else {
    alert("It seems like you don't have a webcam or your browser does not support this feature. To continue the navigation just click on the small bulb on the top right.");
}

/*********** setup of emotion detection *************/

// set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
pModel.shapeModel.nonRegularizedVectors.push(9);
pModel.shapeModel.nonRegularizedVectors.push(11);

var ctrack = new clm.tracker({useWebGL : true});
ctrack.init(pModel);
var trackingStarted = false;

var light = false;

function turnOnLight() {
  if (!light){
    ctrack.stop();
    $('#fadeMe').animate({opacity: 0, filter: 'alpha(opacity=0)'}); // IE fallback
    $('#noface').hide();
    $('.fa-lightbulb-o').css('color','yellow');
    $('.fa-lightbulb-o').removeClass('fa-spin');
    light = true;
  }
}


function startVideo() {
    // start video
    vid.play();
    // start tracking
    ctrack.start(vid);
    trackingStarted = true;
    // start loop to draw face
    drawLoop();
}

function drawLoop() {
    requestAnimFrame(drawLoop);

    var cp = ctrack.getCurrentParameters();

    var er = ec.meanPredict(cp);
    if (er && !light) {
        var value = 1 - er[0].value;
        var element = document.getElementById('fadeMe');

        if (ctrack.getScore() > 0.5) {
          $('#noface').hide();
          $('#fadeMe').css('opacity', value, 'filter', 'alpha(opacity=' + value + ')');
        } else {
          $('#noface').show();
          $('#fadeMe').css('opacity', '1', 'filter', 'alpha(opacity=1)');
        }
    }
}
delete emotionModel['angry'];
delete emotionModel['disgusted'];
delete emotionModel['fear'];
delete emotionModel['surprised'];
delete emotionModel['sad'];

var ec = new emotionClassifier();
ec.init(emotionModel);
