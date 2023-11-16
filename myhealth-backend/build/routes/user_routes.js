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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../controllers/UserController");
var user_exist_error_1 = require("../errors/user-exist-error");
var password_not_match_error_1 = require("../errors/password-not-match-error");
var User_1 = require("../models/User");
var express_validator_1 = require("express-validator");
var Validation_1 = __importDefault(require("../middlewares/Validation"));
var Auth_1 = __importDefault(require("../middlewares/Auth"));
var complete_profile_error_1 = require("../errors/complete-profile-error");
var Admin_1 = __importDefault(require("../middlewares/Admin"));
var Helper_1 = require("../classes/Helper");
var router = express_1.default.Router();
// Register
router.post("/register", [
    (0, express_validator_1.body)("name", "وارد کردن نام کاربر الزامی است")
        .isString()
        .isLength({ min: 3 })
        .notEmpty()
        .withMessage("خطا در نام"),
    (0, express_validator_1.body)("family", "وارد کردن نام خانوادگی کاربر الزامی است")
        .isString()
        .notEmpty()
        .withMessage("خطا در نام خانوادگی"),
    (0, express_validator_1.body)("phone_number", "وارد کردن شماره موبایل کاربر الزامی است")
        .isString()
        .isLength({ min: 11 })
        .withMessage("شماره تلفن همراه باید ۱۱ رقم باشد")
        .notEmpty()
        .withMessage("خطا در شماره تلفن همراه")
        .custom(function (value) {
        return User_1.User.findOne({ user_phone_number: value }).then(function (user) {
            if (user)
                throw new user_exist_error_1.UserExistError(value);
        });
    }),
    (0, express_validator_1.check)("email").isEmail().withMessage("ایمیل وارد شده اشتباه است"),
], Validation_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userExist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.password !== req.body.confirm_password)
                    throw new password_not_match_error_1.PasswordNotMatchError();
                return [4 /*yield*/, User_1.User.findOne({
                        user_phone_number: req.body.phone_number,
                    })];
            case 1:
                userExist = _a.sent();
                if (userExist)
                    throw new user_exist_error_1.UserExistError(userExist.user_phone_number);
                return [4 /*yield*/, UserController_1.UserController.registerUserStepOne(req.body, req, res)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Login
router.post("/login", [(0, express_validator_1.body)("user_name"), (0, express_validator_1.body)("password")], Validation_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                return [4 /*yield*/, UserController_1.UserController.loginUser(req.body, req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Complete profile
router.post("/complete", [], Validation_1.default, Auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                // FIXME: Define a middleware that check complete profile
                if (user.user_status == 2)
                    throw new complete_profile_error_1.CompleteProfileError();
                return [4 /*yield*/, UserController_1.UserController.completeUserProfile(req.body, req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/all", [Auth_1.default, Admin_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.getAllUsers(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/me", [Auth_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, range;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.findOne({
                    user_phone_number: req.user.user_phone_number,
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("کاربری یافت نشد");
                return [4 /*yield*/, Helper_1.Helper.checkUserBmi(user.user_bmi)];
            case 2:
                range = _a.sent();
                res.send({
                    message: "گاربر دریافت شد",
                    result: {
                        user: user,
                        range: range
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/change/password', [
    (0, express_validator_1.body)('old_password').isString().notEmpty().withMessage('وارد کردن رمز عبور قدیمی الزامی است'),
    (0, express_validator_1.body)('new_password').isString().notEmpty().withMessage('وارد کردن رمز عبور جدید الزامی است'),
    (0, express_validator_1.body)('new_password_confirm').isString().notEmpty().withMessage('وارد کردن تکرار رمز عبور جدید الزامی است'),
], Validation_1.default, [Auth_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.changePassword(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post("/bmi", [Auth_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.changeBmi(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/bmi', [Auth_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.getBmiInformation(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/:userId", [Auth_1.default, Admin_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.getUserDetails(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/calculate/bmi', [Auth_1.default], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserController_1.UserController.calculateBmi(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
