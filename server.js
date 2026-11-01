const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Render gives you the port through process.env.PORT
const PORT = process.env.PORT || 3000;

// Put your MongoDB Atlas connection string in Render > Environment as MONGO_URI
// (the fallback is only for running on your own PC)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weatherstation';

app.use(express.json());

// ---------- Frontend files (all sit in the repo root) ----------
// Only these three files are public. server.js and package.json stay private.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'script.js'));
});

// ---------- Your API routes go here ----------
// Example health check, handy for testing on Render
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ---------- Database + server start ----------
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
