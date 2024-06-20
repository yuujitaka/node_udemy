const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEth = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kira93@ethereal.email',
      pass: 'f2UUm9wbqGmuSEpYjf',
    },
  });

  let info = await transporter.sendMail({
    from: '"Rebeca" <rebecacleviane@gmail.com',
    to: 'example@example.com',
    subject: 'Hello',
    html: '<h1>Sendind emails with nodejs</h2>',
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'rebecacleviane@gmail.com', // Change to your recipient
    from: 'rebecacleviane@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  const info = await sgMail.send(msg);
  res.send(info);
};

module.exports = sendEmail;
