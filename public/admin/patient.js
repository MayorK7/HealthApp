const token = localStorage.getItem("token");

if (!token) {

window.location.href="/login.html";

}

let patients=[];

async function loadPatients(){

try{

const res=await fetch("/api/admin/patients",{

headers:{

Authorization:`Bearer ${token}`

}

});

const data=await res.json();

patients=data;

displayPatients(data);

}

catch{

Swal.fire(

"Error",

"Unable to load patients",

"error"

);

}

}

function displayPatients(list){

const table=document.getElementById("patientTable");

table.innerHTML="";

if(list.length===0){

table.innerHTML=`

<tr>

<td colspan="7" class="text-center">

No patients found

</td>

</tr>

`;

return;

}

list.forEach(patient=>{

table.innerHTML+=`

<tr>

<td>

<img
    src="${patient.profileImage || '../images/default-profile.png'}"
    class="patient-img">

</td>

<td>

${patient.firstname} ${patient.lastname}

</td>

<td>

${patient.email}

</td>

<td>

${patient.phone||"-"}

</td>

<td>

<span class="badge bg-primary">

${patient.role}

</span>

</td>

<td>

${new Date(patient.createdAt).toLocaleDateString()}

</td>

<td>

<a

href="patient-details.html?id=${patient._id}"

class="btn btn-success btn-sm">

View

</a>

<button

onclick="deletePatient('${patient._id}')"

class="btn btn-danger btn-sm">

Delete

</button>

</td>

</tr>

`;

});

}



async function deletePatient(id){

    const result=await Swal.fire({
    
    title:"Delete Patient?",
    
    icon:"warning",
    
    showCancelButton:true,
    
    confirmButtonText:"Delete"
    
    });
    
    if(!result.isConfirmed) return;
    
    const res=await fetch(`/api/admin/patients/${id}`,{
    
    method:"DELETE",
    
    headers:{
    
    Authorization:`Bearer ${token}`
    
    }
    
    });
    
    if(res.ok){
    
    Swal.fire(
    
    "Deleted!",
    
    "Patient removed.",
    
    "success"
    
    );
    
    loadPatients();
    
    }
    
    }
    
    document
    
    .getElementById("searchPatient")
    
    .addEventListener("keyup",(e)=>{
    
    const keyword=e.target.value.toLowerCase();
    
    const filtered=patients.filter(patient=>
    
    patient.firstname.toLowerCase().includes(keyword)||
    
    patient.lastname.toLowerCase().includes(keyword)||
    
    patient.email.toLowerCase().includes(keyword)
    
    );
    
    displayPatients(filtered);
    
    });
    
    loadPatients();