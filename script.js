const apiUrl = 'https://wxcc.onrender.com/api/variables'; // Use the backend API URL

// Define allowed values for each variable
const allowedValues = {
  Open: ['Open', 'Closed', 'Emergency'],
  Emergency: ['Yes', 'No'],
  CCBEnabled: ['Enabled', 'Disabled'],
  WhiteboardActive: ['Active', 'Inactive'],
  WhiteboardMessage: ['Default', 'Message 1', 'Message 2'] // No predefined values for WhiteboardMessage
};

// Fetch current variable values from the backend
async function fetchVariables() {
  try {
    const response = await fetch(apiUrl); // Make the GET request
    const data = await response.json(); // Parse the JSON response

    console.log('Fetched Variables:', data); // Log fetched data

    const variablesContainer = document.getElementById('variables');
    variablesContainer.innerHTML = ''; // Clear existing variables

    // Loop through the data and create dropdowns or text inputs for each variable
    Object.entries(data).forEach(([key, value]) => {
      const variableDiv = document.createElement('div');
      variableDiv.className = 'variable';

      // Check if there are allowed values for this variable
      const options = allowedValues[key] || [];

      if (options.length > 0) {
        // Create a dropdown if options are defined
        const selectElement = document.createElement('select');
        selectElement.id = key;

        options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          if (option === value) optionElement.selected = true; // Set current value as selected
          selectElement.appendChild(optionElement);
        });

        variableDiv.innerHTML = `<label>${key}:</label>`;
        variableDiv.appendChild(selectElement);
      } else {
        // Fallback to a text input if no predefined options
        variableDiv.innerHTML = `
          <label>${key}:</label>
          <input type="text" id="${key}" value="${value}" />
        `;
      }

      variablesContainer.appendChild(variableDiv);
    });
  } catch (error) {
    console.error('Error fetching variables:', error); // Log errors
  }
}

// Update variables and send them to the backend
async function updateVariables() {
  const inputs = document.querySelectorAll('#variables select, #variables input'); // Get all dropdowns and text inputs
  const updatedVariables = {};

  // Collect the updated values from the fields
  inputs.forEach(input => {
    updatedVariables[input.id] = input.value;
  });

  // Show a confirmation dialog with the changes
  const confirmationMessage = `You are about to update the following variables:\n\n${Object.entries(updatedVariables)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}\n\nDo you want to proceed?`;

  if (!window.confirm(confirmationMessage)) {
    // If the user clicks "Cancel," exit the function
    return;
  }

  try {
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
    console.error('Error updating variables:', error); // Log errors
  }
}


// Attach the update function to the button
document.getElementById('updateButton').addEventListener('click', updateVariables);

// Fetch variables when the page loads
fetchVariables();
