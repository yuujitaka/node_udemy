const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const HttpError = require('../utils/errors');

const uploadImageLocal = async (req, res) => {
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

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = uploadImage;
