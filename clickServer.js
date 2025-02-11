const fs = require('fs');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
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

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        handleMessage(ws, message);
    });

    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server' }));
});

function handleMessage(ws, message) {
    const data = JSON.parse(message);
    switch (data.action) {
        case 'click':
            handleClick(ws);
            break;
        case 'getClicks':
            handleGetClicks(ws);
            break;
        default:
            ws.send(JSON.stringify({ error: 'Unknown action' }));
    }
}

function handleClick(ws) {
    clickCount += 1;
    console.log('Click counted', clickCount);
    ws.send(JSON.stringify({ message: 'Click counted', clickCount }));
}

function handleGetClicks(ws) {
    ws.send(JSON.stringify({ clickCount }));
}

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
