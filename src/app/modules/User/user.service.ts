import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../config";
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

export const UserService = {
  createUser,
};
