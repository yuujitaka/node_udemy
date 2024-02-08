const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const PORT = 5000;

app.get('/', logger, (req, res) => {
  res.send('Home');
});

app.get('/about', logger, (req, res) => {
  res.send('About');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
