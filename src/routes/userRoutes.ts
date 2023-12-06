import express from "express";
import { authMiddle } from "../middlewares/jwtVerify";
import { deleteCtrl, forgotPassword, getAllCtrl, listController, loginCtrl, refresh, registerCtrl, resetPassword } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerCtrl);

router.post("/login", loginCtrl);

router.get("/get", authMiddle, getAllCtrl);

router.get("/list/:page", authMiddle, listController);

router.put("/delete", authMiddle, deleteCtrl);

router.post("/refresh", refresh);

router.use("/address", require("./addressRoutes"));

router.use("/forgot-password", forgotPassword);

router.use("/reset-password", resetPassword);

module.exports = router;
