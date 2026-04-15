import * as userRepo from "../repositories/user.repo.mjs";

// Signup + Login combined
export const createUser = async (data) => {
  const existingUser = await userRepo.getUserByEmailRepo(data.email);

  // ✅ Email exists
  if (existingUser) {
    if (existingUser.password === data.password) {
      return {
        login: true,
        created: false,
        user: existingUser,
      };
    }

    return {
      login: false,
      created: false,
      message: "Invalid password",
    };
  }

  // ✅ Email not exists → create
  const newUser = await userRepo.createUserRepo(data);

  return {
    login: false,
    created: true,
    user: newUser,
  };
};

// Separate Login API
export const loginUser = async (data) => {
  const user = await userRepo.getUserByEmailRepo(data.email);

  if (!user) {
    return {
      exists: false,
      message: "User not exists",
    };
  }

  if (user.password !== data.password) {
    return {
      exists: true,
      login: false,
      message: "Invalid password",
    };
  }

  return {
    exists: true,
    login: true,
    user,
  };
};

// Other Services
export const getAllUsers = async () => {
  return await userRepo.getAllUsersRepo();
};

export const getUserByEmail = async (email) => {
  return await userRepo.getUserByEmailRepo(email);
};

export const getUserById = async (id) => {
  return await userRepo.getUserByIdRepo(id);
};

export const updateUser = async (id, data) => {
  return await userRepo.updateUserRepo(id, data);
};

export const deleteUser = async (id) => {
  return await userRepo.deleteUserRepo(id);
};