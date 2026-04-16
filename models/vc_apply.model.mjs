import mongoose from "mongoose";
const vcApplySchema = new mongoose.Schema(
  {
    vcId: { type: Number, unique: true },
    officerName: { type: String, required: true },
    reason: { type: String, required: true },
    document: { type: String },
    // 🆕 VC Schedule
    vcDate: { type: Date, default: null },
    vcTime: { type: String, default: null },
    
    upload: { type: String },

    // 🆕 VC Link
    vcLink: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},

    // 🆕 Forward To
    forwardTo: { type: String, default: null },

    // 🆕 Officer Remark
    officerRemark: { type: String, default: null },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "toADGP"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VcApply", vcApplySchema);