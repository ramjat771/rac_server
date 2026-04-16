import * as vcRepo from "../repositories/vc_apply.repo.mjs";

// ✅ Create
export const createVcApply = async (data) => {
  const vc = await vcRepo.createVcApplyRepo(data);

  return {
    success: true,
    message: "VC request submitted successfully",
    data: vc,
  };
};

// 📥 Get all
export const getAllVcApply = async () => {
  return await vcRepo.getAllVcApplyRepo();
};

// 🔍 Get by ID
export const getVcApplyById = async (id) => {
  return await vcRepo.getVcApplyByIdRepo(id);
};

// 🆕 Get by ForwardTo
export const getVcByForwardTo = async (forwardTo) => {
  return await vcRepo.getVcByForwardToRepo(forwardTo);
};

// 🔄 Update
export const updateVcStatus = async (
  id,
  status,
  officerRemark,
  vcDate,
  vcTime,
  vcLink,
  forwardTo
) => {
  const updated = await vcRepo.updateVcStatusRepo(
    id,
    status,
    officerRemark,
    vcDate,
    vcTime,
    vcLink,
    forwardTo
  );

  return {
    success: true,
    message: "VC updated successfully",
    data: updated,
  };
};


// 🆕 Get by UserId
export const getVcByUserId = async (userId) => {
  return await vcRepo.getVcByUserIdRepo(userId);
};

