"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getClaimsFromToken(token) {
    return jsonwebtoken_1.default.decode(token);
}
exports.getClaimsFromToken = getClaimsFromToken;
function createRefreshToken(user) {
    var claims = { id: user._id };
    return jsonwebtoken_1.default.sign(claims, process.env.JWT_KEY, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES,
    });
}
exports.createRefreshToken = createRefreshToken;
function createStandardToken(user) {
    var claims = { id: user._id, username: user.name };
    return jsonwebtoken_1.default.sign(claims, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}
exports.createStandardToken = createStandardToken;
