require("dotenv").config();
const nodemailer = require("nodemailer");

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

// create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

// function to send mail
const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: USER_EMAIL,
      to,
      subject,
      html: `<b>${text}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
