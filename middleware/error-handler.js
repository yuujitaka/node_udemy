const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message ?? `${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${err}`,
  };

  if (err.code) {
    switch (err.code) {
      case 11000:
        customError.statusCode = 409;
        customError.message = `${Object.keys(err.keyValue.t)} already exist${
          Object.keys.length > 1 ? '' : 's'
        }`;
    }
  }

  return res.status(customError.statusCode).json({
    msg: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
