const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

app.use('/files', express.static('./public'));
app.use(express.static('./client'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get('/', (req, res) => {
  res.sendFile('./client/index.html');
});
app.use('/api/v1/products', productRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
