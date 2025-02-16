require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Pickleball Meetup API!');
});

// Connect to database before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌍 Server running on port ${PORT}!`);
  });
});