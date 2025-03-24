"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const express_1 = __importDefault(require("express"));
require("./config/loadingEnv");
require("./config/dotenv");
require("./db/index");
const auth_1 = __importDefault(require("./routes/auth/auth"));
const middleware_index_1 = __importDefault(require("./middlewares/middleware.index"));
const test_index_1 = __importDefault(require("./routes/test/test.index"));
const owner_index_1 = __importDefault(require("./routes/owner/owner.index"));
const admin_index_1 = __importDefault(require("./routes/admin/admin.index"));
const master_index_1 = __importDefault(require("./routes/master/master.index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let app = (0, express_1.default)();
let port = process.env.PORT || 4000;
exports.version = process.env.VERSION || "v1";
middleware_index_1.default.globalMiddlewares(app);
app.use(`/${exports.version}/auth`, auth_1.default);
app.use(`/${exports.version}/owner`, owner_index_1.default);
app.use(`/${exports.version}/test`, test_index_1.default);
app.use(`/${exports.version}/admin`, admin_index_1.default);
app.use(`/${exports.version}/master`, master_index_1.default);
// intialise uploads  folder 
let uploadDir = path_1.default.join(__dirname, './assets/uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, {
        recursive: true
    });
}
app.listen(port, () => {
    console.log(`server started at ${port} `);
});
