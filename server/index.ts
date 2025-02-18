import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./Db/dbConnection";

const app = express();

//connectdb

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  connectDb();
  console.log(`server listen at Port: ${PORT}`);
});