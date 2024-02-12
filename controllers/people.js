const people = require('../dummydata');

const getPeople = (req, res) => {
  res.status(200).json({ data: people });
};

const createPerson = (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ message: 'User required.' });
  res.status(201).json({ data: user });
};

const updatePerson = (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  if (!user || !id)
    return res.status(400).json({ message: 'User and id required.' });

  const person = people.find((person) => person.id === Number(id));
  if (!person) return res.status(404).json({ message: 'User not found.' });

  res.status(201).json({ data: user });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID required.' });

  const person = people.find((person) => person.id === Number(id));

  if (!person) return res.status(404).json({ message: 'User not found.' });
  res.status(201).json({ message: 'User deleted' });
};

module.exports = { getPeople, createPerson, updatePerson, deletePerson };
