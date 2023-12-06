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
exports.listService = exports.registerService = exports.loginService = void 0;
const express_validator_1 = require("express-validator");
const user_js_1 = require("../models/user.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rand_token_1 = __importDefault(require("rand-token"));
const redis_config_1 = require("../config/redis.config");
const authUtil_1 = require("../utils/authUtil");
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield user_js_1.User.findOne({
        where: {
            username,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "username not found" });
    }
    const access_token = (0, authUtil_1.createToken)(user);
    let refreshToken = rand_token_1.default.uid(256);
    yield redis_config_1.client.set(refreshToken, username);
    return { access_token, refreshToken };
});
exports.loginService = loginService;
const registerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            console.error("error in validation");
            return res.status(400).json({ errors: errors.array() });
        }
        const { userName, password, email, firstName, lastName } = req.body;
        const salt = 10;
        const hashpassword = yield bcryptjs_1.default.hash(password, salt);
        yield user_js_1.User.create({
            userName,
            password: hashpassword,
            email,
            firstName,
            lastName,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.registerService = registerService;
const listService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.params.page);
        const startIndex = page * process.env.itemsPerPage - process.env.itemsPerPage;
        const endIndex = page * process.env.itemsPerPage;
        const data = yield user_js_1.User.findAll();
        const printUsers = data.slice(startIndex, endIndex);
        return printUsers;
    }
    catch (error) {
        console.error(error);
    }
});
exports.listService = listService;
//# sourceMappingURL=user.services.js.map