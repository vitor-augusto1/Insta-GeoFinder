"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
class App {
    express;
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.set("views", path_1.default.join(__dirname, "views"));
        this.express.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
    }
    routes() {
        this.express.use(routes_1.default);
    }
}
exports.default = new App().express;
