"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const json_proj_1 = __importDefault(require("../start/json-value/json-proj"));
const json_query_1 = __importDefault(require("../start/json-query/json-query"));
exports.default = (app) => {
    app.use(express_1.default.json());
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use("/api/jsonValue", json_proj_1.default);
    app.use("/api/jsonQuery", json_query_1.default);
};
