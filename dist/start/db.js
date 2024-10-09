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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySqlData = void 0;
const msnodesqlv8_1 = __importDefault(require("mssql/msnodesqlv8"));
require("dotenv-safe/config");
const config = {
    database: process.env.DATABASE || "",
    server: process.env.SERVER || "",
    options: {
        trustedConnection: true
    }
};
const mySqlData = (sqlLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield msnodesqlv8_1.default.connect(config);
        let result = yield pool.request().query(sqlLink);
        yield pool.close();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.mySqlData = mySqlData;
exports.default = exports.mySqlData;
