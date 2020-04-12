"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db_connection_1 = __importDefault(require("./database/db.connection"));
var user_controller_1 = require("./controllers/user.controller");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv.config();
var PORT = process.env.PORT;
var connectionString = process.env.connectionString;
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static(process.env.PhotosFolder));
app.use(cors_1.default({ origin: process.env.APP_WEB_DOMAIN, credentials: true }));
app.use(user_controller_1.UserRouter);
var mongo = new db_connection_1.default(connectionString);
mongo.connect();
app.listen(PORT, function () {
    console.log("Running on " + PORT);
});
