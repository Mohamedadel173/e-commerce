import express from "express";
const app = express();
app.use(express.json()); // for parsing application/json

import dotenv from "dotenv";
dotenv.config(); // load environment variables

import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


import userRouter from "./routes/userRouter.js";
app.use("/user", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
