const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

const form = document.getElementById("medicationForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {

        const res = await fetch("/api/med", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data)

        });

        const result = await res.json();

        if (!res.ok) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "Unable to save medication"
            });

            return;

        }

        await Swal.fire({
            icon: "success",
            title: "Medication Added",
            text: "Medication saved successfully.",
            timer: 1800,
            showConfirmButton: false
        });

        window.location.href = "/dashboard.html";

    } catch (err) {

        console.error(err);

        Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Could not connect to the server."
        });

    }

});