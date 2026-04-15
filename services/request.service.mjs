import * as requestRepo from "../repositories/request.repo.mjs";

// ✅ Create
export const createRequest = async (data) => {
  const request = await requestRepo.createRequestRepo(data);

  return {
    success: true,
    message: "Request submitted successfully",
    data: request,
  };
};

// 📥 Get all
export const getAllRequest = async () => {
  return await requestRepo.getAllRequestRepo();
};

// 🔍 Get by ID
export const getRequestById = async (id) => {
  return await requestRepo.getRequestByIdRepo(id);
};