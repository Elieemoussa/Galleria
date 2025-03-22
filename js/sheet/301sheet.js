
function submitResponse(response) {
    const FullName = document.getElementById("firstName").value.trim();
    const PhoneNumber = document.getElementById("lastName").value.trim();
    const AttendNumber = document.getElementById("attendNb").value.trim();

    if (!FullName || !PhoneNumber || !AttendNumber ) {
        document.getElementById("status").innerText = "Please enter your name.";
        return;
    }
    document.getElementById("submitB1").disabled = true;
    document.getElementById("submitB2").disabled = true;

    // Update UI immediately to indicate that submission has started
    document.getElementById("status").innerText = "Submitting response...";


    fetch("https://script.google.com/macros/s/AKfycbwaTtmlVBFHMD9Lcc-yfMvz9XNiEjAz9TdXUOnKvEJStqjBqerb67fJrYoZTIM4nefw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FullName, response, AttendNumber, PhoneNumber }),
        mode:'no-cors'        
    })
    .then(() => {
        // Since the response is opaque, we assume it went fine.
        document.getElementById("status").innerText = "Response recorded. Thank you!";
        document.getElementById("submitB1").style.display = "none";
        document.getElementById("submitB2").style.display = "none";
        document.getElementById("firstName").style.display = "none";
        document.getElementById("lastName").style.display = "none";
        document.getElementById("attendNb").style.display = "none";
    })
    .catch(error => {
        
        document.getElementById("status").innerText = "Error submitting response.";
        console.error(error);
        document.getElementById("submitB1").disabled = false;
        document.getElementById("submitB2").disabled = false;
    });
}
