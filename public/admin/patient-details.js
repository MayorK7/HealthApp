const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);

const patientId = params.get("id");

async function loadPatient(){

const res = await fetch(

`/api/admin/patients/${patientId}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await res.json();

const patient = data.patient;

const meds = data.medications;

document.getElementById("profileImage").src =

patient.profileImage || "../images/default-avatar.png";

document.getElementById("patientName").textContent =

patient.firstname + " " + patient.lastname;

document.getElementById("patientEmail").textContent =

patient.email;

document.getElementById("patientPhone").textContent =

patient.phone || "-";

document.getElementById("patientRole").textContent =

"Role : " + patient.role;

document.getElementById("joinedDate").textContent =

"Joined : " +

new Date(patient.createdAt).toLocaleDateString();

document.getElementById("totalMedications").textContent =

meds.length;

const taken = meds.filter(m=>m.status==="Taken").length;

const pending = meds.filter(m=>m.status==="Pending").length;

document.getElementById("takenCount").textContent=taken;

document.getElementById("pendingCount").textContent=pending;

const table=document.getElementById("medicationTable");

table.innerHTML="";

meds.forEach(m=>{

table.innerHTML+=`

<tr>

<td>${m.medicationName}</td>

<td>${m.dosage}</td>

<td>${m.frequency}</td>

<td>${m.reminderTimes?.join(", ") || "-"}</td>

<td>${new Date(m.createdAt).toLocaleDateString()}</td>

<td>

<span class="badge bg-${

m.status==="Taken"

?"success"

:m.status==="Pending"

?"warning"

:"danger"

}">

${m.status}

</span>

</td>

</tr>

`;

});

}

loadPatient();