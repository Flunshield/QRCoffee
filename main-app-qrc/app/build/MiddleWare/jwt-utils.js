"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constanteKeys_1 = require("../Constante/constanteKeys");
function verifyJwt(role) {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const publicKey = '-----BEGIN PUBLIC KEY-----\n' + constanteKeys_1.PUBLIC_KEY_KEYCLOAK + '-----END PUBLIC KEY-----';
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, publicKey);
                if (!decodedToken.realm_access.roles.includes(role)) {
                    return res.status(401).json({ error: 'Invalid role' });
                }
                req.decodedToken = decodedToken;
                next();
            }
            catch (error) {
                res.status(401).json({ error: 'Invalid token' });
            }
        }
        else {
            res.status(401).json({ message: 'Authorization header is missing' });
        }
    };
}
exports.verifyJwt = verifyJwt;
