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
const express_1 = require("express");
const validate_json_1 = __importDefault(require("../../utils/validate-json"));
const router = (0, express_1.Router)();
const db_1 = __importDefault(require("../db"));
//Posted by Json from postman  and Extracting elements from Json
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Posted by Json from postman => 
    //     {
    //         "pattern":"addrres.country",
    //         "info":{
    //             "id":1,
    //              "addrres":{
    //                    "country":"Iran",
    //                    "city":"sari"
    //              },
    //              "tags":["sports","water-polo"]
    //         },
    //         "type":"basices"
    //     }
    const { pattern, info } = req.body;
    const result = yield (0, db_1.default)(`EXECUTE [json].GetJsonValue N'${(0, validate_json_1.default)(info)}',N'$.${pattern}'`);
    res.send(result.recordset[0]);
}));
//Well, now, according to the data in json form that we send from postman to Sql, we can process the data and put the age in the tables.
router.post("/Add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productType, jsonContent } = req.body;
    const result = yield (0, db_1.default)(` EXECUTE [json].AddProduct N'${productType}',N'${(0, validate_json_1.default)(jsonContent)}'`);
    res.send(result.recordset);
}));
exports.default = router;
