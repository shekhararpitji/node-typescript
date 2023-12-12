import { NextFunction } from "express";
import { userInterface, CustomRequest } from "../interfaces.td";
import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const createToken = (user: userInterface) => {
  const payload = {
    id: user.id?.toString(),
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.SECRET as Secret, {
    expiresIn: "15m",
  });
  return token;
};
