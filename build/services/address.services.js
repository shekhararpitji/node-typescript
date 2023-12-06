var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../models/user";
import { Address } from "../models/address";
import { Op } from "sequelize";
import { validateToken } from "../utils/authUtil";
export const addressService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = yield validateToken(req);
        const user = yield User.findOne({
            where: {
                email,
            },
        });
        const { address, state, pin_code, phone_no, } = req.body;
        const Creator = Address.belongsTo(User, { as: "addresses" });
        const newAddress = yield Address.create({
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
export const addressListService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const address = yield User.findAll({
        where: { id: userId },
        include: Address,
    });
    return address;
});
export const deleteAddressService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const addressIds = req.body.addressIds;
    if (!addressIds || !Array.isArray(addressIds)) {
        return res.status(400).json({ error: "Invalid request format" });
    }
    yield Address.destroy({
        where: {
            id: {
                [Op.in]: addressIds,
            },
        },
    });
});
//# sourceMappingURL=address.services.js.map