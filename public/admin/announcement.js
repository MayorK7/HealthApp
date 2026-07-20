// const token =
// localStorage.getItem("token");



// async function sendAnnouncement(){


// const title =
// document.getElementById("title").value;


// const message =
// document.getElementById("message").value;



// const res = await fetch(

// "/api/admin/notifications/announcement",

// {

// method:"POST",

// headers:{

// "Content-Type":"application/json",

// Authorization:
// `Bearer ${token}`

// },

// body:JSON.stringify({

// title,

// message

// })

// }

// );



// const data =
// await res.json();



// alert(data.message);


// }


const token = localStorage.getItem("token");


document
.getElementById("announcementForm")
.addEventListener("submit", async(e)=>{


e.preventDefault();



const title =
document.getElementById("title").value;


const message =
document.getElementById("message").value;


const category =
document.getElementById("category").value;



try{


const res = await fetch(
"/api/admin/notifications/announcement",
{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:
`Bearer ${token}`

},


body:JSON.stringify({

title,

message,

type:category

})

}

);



const data = await res.json();



console.log(data);



if(res.ok){


Swal.fire({

icon:"success",

title:"Announcement Sent",

text:
`${data.totalPatients} patients have been notified.`,

confirmButtonColor:"#0d6efd"

});



document
.getElementById("announcementForm")
.reset();



}

else{


Swal.fire({

icon:"error",

title:"Failed",

text:
data.message || "Unable to send announcement"

});


}



}

catch(err){


console.log(err);



Swal.fire({

icon:"error",

title:"Server Error",

text:
"Unable to connect to server"

});


}



});