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
				1000: {
					items: 2
				}
			}
		});
	
		// Calculate and set fixed item width
		var carouselWidth = $carousel.width();
		var itemsToShow = $carousel.data('owl.carousel').options.items;
		var margin = $carousel.data('owl.carousel').options.margin;
		var itemWidth = (carouselWidth - (itemsToShow - 1) * margin) / itemsToShow;
		$carousel.find('.owl-item').width(itemWidth);
	
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