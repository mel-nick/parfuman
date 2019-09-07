const nodemailer = require('nodemailer');

require('dotenv').config();

const templateMedia = [
  {
    filename: 'email_bg.jpg',
    path: __dirname + '/images/email_bg.jpg',
    cid: 'order'
  },
]

// Transparter Setup
const transporter = nodemailer.createTransport(
  {
    pool: true,
    maxConnections: 10,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.CLIENT_SMPT_EMAIL,
      pass: process.env.CLIENT_SMPT_PASSWORD
    }
  }, {
    from: `ParfuMan <${process.env.CLIENT_SMPT_EMAIL}>`,
  }
)

// Create transporter mailer function
const mailer = message => {
  transporter.sendMail({ ...message }, (err, info) => {
      if(err) return console.log(err)
      console.log('Email sent: ', info)
  });
}

module.exports = {
  templateMedia: templateMedia,
  mailer: mailer
}