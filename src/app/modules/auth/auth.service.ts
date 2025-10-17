import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";

const login = async (payload: { email: string; password: string }) => {
  console.log("user login info", payload);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export const AuthService = {
  login,
};
