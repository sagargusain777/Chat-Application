import jwt from 'jsonwebtoken'

const generateTokenandsetCookies =(userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "30d"
    })

    res.cookie('jwt',token,{
        // You have to give the maxAge in milliseconds 
        maxAge : 30*24*60*60*1000,
        httpOnly:true,  //This means that the cookie can't be accessed or modified by the browser. prevent XSS attacks
        sameSite: true,  //Prevent CSRF attacks
        secure : process.env.NODE_ENV !== 'development' //This means that the cookie will only be set in production. In development, it will not be set
    })
}
export default generateTokenandsetCookies;