import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/auth/signup',(req,res)=>{
    res.status(200).send("Hello World !!!!!")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})