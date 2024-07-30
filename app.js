require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const notFoundMiddleware = require('./middleware/error-handler');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { authenticationMiddleware } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'));
app.use(express.json());
//sign cookie -> cookieParser(secret)
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
  console.log('normal cookies', req.cookies);
  console.log('signed cookies', req.signedCookies);
  res.send('Hello!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', authenticationMiddleware, userRoutes);
app.use('/api/v1/products', authenticationMiddleware, productRoutes);
app.use('/api/v1/reviews', authenticationMiddleware, reviewRoutes);
app.use('/api/v1/orders', authenticationMiddleware, orderRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');
    app.listen(port, () => console.log('Server listening on Port', port));
  } catch (error) {
    console.log('Start error:', error);
  }
};

start();
