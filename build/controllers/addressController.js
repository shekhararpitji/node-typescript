var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addressService, deleteAddressService, addressListService, } from "../services/address.services.js";
exports.addressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield addressService(req);
        res.status(200).json({ message: "Address saved", data: address });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Invalid Address");
    }
});
exports.addressListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield addressListService(req);
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
exports.deleteAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteAddressService(req);
        res.json({ message: "Addresses deleted successfully" });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server Error" });
    }
});
