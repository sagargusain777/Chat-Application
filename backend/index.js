import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit: "16kb"}));
app.use("/api/auth", authRoutes);
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
