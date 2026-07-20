// export const adminOnly = (req, res, next) => {

//     if (req.user.role !== "admin") {

//         return res.status(403).json({

//             message: "Access denied."

//         });

//     }

//     next();

// };

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only.",
  });
};

export default adminOnly;