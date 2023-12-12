import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token as string, process.env.SECRET as Secret);
    (req as CustomRequest).token = decoded;
    if (typeof decoded !== "string") {
      next();
      return decoded;
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
