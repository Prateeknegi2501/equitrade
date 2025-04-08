const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(" ")[1]; ;
  if (!token) {
    return res
      .status(403)
      .send({ message: "Unauthorized! JWT token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Unauthorized! JWT token is wrong or expired" });
  }
};

module.exports={isLoggedIn};