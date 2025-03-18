document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("invite") && urlParams.get("invite").includes("h")) {
        const guestSection = document.getElementById("guestSection");
        if (guestSection) {
            guestSection.style.display = "none";
        }
    }
});