const express = require('express');
const app = express();
const PORT = 5000;

app.all('/', (req, res) => {
  res.send('text');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
