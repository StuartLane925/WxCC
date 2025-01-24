const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

// Path to variables.json
const variablesPath = path.join(__dirname, 'variables.json');

// Default variables structure
const defaultVariables = {
  Open: "Open",
  Emergency: "No",
  CCBEnabled: "Enabled",
  WhiteboardActive: "Inactive",
  WhiteboardMessage: "Default",
  CustomMessage: "" // Default value for the new text box field
};

// Endpoint to get variables
app.get('/api/variables', (req, res) => {
  fs.readFile(variablesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading variables file:', err);
      return res.status(500).json({ error: 'Unable to read variables file' });
    }

    let variables;
    try {
      variables = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing variables file:', parseError);
      return res.status(500).json({ error: 'Unable to parse variables file' });
    }

    // Ensure all expected variables are present, using default values if missing
    const updatedVariables = { ...defaultVariables, ...variables };
    res.json(updatedVariables);
  });
});

// Endpoint to update variables
app.post('/api/variables', (req, res) => {
  const newVariables = req.body;

  // Ensure all expected variables are included
  const updatedVariables = { ...defaultVariables, ...newVariables };

  fs.writeFile(variablesPath, JSON.stringify(updatedVariables, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing variables file:', err);
      return res.status(500).json({ error: 'Unable to save variables file' });
    }
    res.json({ success: true, message: 'Variables updated successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
