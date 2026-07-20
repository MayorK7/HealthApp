


import mongoose from "mongoose";


const medicationSchema = new mongoose.Schema(

{

    patient: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required:true

    },


    medicationName: {

        type:String,

        required:true

    },


    dosage:String,


    frequency:String,


    reminderTimes:[String],


    startDate:Date,


    endDate:Date,


    instructions:String,


    status:{

        type:String,

        enum:[
            "Pending",
            "Taken",
            "Missed",
            "Active"
        ],

        default:"Pending"

    },


    takenAt:{

        type:Date,

        default:null

    },


    lastReminderSent:{

        type:Date,

        default:null

    }

},

{

timestamps:true

}

);


export default mongoose.model(
    "Medication",
    medicationSchema
);