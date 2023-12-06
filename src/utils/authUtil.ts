import { NextFunction } from 'express';
import { userInterface ,CustomRequest } from './../../interfaces.td';
import jwt from 'jsonwebtoken';


export const createToken = (user:userInterface ) => {
  const payload = {
    id: user.id?.toString(),
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "15m" });
  return token;
};

//  export const validateToken = async (req:Request) => {
//   // const { data } = await ApiHeader.get("api/search/all", authHeader());
//   const token:string = req.get('authorization')?.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.SECRET);
//   (req as CustomRequest).token = decoded;
// };


