import nodemailer from "nodemailer";

console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
console.log("EMAIL_USER =", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async ({ to, subject, html }) => {

    console.log("Attempting to send email to:", to);

    try {

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });

        console.log("Email sent successfully:", info.messageId);

    } catch (err) {

        console.error("SMTP Error:", err);

        throw err;
    }
};

export default sendEmail;