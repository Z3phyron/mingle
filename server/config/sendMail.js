const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
    user: "rickettsrowland234@gmail.com", // generated ethereal user
    pass: "betty234", // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

module.exports = {
  verificationEmail: async (senderAddress, link) => {
    let err = false;
    try {
      let info = await transporter.sendMail({
        from: '"Z3phyronDevs 👻" <Z3phyronDevs@gmail.com>', // sender address
        to: `${senderAddress}`, // list of receivers
        subject: "Verify Email ✔", // Subject line
        html: `Please Verify your email by clicking <a href="${link}">link</a> <br/> This email will be verified for only 7days`, // html body
      });
    } catch (error) {
      error = true;
    }
  },
  recorveryEmail: async (senderAddress, link) => {
    let err = false;
    try {
      let info = await transporter.sendMail({
        from: '"Z3phyronDevs 👻" <Z3phyronDevs@gmail.com>', // sender address
        to: senderAddress, // list of receivers
        subject: "Recorver Password ✔", // Subject line
        html: `Please Recorver your password by clicking <a href="${link}">Here</a> <br/> This email will be verified for only 7days`, // html body
      });
    } catch (error) {
      error = true;
    }
  },
};
