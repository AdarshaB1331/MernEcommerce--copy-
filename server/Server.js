import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("SUCESS MONGO DB");
});

app.use("/api/users", router);
app.listen(PORT, () => {
  console.log(`Server is running on the  port ${PORT}`);
});
