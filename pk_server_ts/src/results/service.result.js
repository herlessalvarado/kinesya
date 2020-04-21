"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceResult = /** @class */ (function () {
    function ServiceResult() {
        this.success = true;
        this._errors = [];
    }
    ServiceResult.prototype.addError = function (error) {
        this.success = false;
        this._errors.push(error);
    };
    ServiceResult.prototype.addData = function (data) {
        this.data = data;
    };
    ServiceResult.prototype.getErrorMessages = function () {
        return {
            message: this._errors.map(function (error) { return error.message; }),
        };
    };
    return ServiceResult;
}());
exports.ServiceResult = ServiceResult;
