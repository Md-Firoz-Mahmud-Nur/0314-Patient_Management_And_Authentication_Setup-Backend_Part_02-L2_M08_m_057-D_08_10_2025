import bcrypt from "bcryptjs";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log("uploadResult", uploadResult);
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  console.log("hashPassword", hashPassword);

  // const result = await prisma.$transaction(async (tnx) => {
  //   await tnx.user.create({
  //     data: {
  //       email: payload.email,
  //       password: hashPassword,
  //     },
  //   });

  //   return await tnx.patient.create({
  //     data: {
  //       name: payload.name,
  //       email: payload.email,
  //     },
  //   });
  // });

  // return result;
};

export const UserService = {
  createPatient,
};
