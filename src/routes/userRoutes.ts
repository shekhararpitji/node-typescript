import express from ("express");
import jwtVerify from ("../middlewares/jwtVerify");
import userController from ("../controllers/userController.ts");

const router = express.Router();

router.post("/register", userController.registerCtrl);

router.post("/login", userController.loginCtrl);

router.get("/get", jwtVerify.authMiddle, userController.getAllCtrl);

router.get("/list/:page", jwtVerify.authMiddle, userController.listController);

router.put("/delete", jwtVerify.authMiddle, userController.deleteCtrl);

router.post("/refresh", userController.refresh);

router.use("/address", require("./addressRoutes"));

router.use("/forgot-password", userController.forgotPassword);

router.use("/reset-password", userController.resetPassword);

module.exports = router;
