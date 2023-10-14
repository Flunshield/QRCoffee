"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_PATH = void 0;
// Route Mongo
exports.MONGO_PATH = 'mongodb://' + process.env.DB_ROOT_USERNAME + ':' + process.env.DB_ROOT_PASSWORD + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORTS;
