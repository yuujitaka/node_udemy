const { StatusCodes } = require('http-status-codes');
const HttpError = require('./errors');
const path = require('path');

const uploadImage = async (image) => {
  const maxSize = 1024 * 1024;
  if (!image || !image.mimetype.startsWith('image'))
    throw new HttpError('Please upload an image', StatusCodes.BAD_REQUEST);

  if (image.size > maxSize)
    throw new HttpError(
      'Upload image smaller than 1MB',
      StatusCodes.BAD_REQUEST
    );

  const file = image.name.split('.');
  const imageName = `${file[0] + Date.now()}.${file[1]}`;

  const imagePath = path.join(__dirname, '../public/uploads/' + `${imageName}`);

  await image.mv(imagePath);

  return `/uploads/${imageName}`;
};

module.exports = uploadImage;
