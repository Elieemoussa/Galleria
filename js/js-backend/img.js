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

    // Function to handle taking a photo
    function takePhoto() {
        // Check if the device supports the mediaDevices interface
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Request access to the camera
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                // Display the camera stream in a video element
                var video = document.createElement('video');
                video.srcObject = stream;
                document.body.appendChild(video);

                // Pause video playback
                video.pause();

                // Function to capture a frame from the video
                function captureFrame() {
                    // Create a canvas element
                    var canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var context = canvas.getContext('2d');

                    // Draw the current frame from the video onto the canvas
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert the canvas content to a data URL representing the image
                    var imageDataURL = canvas.toDataURL('image/jpeg');

                    // Set the data URL as the value of the file input
                    document.getElementById('image').setAttribute('value', imageDataURL);

                    // Clean up
                    video.pause();
                    stream.getVideoTracks()[0].stop();
                    video.parentNode.removeChild(video);
                }

                // Play the video to capture a frame
                video.play();

                // Capture a frame after a short delay
                setTimeout(captureFrame, 1000);
            }).catch(function(error) {
                console.error('Error accessing camera:', error);
            });
        } else {
            console.error('getUserMedia not supported');
        }
    }

    // Event listener for the "Take Photo" button
    document.getElementById('takePhotoButton').addEventListener('click', function() {
        takePhoto();
        document.getElementById('uploadButton').style.display = 'inline-block'; // Show the upload button after taking the photo
    });
