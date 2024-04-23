const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authenticationMiddleware = require('./middleware/auth');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
//swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
//extra secutity packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

//swagger load
const swaggerDocument = YAML.load('./swagger.yaml');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send("<h1>Jobs API</h1><a href='/api-docs'>Documentation </a>");
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
