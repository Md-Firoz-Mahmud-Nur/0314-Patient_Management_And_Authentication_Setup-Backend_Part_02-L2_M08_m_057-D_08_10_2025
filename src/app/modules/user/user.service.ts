import bcrypt from "bcryptjs";
import prisma from "../../shared/prisma";
import { createPatientInput } from "./user.interface";

const createPatient = async (payload: createPatientInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tnx: {}) => {
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
    });
  });

  console.log("result", result);

  console.log("hashedPassword", hashedPassword);
  return result;
};

export const UserService = {
  createPatient,
};
