import mongoose from "mongoose";

const vcApplySchema = new mongoose.Schema(
  {
    vcId: { type: Number, unique: true },

    officerName: { type: String, required: true },
    reason: { type: String, required: true },
    document: { type: String },

    // 🆕 VC schedule (nullable)
    vcDate: { type: Date, default: null },
    vcTime: { type: String, default: null },

    // 🆕 Officer tipanni
    officerRemark: { type: String, default: null },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VcApply", vcApplySchema);