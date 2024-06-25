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
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				10000: {
					items: 1
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


