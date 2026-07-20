import nodemailer from "nodemailer";


console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
console.log("EMAIL_USER =", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,

    // port: process.env.EMAIL_PORT,
     port: Number(process.env.EMAIL_PORT),

    secure: true,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

await transporter.verify();
console.log("SMTP server is ready");

const sendEmail = async ({ to, subject, html }) => {

    await transporter.sendMail({

        from: process.env.EMAIL_FROM,

        to,

        subject,

        html

    });

};




export default sendEmail;