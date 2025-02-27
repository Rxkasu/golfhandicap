const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
    console.log("HTTP GET /api received");
});

app.post('/api', (req, res) => {
    console.log("HTTP POST /api received");
});

app.put('/api', (req, res) => {
    console.log("HTTP PUT /api received");
});

app.delete('/api', (req, res) => {
    console.log("HTTP DELETE /api received");
});

app.listen(30000, () => {
    console.log("Server is running on port" + 30000);
});
