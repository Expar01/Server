const express = require('express');
const app = express();
const port = 3000;
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
    console.log(`Server running at http://localhost:${port}`);
});
