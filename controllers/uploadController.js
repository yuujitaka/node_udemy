const { StatusCodes } = require('http-status-codes');
const path = require('path');
const HttpError = require('../utils/errors');

const uploadImage = async (req, res) => {
  if (!req.files)
    throw new HttpError('Image required', StatusCodes.BAD_REQUEST);

  let image = req.files.image;

  if (!image.mimetype.startsWith('image'))
    throw new HttpError('Image only', StatusCodes.BAD_REQUEST);

  if (image.size > 50000)
    throw new HttpError(
      'Image too big! Should be less than 50kb',
      StatusCodes.BAD_REQUEST
    );

  const imagePath = path.join(__dirname, '../public/img', image.name);

  await image.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ img: { src: `/img/${image.name}` } });
};

module.exports = uploadImage;
