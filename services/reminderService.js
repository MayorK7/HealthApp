



import Medication from "../models/medicationmodels.js";
import User from "../models/usermodel.js";
import sendEmail from "../utils/sendEmail.js";


const reminderService = async () => {

    try {

        console.log("Checking medication reminders...");


        const now = new Date();


        const currentTime = now.toTimeString().slice(0,5);


        console.log("Checking time:", currentTime);



        const medications = await Medication.find({

            status:{
                $in:["Pending","Active"]
            },

            reminderTimes: currentTime

        });



        for (const medication of medications) {


            const patient = await User.findById(
                medication.patient
            );


            if(!patient) continue;



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

};


export default reminderService;