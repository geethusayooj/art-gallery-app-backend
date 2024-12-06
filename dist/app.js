"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const config_1 = __importDefault(require("./config"));
(0, config_1.default)(app);
// 👇 Start handling routes here
const index_routes_1 = __importDefault(require("../src/routes/index.routes"));
app.use("/api", index_routes_1.default);
// Add artwork routes
const artwork_routes_1 = __importDefault(require("./routes/artwork.routes"));
app.use("/api", artwork_routes_1.default);
// Add artist routes
const artist_routes_1 = __importDefault(require("./routes/artist.routes"));
app.use("/api", artist_routes_1.default);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const index_1 = __importDefault(require("../src/error-handling/index"));
(0, index_1.default)(app);
exports.default = app;
