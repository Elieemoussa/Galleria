
'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

	
});


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.photos');

    images.forEach(image => {
        // Create a new Image object to handle loading
        const img = new Image();
        img.src = image.src;

        img.onload = function() {
            // Add the 'loaded' class to the original image once it's fully loaded
            image.classList.add('loaded');
        };

        // Handle the case when the image fails to load
        img.onerror = function() {
            console.error(`Image failed to load: ${image.src}`);
        };
    });
});


