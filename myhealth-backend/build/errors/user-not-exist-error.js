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
exports.UserNotExistError = void 0;
var custom_error_1 = require("./custom-error");
var UserNotExistError = /** @class */ (function (_super) {
    __extends(UserNotExistError, _super);
    function UserNotExistError(field) {
        var _this = _super.call(this, "User not found") || this;
        _this.field = field;
        _this.statusCode = 404;
        Object.setPrototypeOf(_this, UserNotExistError.prototype);
        return _this;
    }
    UserNotExistError.prototype.serializeErrors = function () {
        return [
            {
                message: "\u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F " + this.field,
            },
        ];
    };
    return UserNotExistError;
}(custom_error_1.CustomError));
exports.UserNotExistError = UserNotExistError;
