import express from "express";
import multer from "multer"; // Import multer for handling file uploads

import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" }); // Set the destination for uploaded files

router.post("/", upload.single("file"), uploadFile);

export default router;
