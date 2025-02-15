"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/loadingEnv");
require("./config/dotenv");
require("./db/index");
const auth_1 = __importDefault(require("./routes/auth/auth"));
const middleware_index_1 = __importDefault(require("./middlewares/middleware.index"));
const test_index_1 = __importDefault(require("./routes/test/test.index"));
const owner_index_1 = __importDefault(require("./routes/owner/owner.index"));
let app = (0, express_1.default)();
let port = process.env.PORT || 4000;
let version = process.env.VERSION || "v1";
middleware_index_1.default.globalMiddlewares(app);
app.use(`/${version}/auth`, auth_1.default);
app.use(`/${version}/owner`, owner_index_1.default);
app.use(`/${version}/test`, test_index_1.default);
app.listen(port, () => {
    console.log(`server started at ${port} `);
});
