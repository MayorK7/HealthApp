import cron from "node-cron";

import reminderService from "../services/reminderService.js";

cron.schedule("* * * * *", async () => {

    console.log("Checking medication reminders...");

    await reminderService();

});