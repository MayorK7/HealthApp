import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import User from "./models/usermodel.js";

dotenv.config();

await connectDB();

const existing = await User.findOne({
    email: "admin@healthapp.com"
});

if (existing) {

    console.log("Admin already exists.");

    process.exit();

}

const password = await bcrypt.hash("Admin123", 10);

await User.create({

    firstname: "System",

    lastname: "Administrator",

    email: "admin@healthapp.com",

    phone: "08140104625",

    password,

    role: "admin"

});

console.log("Admin account created successfully.");

process.exit();