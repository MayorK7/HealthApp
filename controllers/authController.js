import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =============================
// REGISTER USER
// =============================
export const registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      dateOfBirth,
      address,
    } = req.body;

    // Check required fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      gender,
      dateOfBirth,
      address,

       role: "patient"
    });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token: generateToken(user._id),
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// LOGIN USER
// =============================
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });

    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

    }

    // res.status(200).json({
    //   success: true,
    //   message: "Login successful.",
    //   token: generateToken(user._id),
    //   user,
    // });


    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: generateToken(user._id),
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      user,
});




    } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



  // =============================
// GET LOGGED-IN USER PROFILE
// =============================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================
// UPDATE USER PROFILE
// =============================
export const updateProfile = async (req, res) => {
  try {

    const {
      firstname,
      lastname,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContactName,
      emergencyContactPhone,
      bloodGroup,
      allergies,
      medicalConditions,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.address = address || user.address;
    user.emergencyContactName =
      emergencyContactName || user.emergencyContactName;
    user.emergencyContactPhone =
      emergencyContactPhone || user.emergencyContactPhone;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.allergies = allergies || user.allergies;
    user.medicalConditions =
      medicalConditions || user.medicalConditions;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// CHANGE PASSWORD
// =============================
export const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


export const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please select an image."

            });

        }

        const user = await User.findById(req.user.id);

        user.profileImage = `/uploads/profile/${req.file.filename}`;

        await user.save();

        res.json({

            success: true,

            profileImage: user.profileImage

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Upload failed."

        });

    }

};

// };