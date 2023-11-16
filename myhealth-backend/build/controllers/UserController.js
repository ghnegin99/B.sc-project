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
exports.UserController = void 0;
var User_1 = require("../models/User");
var BaseController_1 = require("./BaseController");
var Helper_1 = require("../classes/Helper");
var Ghasedak_1 = require("../classes/Ghasedak");
var user_not_exist_error_1 = require("../errors/user-not-exist-error");
var user_not_verified_error_1 = require("../errors/user-not-verified-error");
var password_wrong_error_1 = require("../errors/password-wrong-error");
if (!process.env.APP_SLOGAN && !process.env.APP_NAME_FA) {
    throw new Error("نام فارسی اپلیکیشن و شعار برنامه تعریف نشده است");
}
if (!process.env.JWT_SECRET_KEY)
    throw new Error('کلید رمز نگاری تعریف نشده است');
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.registerUserStepOne = function (body, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, family, phone_number, password, email, gender, birthday, hashedPassword, user, verificationCode, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = body.name, family = body.family, phone_number = body.phone_number, password = body.password, email = body.email, gender = body.gender, birthday = body.birthday;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Helper_1.Helper.hashPassword(password)];
                    case 2:
                        hashedPassword = _a.sent();
                        user = new User_1.User({
                            user_name: name,
                            user_family: family,
                            user_phone_number: phone_number,
                            user_password: hashedPassword,
                            user_email: email,
                            user_gender: gender,
                            user_birthday: birthday,
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        user = _a.sent();
                        verificationCode = Helper_1.Helper.generateVerificationCode();
                        return [4 /*yield*/, Ghasedak_1.Ghasedak.sendOTP(user.user_phone_number, verificationCode)];
                    case 4:
                        result = _a.sent();
                        console.log(result);
                        // Save verification code to db
                        user.user_verify_code = verificationCode;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        // Assign expiration for verification code
                        return [2 /*return*/, res.json({
                                message: "ثبت نام با موفقیت انجام شد",
                                result: result,
                                data: user,
                            })];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error(err_1.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.loginUser = function (body, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_name, password, field, userExist, comparedPassword, verificationCode, result, token;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_name = body.user_name, password = body.password;
                        field = body.user_name.includes("@")
                            ? "user_email"
                            : "user_phone_number";
                        return [4 /*yield*/, User_1.User.findOne((_a = {}, _a[field] = user_name, _a))];
                    case 1:
                        userExist = _b.sent();
                        if (!userExist)
                            throw new user_not_exist_error_1.UserNotExistError(user_name);
                        return [4 /*yield*/, Helper_1.Helper.comparePassword(password, userExist.user_password)];
                    case 2:
                        comparedPassword = _b.sent();
                        if (!comparedPassword)
                            throw new password_wrong_error_1.PasswordWrongError();
                        if (!(!userExist.user_is_verified && userExist.user_verify_code != null)) return [3 /*break*/, 5];
                        verificationCode = Helper_1.Helper.generateVerificationCode();
                        return [4 /*yield*/, Ghasedak_1.Ghasedak.sendOTP(userExist.user_phone_number, verificationCode)];
                    case 3:
                        result = _b.sent();
                        // Step1-3: Save verification code to user document for verify
                        userExist.user_verify_code = verificationCode;
                        return [4 /*yield*/, userExist.save()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.send({
                                message: "حساب شما هنوز فعال نشده است، کد فعالسازی برای شما ارسال شد",
                                result: {
                                    user_phone_number: userExist.user_phone_number,
                                },
                            })];
                    case 5:
                        token = Helper_1.Helper.generateJWT(userExist.user_phone_number, userExist._id);
                        res.setHeader("auth-token", token);
                        res.send({
                            message: "ورود موفقیت آمیز",
                            result: {
                                auth_token: token,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.completeUserProfile = function (body, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var exercise_days, exercise_hours, age, weight, height, disease_background, disease_background_description, user, heightMeter, heightCm, newHeight, calculatedBmi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exercise_days = body.exercise_days, exercise_hours = body.exercise_hours, age = body.age, weight = body.weight, height = body.height, disease_background = body.disease_background, disease_background_description = body.disease_background_description;
                        return [4 /*yield*/, User_1.User.findOne({
                                user_phone_number: req.user.user_phone_number,
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new user_not_exist_error_1.UserNotExistError(body.phone_number);
                        if (!user.user_is_verified && user.user_status == 1)
                            throw new user_not_verified_error_1.UserNotVerifiedError(body.phone_number);
                        // Step2: Complete user inforamtion due to above info
                        user.user_age = age;
                        user.user_height = height;
                        user.user_weight = weight;
                        user.user_disease_background = disease_background;
                        user.user_disease_background_description = disease_background_description;
                        exercise_days.length > 0
                            ? exercise_days.forEach(function (exe_day) {
                                user.user_exercise_days.push(exe_day);
                            })
                            : (user.user_exercise_days = []);
                        exercise_hours.length > 0
                            ? exercise_hours.forEach(function (exe_hour) {
                                user.user_exercise_hours.push(exe_hour);
                            })
                            : (user.user_exercise_hours = []);
                        // Step3: Change user_status to completed
                        user.user_status = 2;
                        heightMeter = height.toString().slice(0, 1);
                        heightCm = height.toString().slice(1);
                        newHeight = heightMeter + "." + heightCm;
                        calculatedBmi = Helper_1.Helper.calculateBMI(parseFloat(newHeight), parseFloat(weight));
                        user.user_bmi = calculatedBmi.toString();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        // FIXME: Send BMI SMS to user
                        // Step4: Send message to user (Welcome)
                        // const text = `
                        // ${user.user_name} عزیز
                        // شاخص توده بدنی شما: ${calculatedBmi}
                        // ${process.env.APP_NAME_FA} |‌ ${process.env.APP_SLOGAN}`;
                        // Ghasedak.sendText(user.user_phone_number, text);
                        res.send({
                            message: "اطلاعات فردی شما با موفقیت ثبت شد",
                            result: {
                                user_full_name: user.user_name + " " + user.user_family,
                                user_phone_number: user.user_phone_number,
                                calculated_bmi: calculatedBmi,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.User.find()];
                    case 1:
                        users = _a.sent();
                        res.send({
                            message: "تمامی کاربران دریافت شد",
                            result: {
                                users: users,
                            },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error(err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getUserDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User_1.User.findById(userId)];
                    case 2:
                        user = _a.sent();
                        res.send({
                            message: "کاربر دریافت شد",
                            result: {
                                user: user,
                            },
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error(err_3.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.changeBmi = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, weight, user, heightMeter, heightCm, newHeight, calculatedBmi;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, height = _a.height, weight = _a.weight;
                        return [4 /*yield*/, User_1.User.findOne({
                                user_phone_number: req.user.user_phone_number,
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw new Error("کاربری جهت تغییر شاخص یافت نشد");
                        heightMeter = height.toString().slice(0, 1);
                        heightCm = height.toString().slice(1);
                        newHeight = heightMeter + "." + heightCm;
                        calculatedBmi = Helper_1.Helper.calculateBMI(parseFloat(newHeight), parseFloat(weight));
                        user.user_height = newHeight.toString();
                        user.user_weight = weight;
                        user.user_bmi = calculatedBmi.toString();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _b.sent();
                        res.send({
                            message: "شاخص شما با موفقیت محاسبه و تغییر کرد",
                            result: {
                                user: user,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.changePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var phone_number, _a, old_password, new_password, new_password_confirm, user, compared, hashedPassword, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        phone_number = req.user.user_phone_number;
                        _a = req.body, old_password = _a.old_password, new_password = _a.new_password, new_password_confirm = _a.new_password_confirm;
                        if (new_password !== new_password_confirm)
                            throw new Error('رمز عبور جدید با تکرار آن یکسان نیست');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, User_1.User.findOne({ user_phone_number: phone_number })];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            throw new user_not_exist_error_1.UserNotExistError(phone_number);
                        return [4 /*yield*/, Helper_1.Helper.comparePassword(old_password, user.user_password)];
                    case 3:
                        compared = _b.sent();
                        if (!compared)
                            throw new Error('رمز عبور قدیمی وارد شده صحیح نیست');
                        return [4 /*yield*/, Helper_1.Helper.hashPassword(new_password)];
                    case 4:
                        hashedPassword = _b.sent();
                        // Replace new hashed password with old password
                        user.user_password = hashedPassword;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        res.send({
                            message: 'رمز عبور جدید با موفقیت اعمال شد',
                            result: {}
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        err_4 = _b.sent();
                        throw new Error(err_4.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getBmiInformation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqUser, userRange, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqUser = req.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Helper_1.Helper.checkUserBmi(reqUser.user_bmi)];
                    case 2:
                        userRange = _a.sent();
                        res.send({
                            message: 'اطلاعات دریافت شد',
                            result: {
                                range: userRange
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error(err_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.calculateBmi = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, height, weight, heightMeter, heightCm, newHeight, calculatedBmi, range;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, height = _a.height, weight = _a.weight;
                        heightMeter = height.toString().slice(0, 1);
                        heightCm = height.toString().slice(1);
                        newHeight = heightMeter + "." + heightCm;
                        calculatedBmi = Helper_1.Helper.calculateBMI(parseFloat(newHeight), parseFloat(weight));
                        return [4 /*yield*/, Helper_1.Helper.checkUserBmi(calculatedBmi.toString())];
                    case 1:
                        range = _b.sent();
                        res.send({ message: 'شاخص محاسبه شد', result: {
                                bmi: calculatedBmi,
                                range: range
                            } });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}(BaseController_1.BaseController));
exports.UserController = UserController;
