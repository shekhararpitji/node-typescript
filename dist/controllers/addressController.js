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
exports.deleteAddressController = exports.addressListController = exports.addressController = void 0;
const address_services_1 = require("../services/address.services");
const addressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield (0, address_services_1.addressService)(req);
        res.status(200).json({ message: "Address saved", data: address });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Invalid Address");
    }
});
exports.addressController = addressController;
const addressListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield (0, address_services_1.addressListService)(req);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ address });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
});
exports.addressListController = addressListController;
const deleteAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, address_services_1.deleteAddressService)(req);
        res.json({ message: "Addresses deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteAddressController = deleteAddressController;
//# sourceMappingURL=addressController.js.map