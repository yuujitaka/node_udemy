const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routerTasks = require('./routes/tasks');
const connectDB = require('./config/db');
const notFound = require('./middleware/not-found');
const PORT = 3000;

connectDB();
// to access req.body.property
app.use(express.json());
app.use('/api/v1/tasks', routerTasks);
app.use(notFound);

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
