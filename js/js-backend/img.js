
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
            document.getElementById('success-message').textContent = '';
            document.getElementById('success-message').textContent = result.message;
            document.getElementById('uploadForm').reset();
            document.getElementById('message').textContent = '';
        } else {
            document.getElementById('success-message').textContent = '';
            document.getElementById('message').textContent = `Error: ${result.error || result.message}`;
        }
    } catch (error) {
        document.getElementById('success-message').textContent = '';
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
});
