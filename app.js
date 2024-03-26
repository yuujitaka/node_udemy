const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api/v1/products/', productsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

start();
