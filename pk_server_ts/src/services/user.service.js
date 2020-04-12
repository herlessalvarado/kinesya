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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_repository_1 = require("../repository/user.repository");
var service_result_1 = require("../results/service.result");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.uploadPhotos = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = req.files;
                        if (!!files.references) {
                            req.body.user.referencePhotos = files.references.map(function (photo) { return photo.filename; });
                        }
                        if (!!files.profile) {
                            req.body.user.profilePhoto = files.profile[0].filename;
                        }
                        return [4 /*yield*/, req.body.user.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.mapReqbodyToUser = function (user, req) {
        user.name = req.body.name;
        user.age = req.body.age;
        user.isPublic = true;
        user.price = req.body.price;
        user.description = req.body.description;
        user.longitude = req.body.longitude;
        user.latitude = req.body.latitude;
        user.phone = req.body.phone;
    };
    UserService.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult, user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceResult = new service_result_1.ServiceResult();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        user = new user_repository_1.User(req.body);
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, user.generateAuthToken()];
                    case 3:
                        token = _a.sent();
                        res.cookie('key', token, { httpOnly: true });
                        serviceResult.addData("The user has been created");
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        serviceResult.addError(error_1);
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, serviceResult];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.logIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult, user, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceResult = new service_result_1.ServiceResult();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        user = req.body.user;
                        return [4 /*yield*/, user.generateAuthToken()];
                    case 2:
                        token = _a.sent();
                        res.cookie('key', token, { httpOnly: true });
                        serviceResult.addData({ message: "The user has been logged successfully" });
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        serviceResult.addError(error_2);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, serviceResult];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.getUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult;
            return __generator(this, function (_a) {
                serviceResult = new service_result_1.ServiceResult();
                try {
                    serviceResult.addData(user);
                }
                catch (error) {
                    serviceResult.addError(error);
                }
                finally {
                    return [2 /*return*/, serviceResult];
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult, users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceResult = new service_result_1.ServiceResult();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, user_repository_1.User.find({ isPublic: true })];
                    case 2:
                        users = _a.sent();
                        serviceResult.addData(users);
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        serviceResult.addError(error_3);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, serviceResult];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.updateUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, serviceResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body.user;
                        serviceResult = new service_result_1.ServiceResult();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.mapReqbodyToUser(user, req);
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        if (!!req.files)
                            this.uploadPhotos(req);
                        serviceResult.addData({ message: "User updated" });
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        serviceResult.addError(error_4);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, serviceResult];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.logOut = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceResult = new service_result_1.ServiceResult();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        req.body.user.tokens.splice(0, req.body.user.tokens.length);
                        return [4 /*yield*/, req.body.user.save()];
                    case 2:
                        _a.sent();
                        serviceResult.addData({ message: "The user has been logout" });
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        serviceResult.addError(error_5);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, serviceResult];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
;
