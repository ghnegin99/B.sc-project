"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var access_denied_error_1 = require("../errors/access-denied-error");
var Admin = function (req, res, next) {
    var user = req.user;
    if (!user.user_is_admin && user.user_roll != 2) {
        throw new access_denied_error_1.AccessDeniedError();
    }
    next();
};
exports.default = Admin;
