"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
var custom_error_1 = require("./custom-error");
var AccessDeniedError = /** @class */ (function (_super) {
    __extends(AccessDeniedError, _super);
    function AccessDeniedError() {
        var _this = _super.call(this, "شما دسترسی ندارید") || this;
        _this.statusCode = 401;
        _this.reason = "شما دسترسی ندارید! ";
        Object.setPrototypeOf(_this, AccessDeniedError.prototype);
        return _this;
    }
    AccessDeniedError.prototype.serializeErrors = function () {
        return [
            {
                message: this.reason,
            },
        ];
    };
    return AccessDeniedError;
}(custom_error_1.CustomError));
exports.AccessDeniedError = AccessDeniedError;
