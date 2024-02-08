const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json([{ name: 'Rebeca' }, { name: 'Lucas' }]);
});

//search params / query strings
app.get('/api/v1/query', (req, res) => {
  console.log(req.query);
  const queries = JSON.stringify(req.query);
  res.send(`queries ${queries}`);
});

//url params
app.get('/api/v1/:id', (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  res.send(`hello ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
