if(Notification.permission!=="granted"){

    Notification.requestPermission();

}





// const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}






// const token = localStorage.getItem("token");

async function loadReminders() {

    const res = await fetch("/api/reminders", {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const meds = await res.json();

    console.log(meds);

    const container = document.getElementById("reminderContainer");

    container.innerHTML = "";

    if (!Array.isArray(meds) || meds.length === 0) {

        // container.innerHTML = `
        // <div class="alert alert-info">
        //     No reminders available.
        // </div>
        // `;




        container.innerHTML += `
<div class="card mb-3">

<div class="card-body">

<h5>
${med.medicationName}
</h5>


<p>
<i class="bi bi-clock"></i>

Upcoming Time:

${med.reminderTimes.join(", ")}

</p>


<p>
Dosage:
${med.dosage}
</p>


<span class="badge bg-warning">
Upcoming
</span>


</div>

</div>
`;






        return;
    }

    meds.forEach(med => {

        container.innerHTML += `

        <div class="card shadow-sm mb-3">

            <div class="card-body">

                <h5>${med.medicationName}</h5>

                <p><strong>Dosage:</strong> ${med.dosage}</p>

                <p><strong>Frequency:</strong> ${med.frequency}</p>

                <p><strong>Reminder:</strong> ${med.reminderTimes.join(", ")}</p>

                <span class="badge bg-success">
                    ${med.status}
                </span>

            </div>

        </div>

        `;

    });

}

loadReminders();



const token = localStorage.getItem("token");

async function checkMedicationReminder(){

    try{

        const res = await fetch("/api/meds/today",{

            headers:{

                Authorization:`Bearer ${token}`

            }

        });

        const medications = await res.json();

        const now = new Date();

        const current = now.toLocaleTimeString([],{

            hour:"2-digit",

            minute:"2-digit",

            hour12:false

        });

        medications.forEach(med=>{

            if (med.reminderTimes.includes(current)) {
              
                showReminder(med);
}

        });

    }

    catch(err){

        console.log(err);

    }

}

function showReminder(med){

    if(Notification.permission==="granted"){

        new Notification(

            "Medication Reminder",

            {

                body:`Time to take ${med.medicationName} (${med.dosage})`,

                icon:"/images/logo.png"

            }

        );

    }

}

loadReminders();


checkMedicationReminder();

setInterval(()=>{

    checkMedicationReminder();

},60000);

// loadReminders();