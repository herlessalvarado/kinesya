"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.PhotosFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
exports.upload = multer_1.default({ storage: storage, fileFilter: fileFilter }).fields([{ name: 'profile', maxCount: 1 }, { name: 'references', maxCount: 4 }]);
