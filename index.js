const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 3000;

// Path to SSL certificates
const privateKey = fs.readFileSync(path.join(__dirname, 'certs', 'private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certs', 'certificate.crt'), 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

// Serve static content from the 'src' folder
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`HTTPS Server is running on https://localhost:${port}`);
});
