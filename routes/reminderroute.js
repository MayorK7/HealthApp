

import express from "express";

import protect from "../middlewares/authmiddleware.js";


import {

    getTodayReminders,

    completeReminder,

    toggleReminder

} from "../controllers/reminderController.js";

const router = express.Router();

/* =====================================
   GET ALL ACTIVE REMINDERS
===================================== */

router.get(

    "/",

    protect,

    getTodayReminders

);

/* =====================================
   MARK REMINDER AS COMPLETED
===================================== */

router.put(

    "/:id/complete",

    protect,

    completeReminder

);

/* =====================================
   ENABLE/DISABLE REMINDER
===================================== */

router.patch(

    "/:id/toggle",

    protect,

    toggleReminder

);

export default router;