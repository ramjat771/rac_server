import Request from "../models/request.model.mjs";
import Counter from "../models/counter.model.mjs";

// 🔥 Create
export const createRequestRepo = async (data) => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "requestId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const request = new Request({
    ...data,
    requestId: counter.seq,
  });

  return await request.save();
};

// 📥 Get all
export const getAllRequestRepo = async () => {
  return await Request.find().sort({ createdAt: -1 });
};

// 🔍 Get by ID
export const getRequestByIdRepo = async (id) => {
  return await Request.findOne({ requestId: id });
};