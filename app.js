const people = require('./dummydata');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('./public'));
//parses incoming requests with JSON payloads ex: req.body.property
app.use(express.json());
// to form-data
app.use(express.urlencoded({ extended: false }));

app.get('/api/people', (req, res) => {
  res.status(200).json({ data: people });
});

app.post('/api/people', (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ message: 'User required.' });
  res.status(201).json({ data: user });
});

app.put('/api/people/:id', (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  if (!user || !id)
    return res.status(400).json({ message: 'User and id required.' });

  const person = people.find((person) => person.id === Number(id));
  if (!person) return res.status(404).json({ message: 'User not found.' });

  res.status(201).json({ data: user });
});

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID required.' });

  const person = people.find((person) => person.id === Number(id));

  if (!person) return res.status(404).json({ message: 'User not found.' });
  res.status(201).json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
