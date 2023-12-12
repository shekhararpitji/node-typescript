import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import randtoken from "rand-token";
import { client } from "../config/redis.config";

import { createToken } from "../utils/authUtil";
import { itemsPerPage } from "../constants/constant";
import { userInterface } from "../interfaces.td";

export const loginService = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "username not found" });
  }

  const access_token = createToken(user as userInterface);
  let refreshToken = randtoken.uid(256);
  await client.set(refreshToken, username);
  return { access_token, refreshToken };
};

export const registerService = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      console.error("error in validation");
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password, email, firstName, lastName } = req.body;

    const salt = 10;
    const hashpassword = await bcrypt.hash(password, salt);

    await User.create({
      userName,
      password: hashpassword,
      email,
      firstName,
      lastName,
    });
  } catch (error) {
    console.error(error);
  }
};

export const listService = async (req: Request) => {
  try {
    const page = parseInt(req.params.page);
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage;
    const data = await User.findAll();
    const printUsers = data.slice(startIndex, endIndex);
    return printUsers;
  } catch (error) {
    console.error(error);
  }
};
