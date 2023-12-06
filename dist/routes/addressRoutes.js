"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtVerify_1 = require("../middlewares/jwtVerify");
const addressController_1 = require("./../controllers/addressController");
const router = express_1.default.Router();
router.post("/new", jwtVerify_1.authMiddle, addressController_1.addressController);
router.get("/get/:id", jwtVerify_1.authMiddle, addressController_1.addressListController);
router.delete("/delete", jwtVerify_1.authMiddle, addressController_1.deleteAddressController);
module.exports = router;
//# sourceMappingURL=addressRoutes.js.map