const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to variables.json
const variablesPath = path.join(__dirname, 'variables.json');

// Endpoint to get variables
app.get('/api/variables', (req, res) => {
    fs.readFile(variablesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read variables file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to update variables
app.post('/api/variables', (req, res) => {
    const newVariables = req.body;
    fs.writeFile(variablesPath, JSON.stringify(newVariables, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to save variables file' });
        }
        res.json({ success: true, message: 'Variables updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
