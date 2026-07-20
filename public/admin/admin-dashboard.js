

const role = localStorage.getItem("role");

if (role !== "admin") {
    window.location.href = "/admin/admin-login.html";
}



const token = localStorage.getItem("token");

// =========================
// CHECK LOGIN
// =========================
if (!token) {
    window.location.href = "/login.html";
}

// =========================
// LOAD DASHBOARD
// =========================
async function loadDashboard() {

    try {

        const res = await fetch("/api/admin/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 401) {
            localStorage.clear();
            return window.location.href = "/login.html";
        }

        if (res.status === 403) {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You are not authorized to access the Admin Dashboard."
            });

            return window.location.href = "/dashboard.html";
        }

        if (!res.ok) {
            throw new Error("Unable to load dashboard");
        }

        const data = await res.json();

        // =========================
        // DASHBOARD CARDS
        // =========================

        document.getElementById("totalPatients").textContent =
            data.totalPatients || 0;

        document.getElementById("totalAdmins").textContent =
            data.totalAdmins || 0;

        document.getElementById("totalMedications").textContent =
            data.totalMedications || 0;

        document.getElementById("taken").textContent =
            data.taken || 0;

        document.getElementById("pending").textContent =
            data.pending || 0;

        document.getElementById("missed").textContent =
            data.missed || 0;

        // Summary Section
        document.getElementById("summaryPatients").textContent =
            data.totalPatients || 0;

        document.getElementById("summaryAdmins").textContent =
            data.totalAdmins || 0;

        document.getElementById("summaryMeds").textContent =
            data.totalMedications || 0;

        // =========================
        // RECENT PATIENTS TABLE
        // =========================

        const table = document.getElementById("patientTable");

        table.innerHTML = "";

        if (!data.recentPatients || data.recentPatients.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No patients found.
                    </td>
                </tr>
            `;

        } else {

            data.recentPatients.forEach(patient => {

                table.innerHTML += `

<tr>

<td>
<img src="${patient.profileImage || '../images/default-avatar.png'}"
width="45"
height="45"
style="object-fit:cover;border-radius:50%;">
</td>

<td>
${patient.firstname} ${patient.lastname}
</td>

<td>
${patient.email}
</td>

<td>
${patient.phone || "-"}
</td>

<td>

<span class="badge bg-primary">

${patient.role}

</span>

</td>

<td>

<a
href="patient-details.html?id=${patient._id}"
class="btn btn-sm btn-success">

View

</a>

</td>

</tr>

`;

            });

        }

        // =========================
        // DRAW CHART
        // =========================

        drawChart(data);

    }

    catch (err) {

        console.error(err);

        Swal.fire({

            icon: "error",

            title: "Error",

            text: "Failed to load dashboard."

        });

    }

}

// =========================
// CHART
// =========================

function drawChart(data) {

    const ctx = document
        .getElementById("medChart")
        .getContext("2d");

    // Prevent duplicate charts
    if (window.medChart instanceof Chart) {
        window.medChart.destroy();
    }

    window.medChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Taken",

                "Pending",

                "Missed"

            ],

            datasets: [

                {

                    data: [

                        data.taken,

                        data.pending,

                        data.missed

                    ]

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.clear();

    window.location.href = "/login.html";

}

// =========================
// START
// =========================

loadDashboard();