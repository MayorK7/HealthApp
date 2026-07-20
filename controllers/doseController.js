

export const getTodayDoses = async (req, res) => {

    try {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const doses = await Dose.find({

            patient: req.user.id,

            scheduledTime: {

                $gte: start,

                $lte: end

            }

        })
        .populate("medication")
        .sort({

            scheduledTime: 1

        });

        res.json({

            success: true,

            doses

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to load today's doses."

        });

    }

};