import express from "express";

import protect from "../middlewares/authmiddleware.js";

import {

getNotifications,

markNotificationRead

} from "../controllers/notificationController.js";


const router = express.Router();



router.get(

"/",

protect,

getNotifications

);



router.put(

"/:id/read",

protect,

markNotificationRead

);



export default router;