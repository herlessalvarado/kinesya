const express = require('express');
const app = express();

const Port = process.env.Port || 8000;

app.listen(Port, () => console.log('Server Started'));