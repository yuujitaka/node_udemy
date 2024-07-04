const getAllUsers = async (req, res) => {
  res.send('get all users');
};

const getUser = async (req, res) => {
  res.send('get user');
};

const showUser = async (req, res) => {
  res.send('show user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

const updateUserPassword = async (req, res) => {
  res.send('update user password');
};

module.exports = {
  getAllUsers,
  getUser,
  showUser,
  updateUser,
  updateUserPassword,
};
