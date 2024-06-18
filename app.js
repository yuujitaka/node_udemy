const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
