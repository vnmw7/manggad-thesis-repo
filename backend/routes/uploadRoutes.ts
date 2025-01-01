// guide: https://www.youtube.com/watch?v=3Gj_mL9JJ6k
import { Router } from "express";
import { uploadController } from "../controllers/uploadController";
import upload from "../middleware/multer";

const uploadRouter = Router();

uploadRouter.post("/pdf", upload.single("pdf"), uploadController.uploadPdf);

export default uploadRouter;
