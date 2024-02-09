const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const PORT = 5000;

//app.use(middleware) app.use(route, middleware) app.use([middlewares])
app.use('/api', logger);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/api/about', (req, res) => {
  res.send('API About');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
