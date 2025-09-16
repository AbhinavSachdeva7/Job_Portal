// Function to fetch jobs from the API
async function fetchJobs() {
  try {
    const response = await fetch('/api/jobs');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Function to render jobs in the table
function renderJobs(jobs) {
  const tbody = document.querySelector('#jobs-table tbody');

  if (!tbody) {
    console.error('Table body not found');
    return;
  }

  // Clear existing content
  tbody.innerHTML = '';

  if (jobs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">No jobs available</td></tr>';
    return;
  }

  // Render each job
  jobs.forEach((job) => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${job.company?.name || 'N/A'}</td>
            <td>${job.title || 'N/A'}</td>
            <td>${job.description || 'N/A'}</td>
            <td>${job.pay || 'N/A'}</td>
        `;
    tbody.appendChild(row);
  });
}

// Function to initialize the page
async function initializeJobsPage() {
  try {
    // Show loading state
    const tbody = document.querySelector('#jobs-table tbody');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">Loading jobs...</td></tr>';
    }

    // Fetch and render jobs
    const jobs = await fetchJobs();
    renderJobs(jobs);
  } catch (error) {
    console.error('Error initializing jobs page:', error);
    const tbody = document.querySelector('#jobs-table tbody');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error loading jobs</td></tr>';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeJobsPage);
