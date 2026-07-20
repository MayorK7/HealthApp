import Medication from "../models/medicationmodels.js";


/* ==========================================
   DASHBOARD STATISTICS
========================================== */

// export const getDashboardStats = async (req, res) => {

//     try {

//         const patientId = req.user.id;

//         const today = new Date();

//         today.setHours(0, 0, 0, 0);

//         const tomorrow = new Date(today);

//         tomorrow.setDate(today.getDate() + 1);

        


//         // Total medications
// const totalMedications = await Medication.countDocuments({
//     patient: patientId
// });

// // Total doses
// const totalDoses = await Medication.countDocuments({
//     patient: patientId
// });

// // Pending doses
// const todayReminders = await Medication.countDocuments({
//     patient: patientId,
//     status: "Pending"
// });

// // Taken doses
// const completed = await Medication.countDocuments({
//     patient: patientId,
//     status: "Taken"
// });

// // Missed doses
// const missed = await Medication.countDocuments({
//     patient: patientId,
//     status: "Missed"
// });

// // Adherence
// let adherence = 0;

// if (totalDoses > 0) {

//     adherence = Math.round(
//         (completed / totalDoses) * 100
//     );

// }

//         res.json({

//             totalMedications,

//             todayReminders,

//             completed,

//             missed,

//             adherence

//         });

//     } catch (err) {

//         console.error(err);

//         res.status(500).json({

//             message: "Unable to load dashboard statistics."

//         });

//     }

// };




// export const getDashboardStats = async (req, res) => {

//     try {

//         const patientId = req.user.id;


//         const totalMedications = await Medication.countDocuments({

//             patient: patientId

//         });


//         const taken = await Medication.countDocuments({

//             patient: patientId,

//             status: "Taken"

//         });


//         const missed = await Medication.countDocuments({

//             patient: patientId,

//             status: "Missed"

//         });


//         const pending = await Medication.countDocuments({

//             patient: patientId,

//             status: "Pending"

//         });



//         let adherence = 0;


//         if(totalMedications > 0){

//             adherence = Math.round(

//                 (taken / totalMedications) * 100

//             );

//         }



//         res.json({

//             totalMedications,

//             taken,

//             missed,

//             pending,

//             adherence

//         });


//     }

//     catch(err){

//         console.log(err);


//         res.status(500).json({

//             message:"Unable to load dashboard statistics"

//         });

//     }

// };



export const getDashboardStats = async (req, res) => {

    try {

        const patientId = req.user.id;


        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);


        const todayEnd = new Date();
        todayEnd.setHours(23,59,59,999);



        const totalMedications = await Medication.countDocuments({
            patient: patientId
        });


        const todayReminders = await Medication.countDocuments({

            patient: patientId,

            reminderTimes:{
                $exists:true,
                $ne:[]
            }

        });


        const completedToday = await Medication.countDocuments({

            patient: patientId,

            status:"Taken",

            takenAt:{
                $gte: todayStart,
                $lte: todayEnd
            }

        });


        const missed = await Medication.countDocuments({

            patient: patientId,

            status:"Missed"

        });


        const pending = await Medication.countDocuments({

            patient: patientId,

            status:"Pending"

        });



        let adherence = 0;


        if(totalMedications > 0){

            const taken = await Medication.countDocuments({

                patient:patientId,

                status:"Taken"

            });


            adherence = Math.round(
                (taken / totalMedications) * 100
            );

        }



        res.json({

            totalMedications,

            todayReminders,

            completedToday,

            missed,

            pending,

            adherence

        });


    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable to load dashboard statistics"

        });

    }

};


/* ==========================================
   RECENT ACTIVITIES
========================================== */



// export const getRecentActivities = async (req, res) => {

//     try {

//         const activities = await Dose.find({
//             patient: req.user.id
//         })
//         .populate({
//             path: "medication",
//             select: "medicationName dosage"
//         })
//         .sort({
//             updatedAt: -1
//         })
//         .limit(5);


//         console.log("ACTIVITIES:", activities);


//         const result = activities.map(dose => ({

//             message: dose.medication
//                 ? `${dose.medication.medicationName} (${dose.status})`
//                 : `Unknown Medication (${dose.status})`,

//             dosage: dose.medication
//                 ? dose.medication.dosage
//                 : "",

//             status: dose.status,

//             createdAt: dose.updatedAt

//         }));


//         res.json(result);


//     } catch (err) {

//         console.error(err);

//         res.status(500).json({

//             message: "Unable to load activities."

//         });

//     }

// };



export const getRecentActivities = async (req,res)=>{

    try{


        const activities = await Medication.find({

            patient:req.user.id

        })

        .sort({

            updatedAt:-1

        })

        .limit(5);



        const result = activities.map(item=>({

            message:

            `${item.medicationName} (${item.status})`,


            createdAt:item.updatedAt

        }));



        res.json(result);


    }

    catch(err){

        console.log(err);


        res.status(500).json({

            message:"Unable to load activities"

        });


    }

};






export const getTodayDoses = async (req,res)=>{

    try {

        const start = new Date();

        start.setHours(0,0,0,0);


        const end = new Date();

        end.setHours(23,59,59,999);



        const doses = await Dose.find({

            patient:req.user.id,

            scheduledTime:{
                $gte:start,
                $lte:end
            }

        })
        .populate("medication");



        res.json(doses);


    }

    catch(err){

        console.error(err);

        res.status(500).json({

            message:"Unable to load today's doses"

        });

    }

};