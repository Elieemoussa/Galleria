document.addEventListener('DOMContentLoaded', function () {
    const imageForm = document.getElementById('imageForm');
    const errorMessageElement = document.getElementById('error-message');

    if (imageForm) {
        imageForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (!file) {
                errorMessageElement.textContent = "Please select an image to upload.";
                return;
            }

            const formData = new FormData();
            formData.append('image', file);

            fetch('https://wedcam-eb80ccd082f6.herokuapp.com/api/v1/img/uploadimg', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    fileInput.value = ''; // Clear the input field
                } else {
                    return response.json();
                }

            })
            .then(data => {
                if (data && data.message) {
                    errorMessageElement.textContent = "Image uploaded successfull.";
                } else {
                    const errorMessageElement = document.getElementById('error-message');
                    errorMessageElement.textContent = 'Registration failed. Please try again.';
                
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                errorMessageElement.textContent = 'Error uploading image. Please try again.';
            });
        });
    }
});

