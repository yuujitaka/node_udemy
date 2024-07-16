const createProduct = async (req, res) => {
  res.send('createProduct');
};

const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
};

const getProduct = async (req, res) => {
  res.send('getProduct');
};

const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

const uploadImage = async (req, res) => {
  res.send('uploadImage');
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
