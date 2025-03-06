document.getElementById("toggleButton").addEventListener("click", function() {
    let content = document.getElementById("content");
    content.classList.add("fade-in");   // Add fade-in class
    content.style.visibility = "visible";
    this.style.display = "none"; // Hide button

    if (audio.paused) {
        audio.play();
    }
});
