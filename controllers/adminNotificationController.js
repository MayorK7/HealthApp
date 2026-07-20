import Notification from "../models/notificationmodel.js";
import User from "../models/usermodel.js";



export const sendAnnouncement = async(req,res)=>{


try{


const {title,message}=req.body;



// Get all patients

const patients = await User.find({

    role:"patient"

});

console.log(
"Patients found:",
patients.length
);



const notifications = patients.map(patient=>({

    user:patient._id,

    title,

    message,

    type:"Admin"

}));



// Save notifications

await Notification.insertMany(
    notifications
);



res.json({

    success:true,

    message:
    "Announcement sent successfully",

    totalPatients:
    patients.length

});


console.log("Announcement received");

console.log(req.body);


}


catch(err){


console.log(err);


res.status(500).json({

message:"Unable to send announcement"

});


}


};