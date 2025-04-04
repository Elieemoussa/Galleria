function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const guestCount = getQueryParam("guests");

const lang = document.documentElement.lang || "en";
// Update text content if guestCount exists and the element is present
// const guestSpan = document.getElementById("guestCount");
// if (guestCount && guestSpan) {
//   guestSpan.textContent = `Number of Guests: ${guestCount}`;
// }

const guestSpan = document.getElementById("guestCount");
if (guestCount && guestSpan) {
    if (lang === "ar") {
        guestSpan.textContent = `عدد الضيوف: ${guestCount}`;
    } else {
        guestSpan.textContent = `Number of Guests: ${guestCount}`;
    }
}


