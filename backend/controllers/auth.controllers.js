import User from "../models/user.models.js"


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

    //Creating the user in the database
    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic :(gender ==="male")?boyProfilePic:girlProfilePic
      
    })
    await newUser.save();

    res.status(201).json({message:"User created successfully",newUser})


  }catch(error){
    console.log(` Error in Creating User: ${error}`);
    res.status(500).json({message:"Internal Server Error"})
  }
}
export const  login = (req,res)=>{
    res.send("Login Route")
} 
export const  logout = (req,res)=>{
    res.send("Logout Route")
}

