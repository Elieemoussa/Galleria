function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 30);
    document.getElementById('cookie-banner').style.display = 'none';
    enableCookies();
}

function rejectCookies() {
    setCookie('cookieConsent', 'rejected', 30);
    document.getElementById('cookie-banner').style.display = 'none';
    disableCookies();
}

function customizeCookies() {
    // Implement customization logic here
    alert('Customize cookie preferences');
}

function enableCookies() {
    // Your logic to enable cookies goes here.
    console.log('Cookies enabled');
    // This could include enabling analytics, personalization, and advertisement cookies.
    // Example:
    // enableAnalytics();
    // enableAdvertisements();
}

function disableCookies() {
    // Your logic to disable cookies goes here.
    console.log('Cookies disabled');
    // This could include disabling analytics, personalization, and advertisement cookies.
}

window.onload = function() {
    if (document.cookie.indexOf('cookieConsent=accepted') !== -1) {
        document.getElementById('cookie-banner').style.display = 'none';
        enableCookies();
    } else if (document.cookie.indexOf('cookieConsent=rejected') !== -1) {
        document.getElementById('cookie-banner').style.display = 'none';
        disableCookies();
    } else {
        document.getElementById('cookie-banner').style.display = 'flex';
    }
}