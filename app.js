const express = require('express');
require('express-async-errors');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

start();
