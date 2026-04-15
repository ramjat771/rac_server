import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: Number, unique: true },

    name: String,
    mobile: String,
    email: String,
    address: String,

    accountType: String,
    accountRelatedTo: String,

    accountNo: String,
    branchEmail: String,
    acknowledgement: String,
    openingYear: String,

    businessDescription: String,
    businessDocs: String,

    reason: String,
    bankStatement: String,

    identityType: String,
    proof: String,

    noc: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);