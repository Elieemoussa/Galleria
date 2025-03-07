document.getElementById("toggleButton").addEventListener("click", function() {
    let content = document.getElementById("content");
    let audio = document.getElementById("myAudio");
    let logo = document.getElementById("logo");
    content.classList.add("fade-in");   
    logo.classList.add("fade-out");    // Hide logo
    content.style.visibility = "visible";
    this.style.display = "none"; // Hide button

    if (audio.paused) {
        audio.play();
    }
});
