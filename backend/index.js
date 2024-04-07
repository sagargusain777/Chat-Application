import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit: "16kb"}));
//Route For the authentication
app.use("/api/auth", authRoutes);
//Route for the Messages
app.use('/api/messages',messageRoutes)
connectDB()
  .then(() => {
    {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error(`Database Connection Failed : ${error.message}`);
  });
