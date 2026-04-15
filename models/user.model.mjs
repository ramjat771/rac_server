import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true },

    name: { type: String, required: true, trim: true },
    belt_number: { type: String, required: true },
    battalion_name: { type: String, required: true },
    company: { type: String, required: true },

    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;