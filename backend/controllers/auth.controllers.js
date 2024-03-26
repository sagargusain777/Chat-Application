import User from "../models/user.models.js"
import bcrypt from "bcryptjs"

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
export const  login = (req,res)=>{
    res.send("Login Route")
} 
export const  logout = (req,res)=>{
    res.send("Logout Route")
}

