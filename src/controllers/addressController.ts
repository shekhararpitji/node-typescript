import { Request,Response } from 'express';
import {
  addressService,
  deleteAddressService,
  addressListService,
} from "../services/address.services.js";

exports.addressController = async (req:Request, res:Response) => {
  try {
    const address = await addressService(req);
    res.status(200).json({ message: "Address saved", data: address });
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Address");
  }
};

exports.addressListController = async (req:Request, res:Response) => {
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

exports.deleteAddressController = async (req:Request, res:Response) => {
  try {
    await deleteAddressService(req);
    res.json({ message : "Addresses deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
