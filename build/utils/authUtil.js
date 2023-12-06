var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JWT from 'jsonwebtoken';
export const createToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const token = JWT.sign(payload, process.env.SECRET, { expiresIn: "15m" });
    return token;
};
export const validateToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.get("authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const decoded = JWT.verify(token, process.env.SECRET);
    req.token = decoded;
});
//# sourceMappingURL=authUtil.js.map