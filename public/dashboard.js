// ================================
// CONFIGURATION
// ================================

const API = "/api";
const MED_API = "/api/med";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

// ================================
// AUTH HEADER
// ================================

const authHeader = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
};

// ================================
// LOAD PROFILE
// ================================

async function loadProfile() {

    try {

        const res = await fetch(`${API}/auth/profile`, {
            headers: authHeader
        });

        if (!res.ok) {
            throw new Error("Profile not found");
        }

        const data = await res.json();

         console.log("API Response:", data);
        const user = data.user;

        console.log("User:", user);
        console.log("Profile Image:", user.profileImage);

        document.getElementById("dashboardProfile").src =
         user.profileImage;

        document.getElementById("patientName").textContent =
            `${user.firstname} ${user.lastname}`;

        document.getElementById("welcomeName").textContent =
            user.firstname;

        document.getElementById("dashboardProfile").src =
            user.profileImage || "../images/default-profile.png";

    }

    catch (err) {

        console.log(err);

    }

}

// ================================
// TODAY'S DATE
// ================================

function loadDate() {

    const today = new Date();

    document.getElementById("todayDate").innerHTML =
        today.toLocaleDateString("en-NG", {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        });

}

// ================================
// LOAD DASHBOARD STATISTICS
// ================================

async function loadDashboardStats() {

    try {

        const res = await fetch(`${API}/dashboard/stats`, {

            headers: authHeader

        });

        if (!res.ok) throw new Error();

        const stats = await res.json();

        document.getElementById("totalMeds").innerHTML =
            stats.totalMedications;

        document.getElementById("todayReminders").innerHTML =
            stats.todayReminders;

        document.getElementById("completedDose").innerHTML =
            stats.completedToday;

        document.getElementById("missedDose").innerHTML =
            stats.missed;

        document.getElementById("progressPercent").innerHTML =
            stats.adherence + "%";

        document.getElementById("progressBar").style.width =
            stats.adherence + "%";

    }

    catch (err) {

        console.log(err);

    }

}






async function loadMedications() {

    try {

        const res = await fetch(MED_API, {

            headers: authHeader

        });

        if (!res.ok) {

            throw new Error("Unable to load medications");

        }

        const medications = await res.json();

        let html = "";

        if (medications.length === 0) {

            html = `
                <tr>
                    <td colspan="5" class="text-center">
                        No medications found
                    </td>
                </tr>
            `;

        } else {

            medications.forEach(med => {

                html += `

                <tr>

                    <td>${med.medicationName}</td>

                    <td>${med.dosage}</td>

                    <td>${med.reminderTimes?.join(", ") || "-"}</td>

                    <td>

                        <span class="badge bg-${statusColor(med.status)}">

                            ${med.status}

                        </span>

                    </td>

                    <td>

                        <button

                            class="btn btn-success btn-sm"

                            onclick="markTaken('${med._id}')">

                            Complete

                        </button>

                    </td>

                </tr>

                `;

            });

        }

        document.getElementById("todayMedicationTable").innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}function statusColor(status) {

    switch (status) {

        case "Active":
            return "primary";

        case "Completed":
            return "success";

        case "Stopped":
            return "danger";

        default:
            return "secondary";

    }

}







async function loadReminders() {

    try {

        const res = await fetch("/api/reminders", {

            headers: {

                Authorization: `Bearer ${token}`
                



            }

        });

        const data = await res.json();

        if (!res.ok) {

            throw new Error(data.message);

        }

        const reminders = data.reminders;

        const reminderList = document.getElementById("reminderList");

        reminderList.innerHTML = "";

        if (reminders.length === 0) {

            reminderList.innerHTML = `

                <div class="text-center text-muted py-3">

                    No reminders for today.

                </div>

            `;

            return;

        }

        reminders.forEach((med) => {

            reminderList.innerHTML += `

                <div class="card mb-2 shadow-sm">

                    <div class="card-body d-flex justify-content-between align-items-center">

                        <div>

                            <h6 class="mb-1">${med.medicationName}</h6>

                            <small>

                                ${med.dosage} • ${med.frequency}

                            </small>

                            <br>

                            <small>

                                ${med.reminderTimes.join(", ")}

                            </small>

                        </div>

                        <button

                            class="btn btn-success btn-sm"

                            onclick="completeReminder('${med._id}')">

                            Mark Taken

                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}


async function completeReminder(id) {

    try {

        const res = await fetch(`/api/reminders/${id}/complete`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await res.json();

        if (!res.ok) {

            Swal.fire(

                "Error",

                data.message,

                "error"

            );

            return;

        }

        Swal.fire({

            icon: "success",

            title: "Medication Taken",

            timer: 1200,

            showConfirmButton: false

        });

        loadReminders();

        loadDashboardStats();

        loadMedications();

    }

    catch (err) {

        console.error(err);

    }

}



// ================================
// LOAD RECENT ACTIVITIES
// ================================

async function loadActivities() {

    try {

        const res = await fetch(`${API}/dashboard/activities`, {

            headers: authHeader

        });

        if (!res.ok) throw new Error();

        const activities = await res.json();

        let html = "";

        if (activities.length === 0) {

            html = `
            <li class="list-group-item text-center text-muted">
                No recent activities
            </li>
            `;

        }

        activities.forEach(activity => {

            html += `

            <li class="list-group-item">

                <i class="bi bi-check-circle-fill text-success me-2"></i>

                ${activity.message}

                <br>

                <small class="text-muted">

                    ${new Date(activity.createdAt).toLocaleString()}

                </small>

            </li>

            `;

        });

        document.getElementById("activityList").innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}



// ================================
// MARK MEDICATION AS TAKEN
// ================================

async function markTaken(id) {

    try {

        const res = await fetch(`${MED_API}/${id}/taken`, {

            method: "PUT",

            headers: authHeader

        });

        if (!res.ok) {

            alert("Unable to update medication.");

            return;

        }

        loadDashboardStats();

        loadMedications();

        loadActivities();

    }

    catch (err) {

        console.log(err);

    }

}



// ================================
// CHART.JS
// ================================

function loadChart() {

    const ctx = document.getElementById("medChart");

    if (!ctx) return;

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Mon",

                "Tue",

                "Wed",

                "Thu",

                "Fri",

                "Sat",

                "Sun"

            ],

            datasets: [{

                label: "Medication Taken",

                data: [5,6,5,7,6,4,8],

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}




// document.getElementById("dashboardProfile").src =
//     user.profileImage;

// ================================
// LOGOUT
// ================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("userId");

    window.location.href = "/login.html";

}

document.getElementById("logoutBtn")?.addEventListener("click", logout);

document.getElementById("logoutDropdown")?.addEventListener("click", logout);



// ================================
// AUTO REFRESH
// ================================

setInterval(() => {

    loadDashboardStats();


    loadMedications();

    loadReminders();

}, 30000);



// ================================
// INITIALIZE DASHBOARD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    loadDate();

    loadDashboardStats();

    loadMedications();

    loadReminders();

    loadActivities();

    loadChart();

});




/* =========================
   MOBILE SIDEBAR TOGGLE
========================= */

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("active");
        content.classList.toggle("active");

    });

}
