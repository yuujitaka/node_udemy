const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' });
};

module.exports = {
  getAllProducts,
};
