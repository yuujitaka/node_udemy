const express = require('express');
const path = require('path');
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authenticationMiddleware = require('./middleware/auth');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const userRouter = require('./routes/user');
const jobsRouter = require('./routes/jobs');
//swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
//extra secutity packages
const helmet = require('helmet');
const xss = require('xss-clean');

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

app.set('trust proxy', 1);

//swagger load
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
