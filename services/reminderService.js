



import Medication from "../models/medicationmodels.js";
import User from "../models/usermodel.js";
import sendEmail from "../utils/sendEmail.js";


const reminderService = async () => {

    try {

        console.log("Checking medication reminders...");


        // const now = new Date();


        // const currentTime = now.toTimeString().slice(0,5);


        const now = new Date();

        const nigeriaTime = new Intl.DateTimeFormat("en-GB", {
         timeZone:"Africa/Lagos",
         hour:"2-digit",
         minute:"2-digit",
         hour12:false
         }).format(now);


         const [hour, minute] = nigeriaTime.split(":");





        const allMedications = await Medication.find();

         allMedications.forEach(med => {
         console.log(
        med.medicationName,
        med.reminderTimes
    );
});



        const medications = await Medication.find({
          status:{
             $in:["Pending","Active"]
    },
         reminderTimes:{
             $in:[nigeriaTime]
    }
});

console.log("Nigeria time:", nigeriaTime);
console.log("Found reminders:", medications.length);



        for (const medication of medications) {


            const patient = await User.findById(
                medication.patient
            );


            if(!patient) continue;


            console.log("About to send email to:", patient.email);



            await sendEmail({

                to: patient.email,

                subject:"Medication Reminder",

                html:`

                <h2>Hello ${patient.firstname}</h2>

                <p>This is a reminder to take your medication.</p>

                <p>
                <strong>
                ${medication.medicationName}
                </strong>
                </p>

                <p>
                Dosage: ${medication.dosage}
                </p>

                <p>
                Instructions:
                ${medication.instructions || "None"}
                </p>

                `

            });



            console.log(
                "Reminder sent:",
                patient.email
            );


        }


        // ============================
        // MARK MISSED MEDICATIONS
        // ============================


        const thirtyMinutesAgo = new Date(
            now.getTime() - (30 * 60 * 1000)
        );


        const missedMedications = await Medication.find({

            status:{
                $in:["Pending","Active"]
            },

            reminderTimes:{
                $exists:true
            },

            createdAt:{
                $lte: thirtyMinutesAgo
            }

        });



        for(const medication of missedMedications){


            medication.status="Missed";


            await medication.save();


            console.log(
                medication.medicationName,
                "marked as Missed"
            );

        }



    }

    catch(err){

        console.log(
            "Reminder Error:",
            err
        );

    }


    console.log("Server Date:", new Date().toString());
console.log("Server ISO:", new Date().toISOString());

const now = new Date();

console.log(
    "Server Time:",
    now.getHours() + ":" + now.getMinutes()
);

};


export default reminderService;