---
---
/**
 * Document ready
 */
$(document).ready(() => {
  $('.carousel__home-slider_1').slick({
    dots: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500
  });

  $('.carousel__home-slider_2').slick({
    dots: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500
  });

  $('[data-fancybox="gallery"]')
    .not($('.slick-cloned'))
    .fancybox({
      buttons: ['slideShow', 'fullScreen', 'thumbs', 'share', 'close']
    });
});

/**
 * Scroll listener
 */
$(document).scroll(() => {
  if ($(document).scrollTop() > 100) {
    $('.top_navbar').addClass('negative');
  } else {
    $('.top_navbar').removeClass('negative');
  }
});

$('.open_menu').click(() => {
  $('.top_navbar--mobile-content').toggle();
  if ($('.top_navbar--mobile-content').is(':visible')) {
    $('.open_menu').html('CLOSE');
  } else {
    $('.open_menu').html('MENU');
  }
});
