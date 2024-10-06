// server.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to the text file that stores certificate data
const CERTIFICATE_FILE = 'certificates.txt';

// Function to save certificate data to a text file
function saveCertificate(data) {
  const entry = `${JSON.stringify(data)}\n`;
  fs.appendFileSync(CERTIFICATE_FILE, entry, 'utf8');
}

// Endpoint to generate a new certificate
app.post('/generate', (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const uid = uuidv4(); // Generate a unique identifier
  const dateGenerated = new Date().toLocaleString();
  const message = 'You have obtained your easyASL basic certificate!';
  const certificateData = { uid, name, dateGenerated, message };

  saveCertificate(certificateData);

  res.json(certificateData);
});

// Endpoint to look up a certificate by name
app.get('/lookup/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  if (!fs.existsSync(CERTIFICATE_FILE)) {
    return res.status(404).json({ error: 'Certificate not found' });
  }
  const entries = fs.readFileSync(CERTIFICATE_FILE, 'utf8').split('\n').filter(Boolean);
  const certificate = entries
    .map((line) => JSON.parse(line))
    .find((cert) => cert.name.toLowerCase() === name);
  if (certificate) {
    res.json(certificate);
  } else {
    res.status(404).json({ error: 'Certificate not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
