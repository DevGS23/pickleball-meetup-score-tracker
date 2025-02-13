const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Pickleball Meetup API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});