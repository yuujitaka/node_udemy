const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = new Error('Username and password required');
    error.status = 400;
    throw error;
  }
  res.send('test');
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({ msg: 'Hello', secret: `Your lucky number is: ${luckyNumber}` });
};

module.exports = { login, dashboard };
