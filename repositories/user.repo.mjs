import User from "../models/user.model.mjs";
import Counter from "../models/counter.model.mjs";

// Create User
export const createUserRepo = async (data) => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const user = new User({
    ...data,
    userId: counter.seq,
  });

  return await user.save();
};

// Get All Users
export const getAllUsersRepo = async () => {
  return await User.find().sort({ createdAt: -1 });
};

// Get User by Email (case-insensitive)
export const getUserByEmailRepo = async (email) => {
  return await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
};

// Get User by ID
export const getUserByIdRepo = async (id) => {
  return await User.findOne({ userId: id });
};

// Update User
export const updateUserRepo = async (id, updateData) => {
  return await User.findOneAndUpdate(
    { userId: id },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

// Delete User
export const deleteUserRepo = async (id) => {
  return await User.findOneAndDelete({ userId: id });
};