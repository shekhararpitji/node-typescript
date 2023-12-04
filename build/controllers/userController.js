var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loginService, registerService, listService, } from "../services/user.services.js";
import { client } from "../config/redis.config.js";
import { User } from "../models.js";
import { validateToken, createToken } from "../utils/authUtil.js";
import { emails } from "../utils/emailUtil.js";
exports.registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield registerService(req, res);
        yield emails({
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
exports.loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refreshToken } = yield loginService(req, res);
        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true });
        res.status(200).json({ jwt: access_token, refreshToken: refreshToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.getAllCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findAll({ include: "addresses" });
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
exports.listController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const printUsers = yield listService(req);
        res.status(200).json({ users: printUsers });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
exports.deleteCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_token = yield validateToken(req);
        const user = yield User.destroy({ where: { id: access_token.id } });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Server Error");
    }
});
exports.refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        const value = yield client.get(refreshToken);
        res.status(200).send({ value });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send({ message: "invalid refreshToken" });
    }
});
exports.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const existingUser = yield User.findOne({ where: { email } });
        if (!existingUser)
            return res.status(403).send({ message: "user not found" });
        const newToken = createToken(existingUser);
        yield emails({
            to: req.body.email,
            link: `http://localhost/user/reset-password/${newToken}`,
            message: "token for forgot password",
            subject: "Forgot Password"
        });
        res.status(201).send({ message: "new token genrated successfully", token: newToken });
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    const payload = yield JWT.verify(token, process.env.SECRET);
    if (!payload) {
        return res.status(401).send({ message: "invalid token" });
    }
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(401).send({ message: "password and confirm password do not match" });
    }
    const user = yield User.findOne({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        return res.status(404).send({ message: 'Record not found.' });
    }
    const salt = 10;
    const hashpassword = yield bcrypt.hash(password, salt);
    const updatedRecord = yield user.update({ password: hashpassword });
    return res.status(200).send({ updatedRecord });
});
//lamda genericstype class interface 
