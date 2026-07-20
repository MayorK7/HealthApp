import Notification from "../models/notificationmodel.js";



export const getNotifications = async(req,res)=>{


try{


const notifications = await Notification.find({

user:req.user.id

})

.sort({

createdAt:-1

})

.limit(10);



const unread =
await Notification.countDocuments({

user:req.user.id,

read:false

});



res.json({

notifications,

unread

});


}


catch(err){


console.log(err);


res.status(500).json({

message:"Unable to load notifications"

});


}


};




export const markNotificationRead = async(req,res)=>{


try{


await Notification.findByIdAndUpdate(

req.params.id,

{

read:true

}

);



res.json({

message:"Notification marked as read"

});


}


catch(err){


res.status(500).json({

message:"Unable to update notification"

});


}


};