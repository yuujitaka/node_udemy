const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>');
});

app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
