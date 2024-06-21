const express = require('express');
const connectDB = require('./config/db');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

const start = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');
    app.listen(port, () => console.log('Server listening on Port', port));
  } catch (error) {
    console.log('Start error:', error);
  }
};

start();
