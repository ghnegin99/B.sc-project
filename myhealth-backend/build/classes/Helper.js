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
exports.Helper = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var get_video_duration_1 = require("get-video-duration");
var path_1 = __importDefault(require("path"));
var Range_1 = require("../models/Range");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.generateRandomToken = function () {
        return 345;
    };
    Helper.generateVerificationCode = function () {
        // This method generates a random verification code between 11111 and 99999
        return Math.round(Math.random() * (99999 - 11111) + 11111).toString();
    };
    Helper.calculateBMI = function (userHeight, userWeight) {
        var height = Math.pow(userHeight, 2);
        return Math.round(userWeight / height);
    };
    Helper.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [2 /*return*/, hashedPassword];
                }
            });
        });
    };
    Helper.comparePassword = function (password, saved_password) {
        return __awaiter(this, void 0, void 0, function () {
            var comparePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.compare(password, saved_password)];
                    case 1:
                        comparePassword = _a.sent();
                        return [2 /*return*/, comparePassword];
                }
            });
        });
    };
    Helper.generateJWT = function (user_phone_number, user_id) {
        if (!process.env.JWT_SECRET_KEY)
            throw new Error("کلید احراز یافت نشد");
        return jsonwebtoken_1.default.sign({ user_id: user_id, user_phone_number: user_phone_number }, process.env.JWT_SECRET_KEY);
    };
    Helper.getVideoDuration = function (videoFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var videos_folder, video_src;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videos_folder = path_1.default.join(__dirname, "../public/videos");
                        video_src = videos_folder + "/" + videoFileName;
                        console.log(video_src);
                        return [4 /*yield*/, (0, get_video_duration_1.getVideoDurationInSeconds)(video_src)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Helper.checkUserBmi = function (bmi) {
        return __awaiter(this, void 0, void 0, function () {
            var bmiInt, allBmi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bmiInt = parseFloat(bmi);
                        console.log(bmiInt);
                        return [4 /*yield*/, Range_1.Range.find()];
                    case 1:
                        allBmi = _a.sent();
                        console.log(allBmi);
                        return [2 /*return*/, allBmi.find(function (singleBmi) {
                                if (singleBmi.range_start < bmiInt && singleBmi.range_end > bmiInt) {
                                    return singleBmi;
                                }
                            })];
                }
            });
        });
    };
    return Helper;
}());
exports.Helper = Helper;
