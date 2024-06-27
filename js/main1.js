
'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

	
});


document.addEventListener("DOMContentLoaded", function() {
    var images = document.querySelectorAll('.scroll-container img');
    var loader = document.getElementById('preloader');
    var totalImages = images.length;
    var imagesLoaded = 0;

    images.forEach(function(image) {
        image.addEventListener('load', function() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                loader.style.display = 'none';
                document.querySelectorAll('.image-container').forEach(function(container) {
                    container.classList.remove('hidden');
                });
            }
        });

        // In case images are cached
        if (image.complete) {
            image.dispatchEvent(new Event('load'));
        }
    });
});

