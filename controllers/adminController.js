import User from "../models/usermodel.js";
import Medication from "../models/medicationmodels.js";

/* ================= DASHBOARD ================= */

export const getDashboardStats = async (req, res) => {
    try {

        const totalPatients = await User.countDocuments({
            role: "patient"
        });

        const totalAdmins = await User.countDocuments({
            role: "admin"
        });

        const totalMedications = await Medication.countDocuments();

        const taken = await Medication.countDocuments({
            status: "Taken"
        });

        const pending = await Medication.countDocuments({
            status: "Pending"
        });

        const missed = await Medication.countDocuments({
            status: "Missed"
        });

        const recentPatients = await User.find({
            role: "patient"
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-password");

        res.json({
            totalPatients,
            totalAdmins,
            totalMedications,
            taken,
            pending,
            missed,
            recentPatients
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable to load dashboard."
        });
    }
};

/* ================= GET ALL PATIENTS ================= */

export const getPatients = async (req, res) => {

    try {

        const patients = await User.find({
            role: "patient"
        })
        .select("-password")
        .sort({ createdAt: -1 });

        res.json(patients);

    } catch {

        res.status(500).json({
            message: "Unable to load patients."
        });

    }

};

/* ================= GET PATIENT DETAILS ================= */

export const getPatient = async (req, res) => {

    try {

        const patient = await User.findById(req.params.id)
            .select("-password");

        if (!patient) {

            return res.status(404).json({
                message: "Patient not found."
            });

        }

        const medications = await Medication.find({
            patient: patient._id
        });

        res.json({
            patient,
            medications
        });

    } catch {

        res.status(500).json({
            message: "Unable to load patient."
        });

    }

};

/* ================= DELETE PATIENT ================= */

export const deletePatient = async (req, res) => {

    try {

        await Medication.deleteMany({
            patient: req.params.id
        });

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "Patient deleted successfully."
        });

    } catch {

        res.status(500).json({
            message: "Unable to delete patient."
        });

    }

};