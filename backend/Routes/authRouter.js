const { signup, login } = require("../Controller/authController");
const { signupValidation, loginValidation } = require("../Middleware/authValidation");

const router=require("express").Router();

router.post("/signup",signupValidation,signup)
router.post("/login",loginValidation,login);

module.exports=router;