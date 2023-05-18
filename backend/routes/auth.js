var express = require("express");
var router = express.Router();
const { signout , signup, signin, isSignedIn} = require("../controllers/auth");
const { check , validationResult } = require("express-validator");

//this array is validation check
router.post("/signup", [
    check("name"," Name should be atleast 3 character").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("encry_password","Password should have minimum of 3 character").isLength({min:3})
    ] , 
signup);

router.post("/signin", [
    check("email","Email is required").isEmail(),
    check("encry_password","Password is required").isLength({min:3})
    ] , 
signin
);
router.get("/signout", signout);

module.exports = router;
