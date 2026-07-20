// =======================================
// LOAD USER PROFILE
// =======================================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

async function loadProfile() {

    try {

        const response = await fetch("/api/auth/profile", {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            localStorage.clear();

            window.location.href = "login.html";

            return;
        }

        const user = data.user;

        document.getElementById("fullname").textContent =
            `${user.firstname} ${user.lastname}`;

        document.getElementById("email").textContent =
            user.email || "N/A";

        document.getElementById("phone").textContent =
            user.phone || "N/A";

        document.getElementById("gender").textContent =
            user.gender || "N/A";

        // document.getElementById("dob").textContent =
        //     user.dateOfBirth || "N/A";

        // document.getElementById("blood").textContent =
        //     user.bloodGroup || "N/A";

        // document.getElementById("address").textContent =
        //     user.address || "N/A";

        // document.getElementById("emergencyName").textContent =
        //     user.emergencyContactName || "N/A";

        // document.getElementById("emergencyPhone").textContent =
        //     user.emergencyContactPhone || "N/A";

        // document.getElementById("allergies").textContent =
        //     user.allergies || "None";

        // document.getElementById("conditions").textContent =
        //     user.medicalConditions || "None";

    } catch (error) {

        console.error(error);

        alert("Unable to load profile.");

    }

}

loadProfile();



document.getElementById("uploadBtn").addEventListener("click", async () => {

    const file = document.getElementById("profileImage").files[0];

    if (!file) {

        alert("Choose an image.");

        return;

    }

    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch("/api/auth/profile-image", {

        method: "PUT",

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        },

        body: formData

    });

    const data = await res.json();

    if (data.success) {

        document.getElementById("profilePreview").src =
            data.profileImage;

        alert("Profile picture updated.");

    }

});