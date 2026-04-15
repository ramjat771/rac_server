import * as requestService from "../services/request.service.mjs";
import { successResponse } from "../utils/api_response.mjs";

// ✅ Create
export const createRequestController = async (req, res, next) => {
  try {
    const result = await requestService.createRequest(req.body);
    return successResponse(res, result.data, result.message);
  } catch (err) {
    next(err);
  }
};

// 📥 Get all
export const getAllRequestController = async (req, res, next) => {
  try {
    const data = await requestService.getAllRequest();
    return successResponse(res, data, "Requests fetched successfully");
  } catch (err) {
    next(err);
  }
};

// 🔍 Get by ID
export const getRequestByIdController = async (req, res, next) => {
  try {
    const data = await requestService.getRequestById(
      Number(req.params.id)
    );

    if (!data) {
      return successResponse(res, null, "Request not found", 404);
    }

    return successResponse(res, data, "Request fetched successfully");
  } catch (err) {
    next(err);
  }
};