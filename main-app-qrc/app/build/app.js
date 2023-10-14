"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QrcodeService_1 = require("./Services/QrcodeService");
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt_utils_1 = require("./MiddleWare/jwt-utils");
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors(corsOptions));
app.post('/pushQrcode', (0, jwt_utils_1.verifyJwt)("User"), (req, res) => {
    try {
        (0, QrcodeService_1.pushQrcode)(req.body);
        res.status(200).send('Ok');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
app.listen(port, () => {
    console.log(`connecter parfaitement au port ${port}`);
});
