const nodemailer = require('nodemailer');
const mailerConfig = require('../config/nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(mailerConfig);

  await transporter.sendMail({
    from: '"Auth Workflow" <maddison53@ethereal.email>', // sender address
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const link = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking <a href="${link}">here</a></p>`;

  await sendEmail({
    to: email,
    subject: 'Auth Workflow - Email Verification',
    html: `<h4>Hello ${name}!</h4>${message}`,
  });
};
module.exports = { sendVerificationEmail };
