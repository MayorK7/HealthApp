// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({

//     firstname: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     lastname: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     phone: {
//         type: String,
//         default: ""
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     profileImage: {
//         type: String,
//         default: "/images/default-avatar.png"
//     },

//     role: {
//         type: String,
//         enum: ["patient", "admin"],
//         default: "patient"
//     }

// }, {

//     timestamps: true

// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // Hide password by default
    },

    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      type: String,
      default: "",
    },

    emergencyContactName: {
      type: String,
      default: "",
    },

    emergencyContactPhone: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    allergies: {
      type: String,
      default: "",
    },

    medicalConditions: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient"
},

    profileImage: {
    type: String,
    default: "/images/default-avatar.png"
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;