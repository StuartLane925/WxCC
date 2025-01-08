const apiUrl = '/api/variables'; // Backend API URL

// Fetch current variable values from the backend
async function fetchVariables() {
  try {
    const response = await fetch(apiUrl); // Make the GET request
    const data = await response.json(); // Parse the JSON response

    // Ensure the data is logged in the console
    console.log('Fetched Variables:', data);

    // Get the container where variables will be displayed
    const variablesContainer = document.getElementById('variables');
    variablesContainer.innerHTML = ''; // Clear existing variables

    // Loop through the data and create input fields for each variable
    Object.entries(data).forEach(([key, value]) => {
      const variableDiv = document.createElement('div');
      variableDiv.className = 'variable';
      variableDiv.innerHTML = `
        <label>${key}:</label>
        <input type="text" id="${key}" value="${value}" />
      `;
      variablesContainer.appendChild(variableDiv);
    });
  } catch (error) {
    console.error('Error fetching variables:', error); // Log any errors
  }
}

// Update variables and send them to the backend
async function updateVariables() {
  const inputs = document.querySelectorAll('#variables input'); // Get all input fields
  const updatedVariables = {};

  // Collect the updated values from the input fields
  inputs.forEach(input => {
    updatedVariables[input.id] = input.value;
  });

  try {
    // Send the updated variables to the backend
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedVariables),
    });

    const result = await response.json(); // Get the response from the backend
    if (result.success) {
      alert('Variables updated successfully!');
    } else {
      alert('Failed to update variables.');
    }
  } catch (error) {
    console.error('Error updating variables:', error); // Log any errors
  }
}

// Attach the update function to the button
document.getElementById('updateButton').addEventListener('click', updateVariables);

// Fetch variables when the page loads
fetchVariables();
