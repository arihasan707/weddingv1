// Gallery Single Slider
window.GALLERY_SINGLE_SLIDER = true;

// Love Story
var init_love_story = function () {
  var galleryWrap = $(".story__slider-wrap");

  if (galleryWrap.length) {
    var sliderForOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: true,
      adaptiveHeight: true,
      infinite: false,
      useTransform: true,
      speed: 500,
      touchThreshold: 10000,
      cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
      prevArrow: $(".story__arrow-btn.prev"),
      nextArrow: $(".story__arrow-btn.next"),
    };

    // Sliders
    var sliderForWrap = $(".story__slider-for");

    $(sliderForWrap)
      .on("init", function (event, slick) {
        $(".story__slider-nav__item__manual").eq(0).addClass("is-active");

        var width = $(this).find(".story__slider-for__item").width();
        var height = width + width / 3;

        $(".story__slider-for__item").css("height", height + "px");
      })
      .slick(sliderForOptions);

    $(sliderForWrap).on("afterChange", function (event, slick, currentSlide) {
      var manualNav = $(".story__slider-nav__item__manual");
      for (var i = 0; i < manualNav.length; i++) {
        var slickIndex = $(manualNav[i]).attr("data-slick-index");
        if (slickIndex <= currentSlide) $(manualNav[i]).addClass("is-active");
        if (slickIndex > currentSlide) $(manualNav[i]).removeClass("is-active");
      }
    });
  }
};

// On Ready
$(document).ready(function () {
  // get viewport
  var vp = typeof getViewport === "function" ? getViewport() : undefined;

  // check slider function
  if (typeof gallerySingleSlider === "function") {
    // Init Slider
    gallerySingleSlider({infinite: true});

    // Single Slider Container
    var singleSliderContainer = $("#singleSliderContainer");

    // Single Slider Picture
    $(singleSliderContainer)
      .find(".singleSliderPicture")
      .each(function (i, picture) {
        var width = $(this).width();

        var width = width - 50;
        var height = width + (width - 110);
        // var height = width;

        if (vp && vp.width > 700) {
          width = width * 2;
          height = width + width / 4;
        }
        $(picture).css("--width", width + "px");
        $(picture).css("--height", height + "px");
      });

    // Slider has been initialized
    if ($(singleSliderContainer).hasClass("slick-initialized")) {
      // Set to the first slide
      $(singleSliderContainer).slick("slickGoTo", 0);

      setTimeout(() => {
        // show slider
        $(singleSliderContainer).css("opacity", 1);
      }, 500);
    }
  }

  init_love_story();
});
