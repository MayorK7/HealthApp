import Medication from "../models/medicationmodels.js";







// export const addMedication = async (req, res) => {

//     try {

//         const {
//             name,
//             dosage,
//             frequency,
//             time,
//             startDate,
//             endDate,
//             instruction
//         } = req.body;

//         const medication = await Medication.create({

//             patient: req.user.id,

//             medicationName: name,

//             dosage,

//             frequency,

//             reminderTimes: [time],

//             startDate,

//             endDate,

//             instructions: instruction,

//             status: "Active"

//         });

//         res.status(201).json({

//             success: true,

//             message: "Medication added successfully",

//             medication

//         });

//     } catch (err) {

//         console.error(err);

//         res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };




// export const addMedication = async (req, res) => {

//     try {

//         const {
//             name,
//             dosage,
//             frequency,
//             time,
//             startDate,
//             endDate,
//             instruction
//         } = req.body;

//         const medication = await Medication.create({

//             patient: req.user.id,

//             medicationName: name,

//             dosage,

//             frequency,

//             reminderTimes: [time],

//             startDate,

//             endDate,

//             instructions: instruction,

//             status: "Active"

//         });

//         // ===============================
//         // CREATE DOSES
//         // ===============================

//         const doses = [];

//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         const [hour, minute] = time.split(":");

//         for (

//             let current = new Date(start);

//             current <= end;

//             current.setDate(current.getDate() + 1)

//         ) {

//             const scheduledTime = new Date(current);

//             scheduledTime.setHours(

//                 Number(hour),

//                 Number(minute),

//                 0,

//                 0

//             );

//             doses.push({

//                 patient: req.user.id,

//                 medication: medication._id,

//                 scheduledTime,

//                 status: "Pending"

//             });

//         }

//         await Dose.insertMany(doses);

//         // await doseHistory.push(...);

//         res.status(201).json({

//             success: true,

//             message: "Medication added successfully.",

//             medication

//         });

//     }

//     catch (err) {

//         console.error(err);

//         res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };



export const addMedication = async (req,res)=>{

try{


const {

name,

dosage,

frequency,

time,

startDate,

endDate,

instruction

}=req.body;



const medication = await Medication.create({

patient:req.user.id,

medicationName:name,

dosage,

frequency,

reminderTimes:[time],

startDate,

endDate,

instructions:instruction,

status:"Pending"

});


res.status(201).json({

success:true,

message:"Medication added successfully",

medication

});


}

catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}

};


/* ===========================
   GET ALL MEDICATIONS
=========================== */

export const getMedications = async (req, res) => {

    try {

        const meds = await Medication.find({

            patient: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json(meds);

    }

    catch {

        res.status(500).json({

            message: "Unable to load medications"

        });

    }

};


/* ===========================
   GET ONE MEDICATION
=========================== */

export const getMedication = async (req, res) => {

    try {

        const med = await Medication.findOne({

            _id: req.params.id,

            patient: req.user.id

        });

        if (!med) {

            return res.status(404).json({

                message: "Medication not found"

            });

        }

        res.json(med);

    }

    catch {

        res.status(500).json({

            message: "Unable to load medication"

        });

    }

};


/* ===========================
   UPDATE MEDICATION
=========================== */

export const updateMedication = async (req, res) => {

    try {

        const medication = await Medication.findOneAndUpdate(

            {

                _id: req.params.id,

                patient: req.user.id

            },

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!medication) {

            return res.status(404).json({

                message: "Medication not found"

            });

        }

        res.json({

            success: true,

            message: "Medication updated",

            medication

        });

    }

    catch {

        res.status(500).json({

            message: "Update failed"

        });

    }

};


/* ===========================
   DELETE MEDICATION
=========================== */

// export const deleteMedication = async (req, res) => {

//     try {

//         const medication = await Medication.findOneAndDelete({

//             _id: req.params.id,

//             patient: req.user.id

//         });

//         if (!medication) {

//             return res.status(404).json({

//                 message: "Medication not found"

//             });

//         }

//         res.json({

//             success: true,

//             message: "Medication deleted"

//         });

//     }

//     catch {

//         res.status(500).json({

//             message: "Delete failed"

//         });

//     }

// };



export const deleteMedication = async(req,res)=>{

try{


const medication = await Medication.findOneAndDelete({

_id:req.params.id,

patient:req.user.id

});


if(!medication){

return res.status(404).json({

message:"Medication not found"

});

}


res.json({

success:true,

message:"Medication deleted"

});


}

catch(err){

res.status(500).json({

message:"Delete failed"

});

}

};





// export const markAsTaken = async (req, res) => {

//     try {

//         const dose = await Medication.findOne({

//             _id: req.params.id,

//             patient: req.user.id,

//             status: "Pending"

//         });

//         if (!dose) {

//             return res.status(404).json({

//                 success: false,

//                 message: "Dose not found or already updated."

//             });

//         }

//         dose.status = "Taken";

//         dose.takenAt = new Date();

//         await dose.save();

//         res.json({

//             success: true,

//             message: "Medication marked as taken.",

//             dose

//         });

//     }

//     catch (err) {

//         console.error(err);

//         res.status(500).json({

//             success: false,

//             message: "Unable to update dose."

//         });

//     }

// };



export const markAsTaken = async(req,res)=>{


try{


const medication = await Medication.findOne({

_id:req.params.id,

patient:req.user.id

});


if(!medication){

return res.status(404).json({

message:"Medication not found"

});

}



medication.status="Taken";

medication.takenAt=new Date();


await medication.save();



res.json({

success:true,

message:"Medication marked as taken",

medication

});


}


catch(err){

console.log(err);


res.status(500).json({

message:"Unable to update medication"

});


}


};



export const getTodayMedications = async (req,res)=>{

    try{

        const meds = await Medication.find({

            patient:req.user.id,

            reminderEnabled:true

        });

        res.json(meds);

    }

    catch{

        res.status(500).json({

            message:"Unable to load reminders"

        });

    }

}