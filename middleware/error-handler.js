const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(err.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: err.message ?? `${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${err}`,
  });
};

module.exports = errorHandlerMiddleware;
