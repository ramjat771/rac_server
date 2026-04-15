import { Router } from "express";
import * as vcController from "../controller/vc_apply.controller.mjs";
import { upload } from "../middlewares/multer.mjs";
import { filesToBody } from "../middlewares/file-to-body.middleware.mjs";

const router = Router();

// 📂 Upload config
const uploadFields = upload.fields([
  { name: "document", maxCount: 1 },
]);

// 🚀 CREATE
router.post(
  "/",
  uploadFields,
  filesToBody,
  vcController.createVcApplyController
);

// 📥 GET ALL
router.get("/", vcController.getAllVcApplyController);

// 🔍 GET BY ID
router.get("/:id", vcController.getVcApplyByIdController);

// 🔄 UPDATE (status + tipanni + schedule)
router.patch("/:id/status", vcController.updateVcStatusController);

export default router;