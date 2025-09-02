document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Stop the form from reloading the page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageContainer = document.getElementById('message-container');

  // Find the radio button that is checked and get its value
  const selectedRole = document.querySelector('input[name="role"]:checked').value;

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role: selectedRole }),
    });

    const data = await response.json();

    if (response.ok) {
      // Check for a successful status code (e.g., 201 Created)
      messageContainer.textContent = 'Registration successful! Redirecting to login...';
      messageContainer.className = 'alert alert-success'; // Use Bootstrap success class
      messageContainer.style.display = 'block';

      // Redirect the user to the login page after a short delay
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      // If the server returns an error (e.g., 409 Conflict, 400 Bad Request)
      // The message from our backend is in data.message or data.errors
      let errorMessage = data.message || 'An unknown error occurred.';
      if (data.errors && data.errors[0].message) {
        errorMessage = data.errors[0].message;
      }

      messageContainer.textContent = errorMessage;
      messageContainer.className = 'alert alert-danger'; // Use Bootstrap danger class
      messageContainer.style.display = 'block';
    }
  } catch (error) {
    console.error('Registration failed:', error);
    messageContainer.textContent = 'An error occurred. Please try again later.';
    messageContainer.className = 'alert alert-danger';
    messageContainer.style.display = 'block';
  }
});
