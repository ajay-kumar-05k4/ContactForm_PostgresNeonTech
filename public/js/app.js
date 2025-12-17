document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const responseDiv = document.getElementById('response');

    if (result.success) {
      responseDiv.innerHTML = '<p style="color: green;">' + result.message + '</p>';
      e.target.reset();
    } else {
      responseDiv.innerHTML = '<p style="color: red;">' + result.message + '</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response').innerHTML = '<p style="color: red;">An error occurred. Please try again.</p>';
  }
});
