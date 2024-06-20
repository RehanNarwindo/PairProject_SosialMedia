const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pairprojectdesaku@gmail.com",
        pass: "rils pjfj bnvs rejl",
      },
    });

    let mailOptions = {
      from: '"Admin" pairprojectdesaku@gmail.com', // Sender address
      to: to, // Receiver's email address
      subject: subject, // Subject line
      text: text, // Plain text body
      html: html, // HTML body
    };

    // Send mail
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = sendEmail;
