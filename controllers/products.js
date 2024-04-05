const Product = require('../model/product');

const getAllProducts = async (req, res) => {
  const { sort, fields, page, limit, numericFilters } = req.query;
  const pageN = Number(page) || 1;
  const limitN = Number(limit) || 10;
  const skip = (pageN - 1) * limitN;

  //add the property only if its value is defined
  const queryObject = (({ featured, company, name }) => {
    return {
      ...(featured && { featured: featured === 'true' ? true : false }),
      ...(company && { company }),
      ...(name && { name: { $regex: name, $options: 'i' } }),
    };
  })(req.query);

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field))
        queryObject[field] = { [operator]: Number(value) };
    });
  }

  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  //send only the fields requested plus id
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  //pagination
  retult = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};
