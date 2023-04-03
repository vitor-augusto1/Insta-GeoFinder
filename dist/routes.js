"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const instagramPlacesController_1 = __importDefault(require("./controllers/instagramPlacesController"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get("/", (request, response) => {
    response.sendFile(path_1.default.join(__dirname, 'views/index.html'));
});
routes.get("/api/v1/place-information", async (request, response) => {
    await instagramPlacesController_1.default.returnMediaByPlaceID(request, response);
});
exports.default = routes;
