const apiUrl = '/api/variables';

async function fetchVariables() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const variablesContainer = document.getElementById('variables');
    variablesContainer.innerHTML = '';

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
    console.error('Error fetching variables:', error);
  }
}

async function updateVariables() {
  const inputs = document.querySelectorAll('#variables input');
  const updatedVariables = {};

  inputs.forEach(input => {
    updatedVariables[input.id] = input.value;
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedVariables),
    });
    const result = await response.json();
    if (result.success) {
      alert('Variables updated successfully!');
    } else {
      alert('Failed to update variables.');
    }
  } catch (error) {
    console.error('Error updating variables:', error);
  }
}

document.getElementById('updateButton').addEventListener('click', updateVariables);

// Fetch variables on page load
fetchVariables();
