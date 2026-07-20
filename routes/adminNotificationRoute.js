import express from "express";

import protect from "../middlewares/authmiddleware.js";

import {
    sendAnnouncement
} from "../controllers/adminNotificationController.js";


const router = express.Router();



router.post(

"/announcement",

protect,

sendAnnouncement

);



export default router;