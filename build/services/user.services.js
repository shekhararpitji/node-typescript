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
const { validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const randtoken = require("rand-token");
const { client } = require("../config/redis.config");
const { createToken } = require("../utils/authUtil");
exports.loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield User.findOne({
        where: {
            username,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "username not found" });
    }
    const access_token = createToken(user);
    let refreshToken = randtoken.uid(256);
    yield client.set(refreshToken, username);
    return { access_token, refreshToken };
});
exports.registerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            console.error("error in validation");
            return res.status(400).json({ errors: errors.array() });
        }
        const { userName, password, email, firstName, lastName } = req.body;
        const salt = 10;
        const hashpassword = yield bcrypt.hash(password, salt);
        yield User.create({
            userName,
            password: hashpassword,
            email,
            firstName,
            lastName,
        });
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.listService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.params.page);
        const startIndex = page * process.env.itemsPerPage - process.env.itemsPerPage;
        const endIndex = page * process.env.itemsPerPage;
        const data = yield User.findAll();
        const printUsers = data.slice(startIndex, endIndex);
        return printUsers;
    }
    catch (error) {
        console.error(error.message);
    }
});
