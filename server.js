const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 443; // Port HTTPS par défaut

// Chemin vers les fichiers de certificat SSL
const privateKey = fs.readFileSync('./key.pem', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

// Vos routes et gestionnaires d'API ici
app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});

httpsServer.listen(port, () => {
  console.log(`Serveur HTTPS écoutant sur le port ${port}`);
});
