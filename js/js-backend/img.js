
            // .then(response => {
            //     if (response.ok) {
            //         fileInput.value = ''; 
            //     } else {
            //         return response.json();
            //     }
            // })
            // .then(data => {
            //     if (data && data.message) {
            //         errorMessageElement.textContent = data.message;
            //     } else {          
            //         succesMessageElement.textContent = 'Image uploaded successfull.';          
            //     }
            // })
            // .catch(error => {
            //     console.error('Error uploading image:', error);
            //     errorMessageElement.textContent = 'Error uploading image. Please try again.';
            // });
 


document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

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
            document.getElementById('success-message').textContent = result.message;
            document.getElementById('uploadForm').reset();
        } else {
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }
});
