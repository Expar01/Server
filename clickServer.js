const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 3000;

// Используйте созданные файлы
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

let clickCount = 0;
app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/click', (req, res) => {
    clickCount += 1;
    console.log('Click counted', clickCount);
    
    res.json({ message: 'Click counted', clickCount });
});

app.get('/clicks', (req, res) => {
    res.json({ clickCount });
});

app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
