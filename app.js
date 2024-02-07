const express = require('express');
const app = express();
const PORT = 5000;

//built-in middleware for serving static files
app.use(express.static('./public'));

app.get('/', (req, res) => {
  /* OR
  const path = require('path');
  res.sendFile(path.join(__dirname, '/src/index.html'))
  res.sendFile(path.resolve('src/index.html'));
*/
  res.sendFile('./public/index.html', { root: __dirname });
});

app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
