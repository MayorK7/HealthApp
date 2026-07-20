
/* ============================================
   SHOW / HIDE PASSWORD
============================================ */

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("bi-eye");
        togglePassword.classList.add("bi-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("bi-eye-slash");
        togglePassword.classList.add("bi-eye");

    }

});


/* ============================================
   LOADING BUTTON
============================================ */

const form = document.getElementById("loginForm");

form.addEventListener("submit", () => {

    document.querySelector(".login-text").innerHTML = "Signing In...";

    document.querySelector(".loading").style.display = "inline-block";

});




const API = "/api/auth";

document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const btn = document.querySelector(".btn-login");
    btn.disabled = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch(`${API}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            Swal.fire({

                icon: "error",

                title: "Login Failed",

                text: data.message || "Invalid email or password"

            });

            btn.disabled = false;
            document.querySelector(".loading").style.display = "none";
            document.querySelector(".login-text").innerHTML = "Login";

            return;
        }

        // Save user information
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("firstname", data.firstname);

        await Swal.fire({

            icon: "success",

            title: "Welcome!",

            text: "Login Successful",

            timer: 1500,

            showConfirmButton: false

        });

        // Redirect by role
        if (data.role === "admin") {

            window.location.href = "admin/admin-dashboard.html";

        } else {

            window.location.href = "/dashboard.html";

        }

    } catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Server Error",

            text: "Unable to connect to the server."

        });

    } finally {

        btn.disabled = false;

        document.querySelector(".loading").style.display = "none";

        document.querySelector(".login-text").innerHTML = "Login";

    }

});

// localStorage.setItem("token", result.token);
// localStorage.setItem("userId", result.userId);
// localStorage.setItem("firstname", result.firstname);
// localStorage.setItem("role", result.role);


// if (result.role === "admin") {
//     window.location.href = "/admin/admin-dashboard.html";
// } else {
//     window.location.href = "/dashboard.html";
// }


