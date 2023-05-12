const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {

  const { username, email, password, isAdmin} = req.body;
  
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin
  });
  console.log(`User created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email, isAdmin: user.isAdmin });
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = async(req,res)=>{
  try{
      const user =await User.findOne({email:req.body.email});
      if(!user){
        return res.status(400).json("Wrong Credintials!");
      }
       
      const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated){
        return res.status(400).json("Wrong Credintials!");
      }
      const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
      res.status(200).json({ token, user });
      
  }catch(err){
      res.status(500).json(err);
  }
};


//@desc Current user info
//@route GET /api/users/login
//@access admin

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
