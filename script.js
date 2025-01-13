const apiUrl = 'https://wxcc.onrender.com/api/variables'; // Use the backend API URL

// Initialize date and time picker
$(function() {
    $('#Open').datetimepicker({
        dateFormat: 'yy-mm-dd', // Date format
        timeFormat: 'HH:mm:ss', // Time format
        onSelect: function(dateText) {
            // Convert selected date and time to epoch time (Unix timestamp)
            const epochTime = new Date(dateText).getTime() / 1000; // Convert to seconds
            $('#Open').data('epochTime', epochTime); // Store epoch time as data attribute
        }
    });
});

// Fetch current variable values from the backend
async function fetchVariables() {
    try {
        const response = await fetch(apiUrl); // Make the GET request
        const data = await response.json(); // Parse the JSON response

        console.log('Fetched Variables:', data); // Log fetched data

        const variablesContainer = document.getElementById('variables');
        variablesContainer.innerHTML = ''; // Clear existing variables

        // Loop through the data and create inputs or date pickers for each variable
        Object.entries(data).forEach(([key, value]) => {
            const variableDiv = document.createElement('div');
            variableDiv.className = 'variable';

            if (key === 'Open') {
                // Use a text input for Open
                variableDiv.innerHTML = `
                    <label for="${key}">${key}:</label>
                    <input type="text" id="${key}" name="${key}" value="${new Date(value * 1000).toISOString().slice(0, 16)}" />
                `;
            } else {
                // Use a regular input for other variables
                variableDiv.innerHTML = `
                    <label for="${key}">${key}:</label>
                    <input type="text" id="${key}" name="${key}" value="${value}" />
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
    const inputs = document.querySelectorAll('#variables input'); // Get all inputs
    const updatedVariables = {};

    inputs.forEach(input => {
        // Convert Open value to epoch time before sending to backend
        if (input.id === 'Open') {
            updatedVariables[input.id] = $('#Open').data('epochTime');
        } else {
            updatedVariables[input.id] = input.value;
        }
    });

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
