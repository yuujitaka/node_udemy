const express = require('express');
const app = express();
const peopleRouter = require('./routes/people');
const authRouter = require('./routes/auth');
const PORT = 5000;

app.use(express.static('./public'));
//parses incoming requests with JSON payloads ex: req.body.property
app.use(express.json());
// to form-data
app.use(express.urlencoded({ extended: false }));

app.use('/api/people', peopleRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
