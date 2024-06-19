const { StatusCodes } = require('http-status-codes');
const path = require('path');

const uploadImage = async (req, res) => {
  let image = req.files.image;
  const imagePath = path.join(__dirname, '../public/img', image.name);
  await image.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ img: { src: `/img/${image.name}` } });
};

module.exports = uploadImage;
