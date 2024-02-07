const express = require('express');
const app = express();
const PORT = 5000;

//built-in middleware for serving static files
//it serves index.html automatically in GET /, to remove this behavior use { index: false }
app.use(express.static('./public'));

app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
