import VcApply from "../models/vc_apply.model.mjs";
import Counter from "../models/counter.model.mjs";

// 🔥 Create
export const createVcApplyRepo = async (data) => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "vcId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const vcApply = new VcApply({
    ...data,
    vcId: counter.seq,
  });

  return await vcApply.save();
};

// 📥 Get all
export const getAllVcApplyRepo = async () => {
  return await VcApply.find().sort({ createdAt: -1 }).populate("userId");
};

// 🔍 Get by ID
export const getVcApplyByIdRepo = async (id) => {
  return await VcApply.findOne({ vcId: id });
};

// 🆕 Get by ForwardTo
export const getVcByForwardToRepo = async (forwardTo) => {
  return await VcApply.find({ forwardTo }).sort({ createdAt: -1 });
};

// 🔄 Update Status + Schedule + Remark + Link + Forward
export const updateVcStatusRepo = async (
  id,
  status,
  officerRemark,
  vcDate,
  vcTime,
  vcLink,
  forwardTo
) => {
  return await VcApply.findOneAndUpdate(
    { vcId: id },
    {
      status,
      officerRemark,
      vcDate,
      vcTime,
      vcLink,
      forwardTo,
    },
    { new: true }
  );
};
// 🔍 Get by UserId
export const getVcByUserIdRepo = async (userId) => {
  return await VcApply.find({ userId })
    .sort({ createdAt: -1 })
    .populate("userId"); // 👈 user details
};

