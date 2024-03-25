const errorHandlerMiddleware = (err, req, res, next) => {
  return res
    .status(err.status ?? 500)
    .json({ msg: err.message ?? `Something went wrong: ${err}` });
};

module.exports = errorHandlerMiddleware;
