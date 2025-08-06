  import { NewAddress, userInterface } from './../interfaces.td';
  import { JwtPayload, Secret, verify } from "jsonwebtoken";
  import { User } from "../models/user";
  import { Address } from "../models/address";
  import { Op } from "sequelize";
  import { Request, Response } from "express";
  export const addressService = async (req: Request, res: Response) => {
    try {
      const token = req.get("authorization")?.split(" ")[1];
      if (!token) {
        return res.status(404).send({ message: " token undefined" });
      }
      const decoded = verify(token, process.env.SECRET as Secret);
      if (!decoded) {
        return res.status(404).send({ message: " token undefined" });
      }
      const { email } = decoded as JwtPayload;
      const user = await User.findOne({
        where: {
          email,
        },
      }) ;
      if(!user){
        return res.status(404).send({message: "user not found"})
      }
      const id = user?.id;
      const { address, state, pin_code, phone_no } = req.body;
      const Creator = Address.belongsTo(User, { as: "addresses" });

      const newAddress = await Address.create(
        {
          userId: id,
          address,
          state,
          pin_code,
          phone_no,
        },
        {
          include: [Creator],
        }
      );
      return newAddress;
    } catch (error) {
      console.error(error);
    }
  };

  export const addressListService = async (req: Request) => {
    const id = req.params.id;

    const address = await User.findByPk(id);
    return address;
  };

  export const deleteAddressService = async (req: Request, res: Response) => {
    const addressIds = req.body.addressIds;
    if (!addressIds || !Array.isArray(addressIds)) {
      return res.status(400).json({ error: "Invalid request format" });
    }

    await Address.destroy({
      where: {
        id: {
          [Op.in]: addressIds,
        },
      },
    });
  };
