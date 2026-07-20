const token = localStorage.getItem("token");

if (!token) {

window.location.href="/login.html";

}

const id = new URLSearchParams(location.search).get("id");

const form=document.getElementById("editForm");


async function loadMedication(){

    const res=await fetch(`/api/meds/${id}`,{
    
    headers:{
    
    Authorization:`Bearer ${token}`
    
    }
    
    });
    
    const med=await res.json();
    
    name.value=med.medicationName;
    
    dosage.value=med.dosage;
    
    frequency.value=med.frequency;
    
    time.value=med.med.reminderTimes[0];
    
    startDate.value=med.startDate?.split("T")[0];
    
    endDate.value=med.endDate?.split("T")[0];
    
    instruction.value=med.instruction;
    
    }
    
    loadMedication();


    form.addEventListener("submit",async(e)=>{

        e.preventDefault();
        
        const body=Object.fromEntries(new FormData(form));
        
        const res=await fetch(`/api/meds/${id}`,{
        
        method:"PUT",
        
        headers:{
        
        "Content-Type":"application/json",
        
        Authorization:`Bearer ${token}`
        
        },
        
        body:JSON.stringify(body)
        
        });
        
        if(res.ok){
        
        await Swal.fire({
        
        icon:"success",
        
        title:"Medication Updated"
        
        });
        
        window.location="medications.html";
        
        }else{
        
        Swal.fire({
        
        icon:"error",
        
        title:"Update Failed"
        
        });
        
        }
        
        });