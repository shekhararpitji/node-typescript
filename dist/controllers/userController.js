"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.refresh = exports.deleteCtrl = exports.listController = exports.getAllCtrl = exports.loginCtrl = exports.registerCtrl = void 0;
const user_services_1 = require("../services/user.services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_config_1 = require("../config/redis.config");
const user_1 = require("../models/user");
const authUtil_1 = require("../utils/authUtil");
const emailUtil_1 = require("../utils/emailUtil");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_services_1.registerService)(req, res);
        yield (0, emailUtil_1.emails)({
            to: req.body.email,
            link: "",
            message: "registered successfully",
            subject: "User registration"
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.registerCtrl = registerCtrl;
const loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refreshToken } = yield (0, user_services_1.loginService)(req, res);
        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true });
        res.status(200).json({ jwt: access_token, refreshToken: refreshToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.loginCtrl = loginCtrl;
const getAllCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findAll({ include: "addresses" });
        if (!user) {
            return res.status(400).send({ message: "user not found" });
        }
        res.status(200).send({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getAllCtrl = getAllCtrl;
const listController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const printUsers = yield (0, user_services_1.listService)(req);
        res.status(200).json({ users: printUsers });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.listController = listController;
const deleteCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_token = yield (0, authUtil_1.validateToken)(req);
        const user = yield user_1.User.destroy({ where: { id: access_token.id } });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Server Error");
    }
});
exports.deleteCtrl = deleteCtrl;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        const value = yield redis_config_1.client.get(refreshToken);
        res.status(200).send({ value });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send({ message: "invalid refreshToken" });
    }
});
exports.refresh = refresh;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const existingUser = yield user_1.User.findOne({ where: { email } });
        if (!existingUser)
            return res.status(403).send({ message: "user not found" });
        const newToken = (0, authUtil_1.createToken)(existingUser);
        yield (0, emailUtil_1.emails)({
            to: req.body.email,
            link: `http://localhost/user/reset-password/${newToken}`,
            message: "token for forgot password",
            subject: "Forgot Password"
        });
        res.status(201).send({ message: "new token genrated successfully", token: newToken });
    }
    catch (error) {
        console.error(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    if (!payload) {
        return res.status(401).send({ message: "invalid token" });
    }
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(401).send({ message: "password and confirm password do not match" });
    }
    const user = yield user_1.User.findOne({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        return res.status(404).send({ message: 'Record not found.' });
    }
    const salt = 10;
    const hashpassword = yield bcryptjs_1.default.hash(password, salt);
    const updatedRecord = yield user.update({ password: hashpassword });
    return res.status(200).send({ updatedRecord });
});
exports.resetPassword = resetPassword;
//lamda genericstype class interface 
//# sourceMappingURL=userController.js.map