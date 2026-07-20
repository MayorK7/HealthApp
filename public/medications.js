const API = "/api/med";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

const table = document.getElementById("medicationTable");
const search = document.getElementById("search");

let medications = [];

/* ================= LOAD MEDICATIONS ================= */

async function loadMedications() {

    try {

        const res = await fetch(API, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Unable to load medications");
        }

        // Support both response formats:
        // res.json(meds)
        // or
        // res.json({ medications: meds })

        medications = Array.isArray(data)
            ? data
            : (data.medications || []);

        displayMedications(medications);

    } catch (err) {

        console.error(err);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message || "Unable to load medications"
        });

    }

}

/* ================= DISPLAY ================= */

function displayMedications(list) {

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No medications found
                </td>
            </tr>
        `;

        return;

    }

    list.forEach(med => {

        table.innerHTML += `
            <tr>

                <td>${med.medicationName}</td>

                <td>${med.dosage}</td>

                <td>${med.frequency}</td>

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

                        <i class="bi bi-check-circle"></i>

                    </button>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editMedication('${med._id}')">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteMedication('${med._id}')">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

/* ================= STATUS COLOR ================= */

function statusColor(status) {

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

/* ================= SEARCH ================= */

search.addEventListener("keyup", () => {

    const keyword = search.value.toLowerCase();

    const filtered = medications.filter(m =>

        m.medicationName.toLowerCase().includes(keyword)

    );

    displayMedications(filtered);

});

/* ================= DELETE ================= */

async function deleteMedication(id) {

    const confirm = await Swal.fire({

        title: "Delete Medication?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Delete"

    });

    if (!confirm.isConfirmed) return;

    try {

        const res = await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await res.json();

        if (!res.ok) {

            throw new Error(data.message);

        }

        Swal.fire({

            icon: "success",

            title: "Deleted",

            text: "Medication deleted successfully."

        });

        loadMedications();

    } catch (err) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: err.message

        });

    }

}

/* ================= MARK AS TAKEN ================= */

async function markTaken(id) {

    try {

        const res = await fetch(`/api/doses/${doseId}/taken`, {

            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await res.json();

        if (!res.ok) {

            throw new Error(data.message);

        }

        Swal.fire({

            icon: "success",

            title: "Success",

            text: "Medication updated."

        });

        loadMedications();

    } catch (err) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: err.message

        });

    }

}

/* ================= EDIT ================= */

function editMedication(id) {

    window.location.href = `edit-medication.html?id=${id}`;

}

/* ================= START ================= */

loadMedications();