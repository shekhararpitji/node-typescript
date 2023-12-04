import { User }  from "../models/user.js";
import { Address }  from "../models/address.js";
import { Op }  from "sequelize";
import { validateToken }  from "../utils/authUtil.js";
import { Request,Response } from "express";


export const addressService = async (req:Request) => {
    try {
      const {email} =await validateToken(req); 
      const user = await User.findOne({
        where: {
          email,
        },
      });
      const { address, state, pin_code, phone_no,  } = req.body;
      const Creator = Address.belongsTo(User, { as: "addresses" });
      const newAddress = await Address.create(
        {
          userId: user.id,
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
  
  export const addressListService = async (req:Request) => {
    const userId = req.params.id;
  
    const address = await User.findAll({
      where: { id: userId },
      include: Address,
    });
    return address;
  };
  
  export const deleteAddressService = async (req:Request) => {
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
  