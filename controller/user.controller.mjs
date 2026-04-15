import * as userService from "../services/user.service.mjs";
import { errorResponse, successResponse } from "../utils/api_response.mjs";

// Signup + Login
export const createUserController = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);

    if (result.login) {
      return successResponse(res, result.user, "Login successful");
    }

    if (!result.login && !result.created) {
      return errorResponse(res, result.message || "Invalid password", 401, null);
    }

    if (result.created) {
      return successResponse(res, result.user, "User created successfully");
    }
  } catch (err) {
    next(err);
  }
};

// Login API
export const loginUserController = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);

    if (!result.exists) {
      return errorResponse(res, "User not exists", 404, null);
    }

    if (!result.login) {
      return errorResponse(res, "Invalid password", 401, null);
    }

    return successResponse(res, result.user, "Login successful");
  } catch (err) {
    next(err);
  }
};

// Other Controllers
export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, users, "Users fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getUserByEmailController = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return errorResponse(res, "User not found", 404, null);

    return successResponse(res, user, "User fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return errorResponse(res, "User not found", 404, null);

    return successResponse(res, user, "User fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      Number(req.params.id),
      req.body
    );

    if (!updatedUser) return errorResponse(res, "User not found", 404, null);

    return successResponse(res, updatedUser, "User updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(Number(req.params.id));

    if (!deletedUser) return errorResponse(res, "User not found", 404, null);

    return successResponse(res, null, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};