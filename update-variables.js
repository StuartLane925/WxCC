const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Path to the variables file
const variablesFilePath = 'https://wxcc.onrender.com/variables.json';

// Endpoint to fetch variables
app.get('https://wxcc.onrender.com/variables.json', (req, res) => {
    fs.readFile(variablesFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading variables file');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint to update variables
app.post('https://wxcc.onrender.com/update-variables.js', (req, res) => {
    const updatedVariables = req.body;

    // Save the updated variables to the JSON file
    fs.writeFile(variablesFilePath, JSON.stringify(updatedVariables, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving variables file');
        }
        res.send({ message: 'Variables updated successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at https://wxcc.onrender.com:${port}`);
});
