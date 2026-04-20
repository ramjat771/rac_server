import * as vcService from "../services/vc_apply.service.mjs";
import { successResponse } from "../utils/api_response.mjs";
import mongoose from "mongoose";

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

// 🆕 Get by ForwardTo
export const getVcByForwardToController = async (req, res, next) => {
  try {
    const data = await vcService.getVcByForwardTo(req.params.forwardTo);
    return successResponse(res, data, "VC list fetched by forwardTo");
  } catch (err) {
    next(err);
  }
};

// 🔄 Update
export const updateVcStatusController = async (req, res, next) => {
  try {
    const allowedFields = [
      "status",
      "officerRemark",
      "vcDate",
      "vcTime",
      "vcLink",
      "forwardTo",
    ];

    // 🧠 only send defined fields
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const result = await vcService.updateVcStatus(
      Number(req.params.id),
      updateData
    );

    return successResponse(res, result.data, result.message);
  } catch (err) {
    next(err);
  }
};

// 🆕 Get by UserId
export const getVcByUserIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // ❌ NULL / EMPTY CHECK
    if (!userId) {
      return successResponse(res, null, "userId is required", 400);
    }

    // ❌ INVALID OBJECT ID CHECK
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return successResponse(res, null, "Invalid userId format", 400);
    }

    const data = await vcService.getVcByUserId(userId);

    // ❌ NO DATA FOUND
    if (!data || data.length === 0) {
      return successResponse(res, [], "No VC records found for this user", 404);
    }

    // ✅ SUCCESS
    return successResponse(res, data, "VC list fetched by userId");
    
  } catch (err) {
    next(err);
  }
};