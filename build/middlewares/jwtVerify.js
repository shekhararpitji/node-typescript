var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateToken } from "../utils/authUtil";
export const authMiddle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield validateToken(req);
        if (typeof decoded !== 'string' && decoded.id) {
            return decoded;
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
});
//# sourceMappingURL=jwtVerify.js.map