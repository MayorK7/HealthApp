
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirm = document.getElementById("toggleConfirm");

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.classList.remove("bi-eye");
        togglePassword.classList.add("bi-eye-slash");

    }else{

        password.type = "password";

        togglePassword.classList.remove("bi-eye-slash");
        togglePassword.classList.add("bi-eye");

    }

});


toggleConfirm.addEventListener("click", () => {

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";

        toggleConfirm.classList.remove("bi-eye");
        toggleConfirm.classList.add("bi-eye-slash");

    }else{

        confirmPassword.type = "password";

        toggleConfirm.classList.remove("bi-eye-slash");
        toggleConfirm.classList.add("bi-eye");

    }

});


/* ==========================
   PASSWORD STRENGTH
========================== */

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

password.addEventListener("keyup", ()=>{

    let strength = 0;

    if(password.value.length >= 8)
        strength++;

    if(/[A-Z]/.test(password.value))
        strength++;

    if(/[0-9]/.test(password.value))
        strength++;

    if(/[!@#$%^&*]/.test(password.value))
        strength++;

    switch(strength){

        case 1:

            strengthBar.style.width="25%";
            strengthBar.style.background="red";
            strengthText.innerHTML="Weak Password";

        break;

        case 2:

            strengthBar.style.width="50%";
            strengthBar.style.background="orange";
            strengthText.innerHTML="Fair Password";

        break;

        case 3:

            strengthBar.style.width="75%";
            strengthBar.style.background="gold";
            strengthText.innerHTML="Good Password";

        break;

        case 4:

            strengthBar.style.width="100%";
            strengthBar.style.background="green";
            strengthText.innerHTML="Strong Password";

        break;

        default:

            strengthBar.style.width="0";
            strengthText.innerHTML="Password Strength";

    }

});


/* ==========================
   PASSWORD MATCH
========================== */

document.getElementById("registerForm")
.addEventListener("submit",(e)=>{

    if(password.value !== confirmPassword.value){

        e.preventDefault();

        Swal.fire({

            icon:"error",

            title:"Passwords do not match",

            text:"Please make sure both passwords are identical."

        });

        return;

    }

    document.getElementById("spinner")
    .classList.remove("d-none");

});





const API = "/api/auth";

document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){

        Swal.fire({

            icon:"error",

            title:"Passwords do not match"

        });

        return;

    }

    const form = e.target;

    const data = {

        firstname: form.firstname.value,

        lastname: form.lastname.value,

        email: form.email.value,

        phone: form.phone.value,

        password: password

    };

    try{

        const res = await fetch(`${API}/register`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        if(res.ok){

            await Swal.fire({

                icon:"success",

                title:"Registration Successful",

                text:"Your account has been created successfully."

            });

            window.location.href="login.html";

        }

        else{

            const msg = await res.text();

            Swal.fire({

                icon:"error",

                title:"Registration Failed",

                text:msg

            });

        }

    }

    catch(err){

        Swal.fire({

            icon:"error",

            title:"Server Error",

            text:"Unable to connect to the server."

        });

    }

});