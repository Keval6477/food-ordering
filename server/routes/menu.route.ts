import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../utils/multer";
import { addMenu, EditMenu } from "../controllers/menu.controller";

const router = express.Router();

router.post("/", isAuthenticated as any, upload.single("file"), addMenu as any);
router.put("/", isAuthenticated as any, upload.single("file"), EditMenu as any);

export default router;
