const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'], // Allow GET and POST
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
// Middleware
app.use(cors(corsOptions)); // Enable CORS to allow iframe loading from different origins
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the root directory
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

// Path to variables.json file
// Path to variables.json
const variablesPath = path.join(__dirname, 'variables.json');

// API to get variables
// Endpoint to get variables
app.get('/api/variables', (req, res) => {
  fs.readFile(variablesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading variables file:', err);
      return res.status(500).json({ error: 'Unable to read variables file' });
    }
    res.json(JSON.parse(data)); // Send variables as JSON
  });
    fs.readFile(variablesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading variables file:', err);
            return res.status(500).json({ error: 'Unable to read variables file' });
        }
        res.json(JSON.parse(data)); // Send variables as JSON
    });
});

// API to update variables
// Endpoint to update variables
app.post('/api/variables', (req, res) => {
  const newVariables = req.body;
  fs.writeFile(variablesPath, JSON.stringify(newVariables, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing variables file:', err);
      return res.status(500).json({ error: 'Unable to save variables file' });
    const newVariables = req.body;
    // Convert Open value from epoch time to seconds
    if (newVariables.Open) {
        newVariables.Open = parseInt(newVariables.Open); // Convert string to integer
    }
    res.json({ success: true, message: 'Variables updated successfully' });
  });
    fs.writeFile(variablesPath, JSON.stringify(newVariables, null, 2), 'utf8', (err) => {
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
    console.log(`Server running at http://localhost:${port}`);
});
