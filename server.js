const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the JSON file
app.get('/api/variables', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/variables.json'));
});

app.listen(port, () => {
    console.log(`Server running on https://wxcc.onrender.com:${port}`);
});

