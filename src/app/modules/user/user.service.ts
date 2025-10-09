// import bcrypt from "bcryptjs";
import prisma from "../../shared/prisma";
import { createPatientInput } from "./user.interface";

const createPatient = async (payload: createPatientInput) => {
  // const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tnx:any) => {
    await tnx.patient.create({
      data: {
        email: payload.email,
        // password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        email: payload.email,
        // password: hashedPassword,
      },
    });
  });
  // console.log("hashedPassword", hashedPassword);
  return result
};

export const userService = {
  createPatient,
};
