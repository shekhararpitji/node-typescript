import express from ("express");
import jwtVerify from '../middlewares/jwtVerify.ts';
import userController from ("../controllers/addressController.ts");
const router = express.Router();
router.post("/new", jwtVerify.authMiddle, userController.addressController);
router.get("/get/:id", jwtVerify.authMiddle, userController.addressListController);
router.delete("/delete", jwtVerify.authMiddle, userController.deleteAddressController);
module.exports = router;
