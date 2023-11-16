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
exports.UserNotVerifiedError = void 0;
var custom_error_1 = require("./custom-error");
var UserNotVerifiedError = /** @class */ (function (_super) {
    __extends(UserNotVerifiedError, _super);
    function UserNotVerifiedError(field) {
        var _this = _super.call(this, "\u06A9\u0627\u0631\u0628\u0631 " + field + " \u0647\u0646\u0648\u0632 \u0641\u0639\u0627\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A") || this;
        _this.field = field;
        _this.statusCode = 404;
        Object.setPrototypeOf(_this, UserNotVerifiedError.prototype);
        return _this;
    }
    UserNotVerifiedError.prototype.serializeErrors = function () {
        return [
            {
                message: "\u06A9\u0627\u0631\u0628\u0631 " + this.field + " \u0647\u0646\u0648\u0632 \u0641\u0639\u0627\u0644 \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
            },
        ];
    };
    return UserNotVerifiedError;
}(custom_error_1.CustomError));
exports.UserNotVerifiedError = UserNotVerifiedError;
