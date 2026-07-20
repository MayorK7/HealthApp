
// export default router;


import express from "express";

import protect from "../middlewares/authmiddleware.js";

import {

addMedication,

getMedications,

getMedication,

updateMedication,

deleteMedication,

markAsTaken,

getTodayMedications

} from "../controllers/medicationController.js";

const router = express.Router();

router.post("/", protect, addMedication);

router.get("/", protect, getMedications);

router.get("/:id", protect, getMedication);

router.put("/:id", protect, updateMedication);

router.delete("/:id", protect, deleteMedication);

router.put("/:id/taken", protect, markAsTaken);


router.get(
    "/today",
    protect,
    getTodayMedications
);

export default router;