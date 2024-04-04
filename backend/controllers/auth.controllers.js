import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import generateTokenandsetCookies from "../utils/generateToken.js";

export const  signup= async(req,res)=>{
  try{
    const {fullName,username,password,confirmpassword,gender} =req.body;
    
    //Checking that the password and confirm password are same or not
    if(!(password===confirmpassword)){
      console.log("Password does not match");
      return res.status(400).json({message:"Password does not match"})
    }
   
    //Checking the user from the username that it already exists or not
    const user = await User.findOne({username});
    if(user){
      console.log("User already exists");
      return res.status(400).json({message:"User already exists"})
    }


    //Profile image based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${fullName}`

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //Creating the user in the database
    const newUser = new User({
      fullName,
      username,
      password : hashedPassword,
      gender,
      profilePic :(gender ==="male")?boyProfilePic:girlProfilePic
      
    })

    if(newUser){

      await newUser.save();
      console.log("User created");
      return res.status(201).json(
        {
          _id:newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender:newUser.gender
        }
      )

    }
    else{
      console.log("User not created");
      return res.status(400).json({message:"User not created"})
    }
    


  }catch(error){
    console.log(` Error in SignUp controller: ${error}`);
    res.status(500).json({message:"Internal Server Error"})
  }
}
export const  login = async(req,res)=>{
    try {
      const {username,password} = req.body;
      
      //Checking the user from the database
      const user = await User.findOne({username: username});
      
      //Checking that the password matches with the database password or not
      const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
      if(!user || !isPasswordCorrect){
        console.log("Invalid Credentials");
        return res.status(400).json({message:"Invalid Credentials"})
      }

      generateTokenandsetCookies(user._id,res);

      res.status(200).json(
        {
          _id:user._id,
          fullName: user.fullName,
          username: user.username,
        profilePic:user.profilePic
      })

      
    } catch (error) {
      console.log(` Error in Login controller: ${error}`);
      res.status(500).json({message:"Internal Server Error"})
      
    }
} 
export const  logout = (req,res)=>{
    res.send("Logout Route")
}

