"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtVerify_1 = require("../middlewares/jwtVerify");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/register", userController_1.registerCtrl);
router.post("/login", userController_1.loginCtrl);
router.get("/get", jwtVerify_1.authMiddle, userController_1.getAllCtrl);
router.get("/list/:page", jwtVerify_1.authMiddle, userController_1.listController);
router.put("/delete", jwtVerify_1.authMiddle, userController_1.deleteCtrl);
router.post("/refresh", userController_1.refresh);
router.use("/address", require("./addressRoutes"));
router.use("/forgot-password", userController_1.forgotPassword);
router.use("/reset-password", userController_1.resetPassword);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map