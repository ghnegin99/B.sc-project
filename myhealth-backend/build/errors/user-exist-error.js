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
exports.UserExistError = void 0;
var custom_error_1 = require("./custom-error");
var UserExistError = /** @class */ (function (_super) {
    __extends(UserExistError, _super);
    function UserExistError(field) {
        var _this = _super.call(this, "\u06A9\u0627\u0631\u0628\u0631 " + field + " \u0627\u0632 \u0642\u0628\u0644 \u0648\u062C\u0648\u062F \u062F\u0627\u0631\u062F") || this;
        _this.field = field;
        _this.statusCode = 404;
        Object.setPrototypeOf(_this, UserExistError.prototype);
        return _this;
    }
    UserExistError.prototype.serializeErrors = function () {
        return [
            {
                message: "\u06A9\u0627\u0631\u0628\u0631 " + this.field + " \u0627\u0632 \u0642\u0628\u0644 \u0648\u062C\u0648\u062F \u062F\u0627\u0631\u062F",
            },
        ];
    };
    return UserExistError;
}(custom_error_1.CustomError));
exports.UserExistError = UserExistError;
