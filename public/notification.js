// const token =
// localStorage.getItem("token");



async function loadNotifications(){

    console.log("Loading notifications...");

try{


const res = await fetch(

"/api/notifications",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



const data =
await res.json();
console.log(data);



document.getElementById(
"notificationCount"
)
.textContent=data.unread;



const list =
document.getElementById(
"notificationList"
);



list.innerHTML="";



if(data.notifications.length===0){


list.innerHTML=`

<li class="dropdown-item">

No notifications

</li>

`;

return;

}



data.notifications.forEach(notification=>{


list.innerHTML += `

<li class="dropdown-item">


<strong>

${notification.title}

</strong>


<br>


<small>

${notification.message}

</small>


</li>

`;

});


}


catch(err){

console.log(err);

}


}


loadNotifications();