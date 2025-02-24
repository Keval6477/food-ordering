import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./Db/dbConnection";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.route";
import menuRoutes from "./routes/menu.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
const options = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  connectDb();
  console.log(`server listen at Port: ${PORT}`);
});
