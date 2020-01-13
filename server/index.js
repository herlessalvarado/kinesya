const express = require('express');
const connectDB = require('./Repository/Connection');
const app = express();

connectDB();
const Port = process.env.Port || 8000;

app.listen(Port, () => console.log('Server Started'));