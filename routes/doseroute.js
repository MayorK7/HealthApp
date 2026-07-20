import express from "express";

import protect from "../middlewares/authmiddleware.js";

import { markAsTaken } from "../controllers/medicationController.js";

import { getTodayDoses } from "../controllers/doseController.js";

const router = express.Router();

router.put(

    "/:id/taken",

    protect,

    markAsTaken

);


router.get(

    "/today",

    protect,

    getTodayDoses

);

export default router;