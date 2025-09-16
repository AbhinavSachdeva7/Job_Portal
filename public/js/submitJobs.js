document.getElementById('submit-job-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const jobTitle = document.getElementById('jobTitle').value;
  const jobDescription = document.getElementById('jobDescription').value;
  const location = document.getElementById('location').value;
  const pay = document.getElementById('pay').value;
  const messageContainer = document.getElementById('message-container');

  try {
    const reponse = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle, jobDescription, location, pay }),
    });

    const data = await reponse.json();

    if (reponse.ok) {
      messageContainer.textContent = 'Job submitted successfully';
      messageContainer.className = 'alert alert-success';
      messageContainer.style.display = 'block';
      window.location.href = 'index.html';
    } else {
      messageContainer.textContent = data.message;
      messageContainer.className = 'alert alert-danger';
      messageContainer.style.display = 'block';
      console.error('Failed to submit job:', data);
    }
  } catch (error) {
    console.error('Error submitting job:', error);
    messageContainer.textContent = 'An error occurred. Please try again later.';
    messageContainer.className = 'alert alert-danger';
    messageContainer.style.display = 'block';
  }
});
