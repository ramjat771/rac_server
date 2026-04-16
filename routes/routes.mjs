import { Router } from "express";

import userRoutes from "./user.routes.mjs"
import request from "./request.routes.mjs"
import vc from "./vc_apply.routes.mjs"
const router = Router();
router.use("/user",userRoutes)
router.use("/request",request)
router.use("/vc",vc)

export default router;
