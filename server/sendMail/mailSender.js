const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

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
const sendMail = async (to, emailtype, subject, code) => {
  const emailType = emailtype;

  // load the html file here
  const templatePath = path.join(__dirname, "authEmails", `${emailType}.html`);

  console.log(templatePath);

  if (!fs.existsSync(templatePath)) {
    console.log("error here");
    throw new CustomError(
      `Email template not found: ${templatePath}`,
      StatusCodes.NOT_FOUND
    );
  }

  let html = fs.readFileSync(templatePath, "utf8");
  html = html.replace(/{{CODE}}/g, code);

  try {
    const info = await transporter.sendMail({
      from: USER_EMAIL,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
