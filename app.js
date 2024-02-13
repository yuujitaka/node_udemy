const express = require('express');
const app = express();
const routerTasks = require('./routes/tasks');
const PORT = 5000;

// to access req.body.property
app.use(express.json());
app.use('/api/v1/tasks', routerTasks);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
