const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: 'User and password required.' });
  res.status(200).json({ data: user });
});

module.exports = router;
