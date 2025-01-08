const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Variables
let variables = {
  Open: "Yes",
  Emergency: "No",
  CCBEnabled: "True"
};

// Endpoint to get variables
app.get('/api/variables', (req, res) => {
  res.json(variables);
});

// Endpoint to update variables
app.post('/api/variables', (req, res) => {
  const { Open, Emergency, CCBEnabled } = req.body;
  if (Open !== undefined) variables.Open = Open;
  if (Emergency !== undefined) variables.Emergency = Emergency;
  if (CCBEnabled !== undefined) variables.CCBEnabled = CCBEnabled;

  res.json({ message: 'Variables updated successfully', variables });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on https://wxcc.onrender.com:${port}`);
});
