// photo taken
document.getElementById("takePhotoButton").addEventListener("click", function() {   
    document.getElementById("image").click();
});



document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loading spinner
    document.getElementById('loading-spinner').style.display = 'inline-block';

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    // Wedding ID for elie and tia 
    const wedId = 6789; 
    formData.append('image', imageFile);
    formData.append('wedId', wedId);

    try {
        const response = await fetch('https://wedcam-eb80ccd082f6.herokuapp.com/api/v1/img/uploadimg', { 
            method: 'POST',
            body: formData,
            mode: 'cors',
            // credentials: 'include' // Include credentials to allow cookies
        });

        // result of the cookies 
        // const result = await response.json();
        // console.log('Response received with status:', response.status);
        // console.log('Response cookies:', document.cookie);
        
        if (response.ok) {
            document.getElementById('message').textContent = '';        
            var icon = new Image();
            icon.src = 'https://img.icons8.com/?size=100&id=83205&format=png&color=40C057'; 
            icon.alt = 'Done'; 
            icon.height = 40; 
            icon.width = 40; 
            document.getElementById('message').appendChild(icon);
            document.getElementById('uploadForm').reset();      
            document.getElementById('preview').style.display = 'none'; 
            document.getElementById('button').style.display = 'none'; 

            // Update and store the upload count locally
            let uploadCount = parseInt(localStorage.getItem('uploadCount')) || 0;
            uploadCount++;
            localStorage.setItem('uploadCount', uploadCount);
                                   
                       
            // Update the counter after successful upload
            // photoCounter = result.uploadCount;
            // document.getElementById('photoCount').textContent = `${photoCounter} of ${result.maxUploads} photos`;
            document.getElementById('photoCount').textContent = `${uploadCount} of 10 photos`;

            if (uploadCount >= 10) {
                document.getElementById('takePhotoButton').disabled = true;
                const cooldownDuration = 1 * 60 * 60 * 1000; // 1 minute in milliseconds
                const cooldownEnd = Date.now() + cooldownDuration;
                localStorage.setItem('cooldownEnd', cooldownEnd.toString());

                updateCountdown(cooldownEnd);
                document.getElementById('message').textContent = 'Can\'t get enough snaps? Return in 1 minute for more photo magic!';
            }
            
        } else {
            document.getElementById('preview').style.display = 'none'; 
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
    } catch (error) {
        document.getElementById('preview').style.display = 'none'; 
        document.getElementById('message').textContent = `Error: ${error.message}`;
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
});


// Retrieve and display the photo count and cooldown on page load
document.addEventListener('DOMContentLoaded', () => {
    const uploadCount = parseInt(localStorage.getItem('uploadCount')) || 0;
    const cooldownEnd = parseInt(localStorage.getItem('cooldownEnd')) || 0;
    const currentTime = Date.now();

    document.getElementById('photoCount').textContent = `${uploadCount} of 10 photos`;

    if (uploadCount >= 10 && currentTime < cooldownEnd) {
        document.getElementById('takePhotoButton').disabled = true;
        document.getElementById('message').textContent = 'Can\'t get enough snaps? Return in 1 hour for more photo magic!';
        updateCountdown(cooldownEnd);
    } else if (uploadCount >= 10) {
        resetCounterAndButton();
    }
});

function updateCountdown(cooldownEnd) {
    const countdownElement = document.getElementById('countdown');
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = cooldownEnd - currentTime;

        if (remainingTime <= 0) {
            clearInterval(intervalId);
            resetCounterAndButton();
        } else {
            const seconds = Math.floor((remainingTime % (1000 * 60)));
            countdownElement.textContent = `Cooldown: ${seconds}s remaining`;
        }
    }, 1000);
}

function resetCounterAndButton() {
    document.getElementById('takePhotoButton').disabled = false;
    document.getElementById('message').textContent = '';
    localStorage.setItem('uploadCount', '0');
    localStorage.removeItem('cooldownEnd');
    document.getElementById('photoCount').textContent = `0 of 10 photos`;
    document.getElementById('countdown').textContent = '';
}




// show under the input 
document.getElementById('image').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            // Set the source of the preview image to the loaded file
            document.getElementById('preview').src = event.target.result;
            // Display the preview image
            document.getElementById('preview').style.display = 'block';  
            document.getElementById('button').style.display = 'inline-block';   

        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected

        document.getElementById('preview').src = "#";
        // Hide the preview image
        document.getElementById('preview').style.display = 'none'; 
        document.getElementById('button').style.display = 'none'; 
    }
});















        // document.addEventListener('contextmenu', function (e) {
        //     e.preventDefault();
        // });

//         var maxPictures = 3;
//     var picturesTaken = 0;

//     document.getElementById("fileInput").addEventListener("change", function() {
//         if (this.files && this.files.length > 0) {
//             // Check if the number of pictures selected plus previously taken pictures exceeds the limit
//             if (this.files.length + picturesTaken > maxPictures) {
//                 alert("You can only take a maximum of " + maxPictures + " pictures.");
//                 // Clear the file input to prevent additional selection
//                 this.value = "";
//             } else {
//                 picturesTaken += this.files.length;
//             }
//         }
//     });




// document.getElementById('image').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const canvas = document.getElementById('canvas');
//         const context = canvas.getContext('2d');
//         const reader = new FileReader();
        
//         reader.onload = function(e) {
//             const img = new Image();
//             img.onload = function() {
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 context.filter = 'grayscale(100%)'; // Example filter: grayscale
//                 context.drawImage(img, 0, 0, canvas.width, canvas.height);

//                 // Convert canvas to blob and update the file input
//                 canvas.toBlob(function(blob) {
//                     const newFile = new File([blob], file.name, { type: 'image/jpg' });
//                     const dataTransfer = new DataTransfer();
//                     dataTransfer.items.add(newFile);
//                     document.getElementById('image').files = dataTransfer.files;
//                 }, 'image/jpg');
//             };
//             img.src = e.target.result;
//         };
        
//         reader.readAsDataURL(file);
//     }
// });
