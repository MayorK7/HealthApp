import User from "../models/usermodel.js";

/* ================= GET PROFILE ================= */

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);

    }

    catch {

        res.status(500).json({

            message: "Unable to load profile"

        });

    }

};

/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (req, res) => {

    try {

        const {

            firstname,

            lastname,

            phone,

            email

        } = req.body;

        const updated = await User.findByIdAndUpdate(

            req.user.id,

            {

                firstname,

                lastname,

                phone,

                email

            },

            {

                new: true

            }

        ).select("-password");

        res.json({

            success: true,

            message: "Profile updated",

            user: updated

        });

    }

    catch {

        res.status(500).json({

            message: "Unable to update profile"

        });

    }

};