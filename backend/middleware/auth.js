module.exports = (req, res, next) => {
  const role = req.headers["x-user-role"];

  req.user = {
    id: "user_001",
    role: role || "Department Admin",
  };

  next();
};
