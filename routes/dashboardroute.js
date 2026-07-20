import express from "express";

import protect from "../middlewares/authmiddleware.js";

import {

    getDashboardStats,

    getRecentActivities,

     getTodayDoses

} from "../controllers/dashboardController.js";



const router = express.Router();

/* ============================
   Dashboard Statistics
============================ */

router.get(

    "/stats",

    protect,

    getDashboardStats

);

/* ============================
   Recent Activities
============================ */

router.get(

    "/activities",

    protect,

    getRecentActivities

);

router.get(
    "/today-doses",
    protect,
    getTodayDoses
);

export default router;