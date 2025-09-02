document.getElementById('login-form').addEventListener('submit', async function (event) {
  // Prevent the default form submission which reloads the page
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessageDiv = document.getElementById('error-message');

  try {
    // Send a POST request to your backend API's login endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // If login is successful (status 200-299)
      const data = await response.json();

      // Store the token securely in the browser's local storage
      localStorage.setItem('authToken', data.tokens.accessToken);

      // Redirect to the main dashboard (we'll create index.html next)
      window.location.href = 'index.html';
    } else {
      // If login fails (status 401, 404, etc.)
      const errorData = await response.json();
      errorMessageDiv.textContent = errorData.message || 'Invalid email or password.';
      errorMessageDiv.style.display = 'block';
    }
  } catch (error) {
    // Handle network errors, etc.
    console.error('Login failed:', error);
    errorMessageDiv.textContent = 'An error occurred. Please try again later.';
    errorMessageDiv.style.display = 'block';
  }
});
