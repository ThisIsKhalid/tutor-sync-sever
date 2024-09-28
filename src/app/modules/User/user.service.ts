import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../config";
import { createToken } from "../../utils/jwtToken";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (data: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const hashedPassword = await bcrypt.hash(
      data?.password,
      Number(config.bcrypt_salt_rounds),
    );

    data.password = hashedPassword;

    // logic for db operation
    const result = await User.create(data);

    await session.commitTransaction();
    await session.endSession();

    // return response
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed");
  }
};

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const UserService = {
  createUser,
  login,
};
