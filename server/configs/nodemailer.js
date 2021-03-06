const nodemailer = require("nodemailer");
const { View } = require("grandjs");
const MailVerifyTemplate = View.importJsx("./template/MailVerifyTemplate.jsx");
const MailRestPasswordTemplate = View.importJsx(
  "./template/MailResetPasswordTemplate.jsx"
);

const sendEmail = (res, type, receiver, displayName, emailToken) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.DOMAIN}/auth/verify/user/${emailToken}`;
  const templateVerify = View.renderToHtml(MailVerifyTemplate, {
    displayName,
    verifyUrl,
  });

  const resetPasswordUrl = `${process.env.DOMAIN}/auth/reset-password/user/${emailToken}`;
  const templateResetPassword = View.renderToHtml(MailRestPasswordTemplate, {
    displayName,
    resetPasswordUrl,
  });

  // email send link
  const mailOptions = {
    from: `noreply ${process.env.NODE_MAILER_EMAIL}`,
    to: receiver,
    subject:
      type === "confirm"
        ? "Verify your email for Tech Social"
        : "Reset your password for Tech Social",
    html: type === "confirm" ? templateVerify : templateResetPassword,
    attachments: {
      filename: "logo.png",
      path: `${__dirname}/template/imgs/logo.png`,
      cid: "tech-social-logo",
    },
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res
        .status(200)
        .json(
          `Click the link we sent to ${receiver} to ${
            type === "confirm" ? "verify your account." : "reset your password."
          }`
        );
    }
  });
};

module.exports = sendEmail;
