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
const JWT = require("jsonwebtoken");
const createToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const token = JWT.sign(payload, process.env.SECRET, { expiresIn: "15m" });
    return token;
};
const validateToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("authorization").split(" ")[1];
    const payload = JWT.verify(token, process.env.SECRET);
    return payload;
});
module.exports = {
    createToken,
    validateToken,
};
