const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser=require("../middleware/fetchUser");
const JWT_SECRET = "raviisgoodboy";

//Route:[1] Create a user using POST "/api/auth/createUser", No login require
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //IF THERE ARE  ERROR ,RETURN A BAD ERRRO
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wheather the user with Same Email is exist or not
    try {
      let success=false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        
        return res
          .status(400)
          .json({success, error: "Sorry, user email is already exaist " });
      }
      const salt = await bcrypt.genSaltSync(10);
      secPass = await bcrypt.hashSync(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      /*   .then(user=>res.json(user))
  .catch(err=>console.log(error)) */
     //authntication for 
      const data = {
        user: {
          id: user.id
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      res.json({  success, authToken });
      /* res.json(user.id) */
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error  has been occured");
      
    }
  }
);
//[Route :[2]]authticate a user  using POST "/api/auth/login", No login require
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        let success=false;
        return res
          .status(400)
          .json({ error: "Try to login with correct credintail" });
      }
      //check user inter password and stored password
      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({success, errors: "Try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(success,authToken);

      res.json({ success,authToken:authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal erro of server");
    }
  }
);

//Route 3:Get logedIn  user detail using :POST "/api/auth/getUser"
router.post(
  "/getUser",fetchUser,async (req, res) => {
try {
  userId=req.user.id;
  const user= await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send('Enternal erro of server');
  
}
});

module.exports = router;
