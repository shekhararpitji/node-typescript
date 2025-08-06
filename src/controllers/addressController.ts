import { Request, Response } from "express";
import {
  addressService,
  deleteAddressService,
  addressListService,
} from "../services/address.services";

export const addressController = async (req: Request, res: Response) => {
  try {
    const address = await addressService(req, res);
    res.status(200).json({ message: "Address saved", data: address });
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Address");
  }
};

export const addressListController = async (req: Request, res: Response) => {
  try {
    const address = await addressListService(req);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteAddressController = async (req: Request, res: Response) => {
  try {
    await deleteAddressService(req, res);
    res.json({ message: "Addresses deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
