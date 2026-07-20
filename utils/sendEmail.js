import { Resend } from "resend";


// Initialize Resend API
const resend = new Resend(
    process.env.RESEND_API_KEY
);


// Send Email Function
const sendEmail = async ({ to, subject, html }) => {

    console.log("Sending email to:", to);

    try {

        const response = await resend.emails.send({

            from: "HealthApp <onboarding@resend.dev>",

            to: to,

            subject: subject,

            html: html

        });


        console.log(
            "Email sent successfully:",
            response
        );


        return response;


    } catch (error) {

        console.error(
            "Email sending error:",
            error
        );


        throw error;

    }

};


export default sendEmail;