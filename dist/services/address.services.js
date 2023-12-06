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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.addressListService = exports.addressService = void 0;
const user_1 = require("../models/user");
const address_1 = require("../models/address");
const sequelize_1 = require("sequelize");
const authUtil_1 = require("../utils/authUtil");
const addressService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = yield (0, authUtil_1.validateToken)(req);
        const user = yield user_1.User.findOne({
            where: {
                email,
            },
        });
        const { address, state, pin_code, phone_no, } = req.body;
        const Creator = address_1.Address.belongsTo(user_1.User, { as: "addresses" });
        const newAddress = yield address_1.Address.create({
            userId: user.id,
            address,
            state,
            pin_code,
            phone_no,
        }, {
            include: [Creator],
        });
        return newAddress;
    }
    catch (error) {
        console.error(error);
    }
});
exports.addressService = addressService;
const addressListService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const address = yield user_1.User.findAll({
        where: { id: userId },
        include: address_1.Address,
    });
    return address;
});
exports.addressListService = addressListService;
const deleteAddressService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const addressIds = req.body.addressIds;
    if (!addressIds || !Array.isArray(addressIds)) {
        return res.status(400).json({ error: "Invalid request format" });
    }
    yield address_1.Address.destroy({
        where: {
            id: {
                [sequelize_1.Op.in]: addressIds,
            },
        },
    });
});
exports.deleteAddressService = deleteAddressService;
//# sourceMappingURL=address.services.js.map