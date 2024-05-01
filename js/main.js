(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var carousel = function() {
		var $carousel = $('.featured-carousel');
		$carousel.owlCarousel({
			loop: false,
			autoplay: false,
			autoplayTimeout: 9999999,
			margin: 30,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: false,
			dots: true,
			autoplayHoverPause: false,
			items: 1,
			navText: ["<span class='ion-ios-arrow-back'></span>", "<span class='ion-ios-arrow-forward'></span>"],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});
	
		// Add event listener to disable dots when needed
		$carousel.on('disableDots', function() {
			$carousel.addClass('disabled-dots');
		});
	
		$carousel.on('enableDots', function() {
			$carousel.removeClass('disabled-dots');
		});

		    // Disable dots after carousel initialization
			$carousel.trigger('disableDots');
	};
	
	carousel();
	

})(jQuery);