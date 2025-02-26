const images = [
    '/images/301/301.jpg',
    '/images/301/302.jpg',
    '/images/301/303.jpg'
];

let index = 0;

// Create two background layers
const bg1 = document.createElement('div');
const bg2 = document.createElement('div');

bg1.id = 'bg1';
bg2.id = 'bg2';

bg1.classList.add('bg-layer');
bg2.classList.add('bg-layer');

document.body.appendChild(bg1);
document.body.appendChild(bg2);

// Set initial background images
bg1.style.backgroundImage = `url(${images[0]})`;
bg2.style.backgroundImage = `url(${images[1]})`;
bg2.style.opacity = "0"; // Start the second image hidden

// Add a small delay before starting the transitions
window.onload = () => {
    setTimeout(() => {
        // First change happens after delay, ensuring smooth fade-in
        setInterval(changeBackground, 5000); // Change background every 5 seconds
        changeBackground(); // Start the first change right away
    }, 100); // Initial delay to avoid the abrupt pop-up
};

function changeBackground() {
    index = (index + 1) % images.length;

    if (bg1.style.opacity === "1") {
        bg2.style.backgroundImage = `url(${images[index]})`;
        bg2.style.opacity = "1"; // Fade in the second image
        bg1.style.opacity = "0"; // Fade out the first image
    } else {
        bg1.style.backgroundImage = `url(${images[index]})`;
        bg1.style.opacity = "1"; // Fade in the first image
        bg2.style.opacity = "0"; // Fade out the second image
    }
}