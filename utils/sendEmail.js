import nodemailer from "nodemailer";

console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
console.log("EMAIL_USER =", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


transporter.verify((error, success)=>{

    if(error){

        console.log("SMTP CONNECTION FAILED:", error);

    }else{

        console.log("SMTP SERVER READY");

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

        return info;

    } catch (err) {

        console.error("SMTP FULL ERROR:", err);

        throw err;
    }
};

export default sendEmail;