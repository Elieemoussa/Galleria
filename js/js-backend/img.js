// save to the databse 

document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

      // Show loading spinner
      document.getElementById('loading-spinner').style.display = 'block';

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    formData.append('image', imageFile);

    try {
        const response = await fetch('https://wedcam-eb80ccd082f6.herokuapp.com/api/v1/img/uploadimg', { 
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('message').textContent = '';
            document.getElementById('message').textContent = result.message;
            document.getElementById('uploadForm').reset();      
            document.getElementById('preview').style.display = 'none'; 

        } else {
            document.getElementById('message').textContent = '';
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = '';
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
});

document.getElementById("takePhotoButton").addEventListener("click", function() {
    
    document.getElementById("image").click();
});


// adding filter to the camera 

document.getElementById('takePhotoButton').addEventListener('click', async function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Get access to the camera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
    } catch (error) {
        document.getElementById('message').textContent = `Error accessing camera: ${error.message}`;
        return;
    }

    // Capture the photo with the filter
    video.addEventListener('play', function() {
        context.filter = 'grayscale(100%)'; // Example filter: grayscale
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
        video.style.display = 'none';

        // Stop the video stream
        video.srcObject.getTracks().forEach(track => track.stop());

        // Convert canvas to a data URL and set it as the file input value
        canvas.toBlob(function(blob) {
            const file = new File([blob], 'photo.jpg', { type: 'image/jpg' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('image').files = dataTransfer.files;
        });
    });
});







// show under the input 
document.getElementById('image').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById('preview').src = event.target.result;
        document.getElementById('preview').style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById('preview').src = "#";
      document.getElementById('preview').style.display = 'none'; 
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