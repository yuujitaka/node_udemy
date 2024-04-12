const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authenticationMiddleware = require('./middleware/auth');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
