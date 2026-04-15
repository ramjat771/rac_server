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
  return await VcApply.find().sort({ createdAt: -1 });
};

// 🔍 Get by ID
export const getVcApplyByIdRepo = async (id) => {
  return await VcApply.findOne({ vcId: id });
};

// 🔄 Update Status + Schedule + Remark
export const updateVcStatusRepo = async (
  id,
  status,
  officerRemark,
  vcDate,
  vcTime
) => {
  return await VcApply.findOneAndUpdate(
    { vcId: id },
    {
      status,
      officerRemark,
      vcDate,
      vcTime,
    },
    { new: true }
  );
};