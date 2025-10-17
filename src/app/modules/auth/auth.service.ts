import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config";
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

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    config.jwt.access_secret as string,
    { expiresIn: "15m", algorithm: "HS256" }
  );

  const refreshToken = jwt.sign(
    { email: user.email, role: user.role },
    config.jwt.refresh_secret as string,
    { expiresIn: "1d", algorithm: "HS256" }
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  login,
};
