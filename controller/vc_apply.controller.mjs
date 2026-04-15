import * as vcService from "../services/vc_apply.service.mjs";
import { successResponse } from "../utils/api_response.mjs";

// ✅ Create
export const createVcApplyController = async (req, res, next) => {
  try {
    const result = await vcService.createVcApply(req.body);
    return successResponse(res, result.data, result.message);
  } catch (err) {
    next(err);
  }
};

// 📥 Get all
export const getAllVcApplyController = async (req, res, next) => {
  try {
    const data = await vcService.getAllVcApply();
    return successResponse(res, data, "VC list fetched successfully");
  } catch (err) {
    next(err);
  }
};

// 🔍 Get by ID
export const getVcApplyByIdController = async (req, res, next) => {
  try {
    const data = await vcService.getVcApplyById(Number(req.params.id));

    if (!data) {
      return successResponse(res, null, "VC not found", 404);
    }

    return successResponse(res, data, "VC fetched successfully");
  } catch (err) {
    next(err);
  }
};

// 🔄 Update Status + Tipanni + Date/Time
export const updateVcStatusController = async (req, res, next) => {
  try {
    const { status, officerRemark, vcDate, vcTime } = req.body;

    const result = await vcService.updateVcStatus(
      Number(req.params.id),
      status,
      officerRemark,
      vcDate,
      vcTime
    );

    return successResponse(res, result.data, result.message);
  } catch (err) {
    next(err);
  }
};