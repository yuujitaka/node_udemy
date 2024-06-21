const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  res.send('Registered');
};

const logout = async (req, res) => {
  res.send('logged out');
};

module.exports = {
  login,
  register,
  logout,
};
