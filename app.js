const express = require('express');
require('express-async-errors');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const sendEmail = require('./controllers/sendEmailController');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('home <a href="/send">send email</a>');
});

app.get('/send', sendEmail);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
