import { Router } from "express";
import * as requestController from "../controller/request.controller.mjs";
import { upload } from "../middlewares/multer.mjs";
import { filesToBody } from "../middlewares/file-to-body.middleware.mjs";

const router = Router();

// 📂 Upload config (same as frontend)
const uploadFields = upload.fields([
  { name: "businessDocs", maxCount: 1 },
  { name: "bankStatement", maxCount: 1 },
  { name: "proof", maxCount: 1 },
  { name: "noc", maxCount: 1 },
]);

// 🚀 CREATE
router.post(
  "/",
  uploadFields,
  filesToBody,
  requestController.createRequestController
);

// 📥 GET ALL
router.get("/", requestController.getAllRequestController);

// 🔍 GET BY ID
router.get("/:id", requestController.getRequestByIdController);

export default router;