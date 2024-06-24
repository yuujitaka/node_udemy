require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const notFoundMiddleware = require('./middleware/error-handler');
const errorHandlerMiddleware = require('./middleware/error-handler');
const UserRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('Hello!');
});

app.use('/api/v1/auth', UserRoutes);

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
