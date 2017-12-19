---
---

const state = {
  currentTab: 1,
  ww: $(window).width(),
  baseurl: 'ventureretreat/',
  initialScrolltopScheduleMenu: 0
};

$(window).on('load', function() {
  $(`.page_overlay .page_overlay__white_space`).addClass('animation');
  setTimeout(function() {
    $(`.page_overlay`).addClass('animation');
  }, 3000);
});

/**
 * Document ready
 */
$(document).ready(() => {
  /**
   * Init tabs
   */
  $(`.tab__${state.currentTab}`).show();
  $(`.tabselector__${state.currentTab}`).addClass('active');
  /**
   * Init sliders
   */
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
      loop : true,
      buttons: ['close']
    });

  let scheduleMenuWidth =
    $('.schedule__line-date-element-sizer--mobile li').length * 88 + 100;
  if (state.ww > scheduleMenuWidth) {
    scheduleMenuWidth = state.ww;
  }

  $('.schedule__line-date-element-sizer--mobile .line_background').css({
    width: `${scheduleMenuWidth}px`
  });

  /**
   * Lazy loading on enter
   */
  update_offsets_backgrounds();
  lazy_backgrounds();
  /**
   * Using negative toggle
   */
  negativeMenuToggle();
  /**
   * Play video
   */
  playVideo();
  /**
   * Scroll reveal
   */
  window.sr = ScrollReveal({
    duration: 1000,
    scale: 1,
    distance: '100px'
  });
  sr.reveal('.scroll_reveal');
});

/**
 * Scroll listener
 */
$(document).scroll(() => {
  /**
   * Using negative toggle
   */
  negativeMenuToggle();
  /**
   * Lazy background on scroll
   */
  lazy_backgrounds();
  /**
   * Play video
   */
  playVideo();
});

/**
 * Open the menu on mobile
 */
$('.open_menu').click(() => {
  /**
   * Change the text of button menu content toggle
   */

  if ($('.top_navbar--mobile-content.show').length) {
    $('.top_navbar--mobile-content').removeClass('show');
    $('.open_menu').html('MENU');
  } else {
    $('.top_navbar--mobile-content').addClass('show');
    $('.open_menu').html('CLOSE');
  }
});

function displayScheduleTab(id) {
  let ww = $(window).width();
  $(`.tabselector__${state.currentTab}`).removeClass('active');
  $(`.tab__${state.currentTab}`).hide();
  state.currentTab = id;
  $(`.tab__${state.currentTab}`).show();
  $(`.tabselector__${state.currentTab}`).addClass('active');
  if (ww < 769) {
    let nextPosition = $('.schedule__tabs').offset().top - 200;
    $('html,body').animate({ scrollTop: nextPosition }, 'slow');
  }
}

/**
 * Debounced window resize
 */
var onResizeDebounced = debounce(() => {
  if ($(window).width() > 769) {
    $('.open_menu').html('MENU');
    $('.top_navbar--mobile-content').removeClass('show');
  }
  state.ww = $(window).width();
  let scheduleMenuWidth =
    $('.schedule__line-date-element-sizer--mobile li').length * 88 + 100;
  if (state.ww > scheduleMenuWidth) {
    scheduleMenuWidth = state.ww;
  }

  $('.schedule__line-date-element-sizer--mobile .line_background').css({
    width: `${scheduleMenuWidth}px`
  });
}, 150);

window.addEventListener('resize', onResizeDebounced);

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Negative toggle navbar
 */

function negativeMenuToggle() {
  let limit = 100;
  let ww = $(window).width();
  if (ww < 769) {
    limit = 0;
  }

  if ($(document).scrollTop() > limit) {
    $('.top_navbar').addClass('negative');
    $('.top_navbar--mobile').addClass('negative');
    $('.top_navbar--go-back img').attr(
      'src',
      `/${state.baseurl}assets/img/icons/back_arrow_negative.svg`
    );
  } else {
    $('.top_navbar').removeClass('negative');
    $('.top_navbar--mobile').removeClass('negative');
    $('.top_navbar--go-back img').attr(
      'src',
      `/${state.baseurl}assets/img/icons/back_arrow.svg`
    );
  }

  if (ww < 769) {
    let windowScrolltop = $(window).scrollTop();
    if ($('.schedule__line-container').length) {
      let menuScrolltop = $('.schedule__line-container').offset().top - 76;
      if (windowScrolltop > menuScrolltop) {
        if (!state.initialScrolltopScheduleMenu) {
          state.initialScrolltopScheduleMenu = menuScrolltop;
        }
        if (
          windowScrolltop >
          state.initialScrolltopScheduleMenu +
            $('.schedule__tabs').height() +
            50
        ) {
          $('.schedule__line-date-element-sizer--mobile').removeClass(
            'sticky-schedule-modifier'
          );
        } else {
          $('.schedule__line-date-element-sizer--mobile').addClass(
            'sticky-schedule-modifier'
          );
        }
      } else {
        if (windowScrolltop < state.initialScrolltopScheduleMenu) {
          $('.schedule__line-date-element-sizer--mobile').removeClass(
            'sticky-schedule-modifier'
          );
        }
      }
    }
  }
}

/**
 * Lazyloading for backgrounds
 */
var ll = $('.lazyload-bkg');
var lh = [];
var wscroll = 0;
var wh = $(window).height();

function update_offsets_backgrounds() {
  $('.lazyload-bkg').each(function() {
    var x = $(this).offset().top;
    lh.push({ offset: x, src: $(this).data('src') });
  });
}

let lazy_backgrounds = debounce(() => {
  wscroll = $(window).scrollTop();
  for (let i = 0; i < lh.length; i++) {
    if (lh[i].offset <= wscroll + (wh + 150)) {
      $('.lazyload-bkg')
        .eq(i)
        .css({
          backgroundImage: `url('${lh[i].src}')`
        });
    }
  }
});

function playVideo() {
  if (document.getElementById('event_video')) {
    let vid = document.getElementById('event_video');
    let wscroll = $(window).scrollTop();
    if ($('#event_video').offset().top <= wscroll + (wh + 100)) {
      vid.play();
    }
  }
}
