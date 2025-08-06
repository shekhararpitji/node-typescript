import express from "express";
import { authMiddle } from '../middlewares/jwtVerify';
import { addressController, addressListController, deleteAddressController } from './../controllers/addressController';

const router = express.Router();

router.post("/new", authMiddle, addressController);

router.get("/get/:id",authMiddle,addressListController);

router.delete("/delete",authMiddle,deleteAddressController);

module.exports = router;
