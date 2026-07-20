import express from "express";

import protect  from "../middlewares/authmiddleware.js";
import adminOnly  from "../middlewares/adminmiddleware.js";

import {

getDashboardStats,

getPatients,

getPatient,

deletePatient

} from "../controllers/adminController.js";

const router = express.Router();

/* Dashboard */

router.get(
    "/dashboard",
    protect,
    adminOnly,
    getDashboardStats
);

/* Patients */

router.get(
    "/patients",
    protect,
    // adminOnly,
    getPatients
);

/* Single Patient */

router.get(
    "/patients/:id",
    protect,
    adminOnly,
    getPatient
);

/* Delete */

router.delete(
    "/patients/:id",
    protect,
    adminOnly,
    deletePatient
);

export default router;