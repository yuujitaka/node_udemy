const Product = require('../model/product');

const getAllProducts = async (req, res) => {
  const queryObject = (({ featured, company, name }) => {
    return {
      ...(featured && { featured: featured === 'true' ? true : false }),
      ...(company && { company }),
      ...(name && { name: { $regex: name, $options: 'i' } }),
    };
  })(req.query);

  const products = await Product.find(queryObject);
  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};
