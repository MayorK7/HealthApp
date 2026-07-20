import Medication from "../models/medicationmodels.js";

/* ==========================================
   GET TODAY'S REMINDERS
========================================== */

// export const getTodayReminders = async (req, res) => {





//     try{


//         const reminders = await Medication.find({

//             patient:req.user.id,

//             reminderTimes:{
//                 $exists:true,
//                 $ne:[]
//             }

//         })
//         .sort({
//             createdAt:-1
//         });



//         res.json(reminders);


//     }

//     catch(err){

//         console.log(err);

//         res.status(500).json({

//             message:"Unable to load reminders"

//         });

//     }

// };

// };



export const getTodayReminders = async (req, res) => {

    try {

        const now = new Date();

        const currentTime = now.toTimeString().slice(0,5);


        const medications = await Medication.find({

            patient: req.user.id,

            status: {
                $in:["Pending","Active"]
            }

        });



        const upcomingReminders = medications.filter(med => {

            return med.reminderTimes.some(time => {

                return time >= currentTime;

            });

        });



        // res.json(upcomingReminders);
        res.json({
    reminders: upcomingReminders
});


    }

    catch(err){

        console.log(err);


        res.status(500).json({

            message:"Unable to load upcoming reminders"

        });

    }

};


/* ==========================================
   MARK REMINDER AS COMPLETED
========================================== */

export const completeReminder = async (req, res) => {

    try {

        const medication = await Medication.findOne({

            _id: req.params.id,

            patient: req.user.id

        });

        if (!medication) {

            return res.status(404).json({

                success: false,

                message: "Medication not found."

            });

        }

        medication.status = "Completed";

        medication.takenTimes.push(new Date());

        await medication.save();

        res.json({

            success: true,

            message: "Medication marked as completed."

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to update reminder."

        });

    }

};


/* ==========================================
   ENABLE / DISABLE REMINDERS
========================================== */

export const toggleReminder = async (req, res) => {

    try {

        const medication = await Medication.findOne({

            _id: req.params.id,

            patient: req.user.id

        });

        if (!medication) {

            return res.status(404).json({

                success: false,

                message: "Medication not found."

            });

        }

        medication.reminderEnabled = !medication.reminderEnabled;

        await medication.save();

        res.json({

            success: true,

            reminderEnabled: medication.reminderEnabled

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to update reminder."

        });

    }

};



