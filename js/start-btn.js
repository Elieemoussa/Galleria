document.getElementById("toggleButton").addEventListener("click", function() {
    let content = document.getElementById("content");
    let audio = document.getElementById("myAudio");
    let logo = document.getElementById("logo");
    let title = document.getElementById("title");
    let date = document.getElementById("title-date");

    content.classList.add("fade-in");   

    // Check if  exists

    if (logo) { 
        logo.classList.add("fade-out");  // Hide logo
    }
    if (title) { 
        title.classList.add("fade-out"); 
        setTimeout(() => title.style.display = "none", 1000);  
    }
    if (date) { 
        date.classList.add("fade-out"); 
        setTimeout(() => date.style.display = "none", 1000); 
    }
    content.style.visibility = "visible";
    this.style.display = "none"; // Hide button

    if (audio && audio.paused) { 
        audio.play();
    }
});
