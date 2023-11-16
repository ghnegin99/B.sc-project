"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ghasedak = void 0;
var request_1 = __importDefault(require("request"));
if (!process.env.GHASEDAK_OTP_TEMPLATE)
    throw new Error("قالب سرویس اعتبار سنجی یافت نشد");
if (!process.env.GHASEDAK_API_KEY)
    throw new Error("کلید دسترسی قاصدک یافت نشد");
var Ghasedak = /** @class */ (function () {
    function Ghasedak() {
    }
    //FIXME: change api and uri location to environment
    Ghasedak.sendOTP = function (user_phone_number, otp_code) {
        var options = {
            method: "POST",
            url: "https://api.ghasedak.me/v2/verification/send/simple",
            agentOptions: {
                rejectUnauthorized: false,
            },
            headers: {
                "cache-control": "no-cache",
                apikey: "00c29ec6a88a3a48e7f33c8334b92290a5754374c109ec4ae97aa795baafa855",
                "content-type": "application/x-www-form-urlencoded",
            },
            form: {
                receptor: user_phone_number,
                template: "MyHealth",
                type: 1,
                param1: otp_code,
            },
        };
        return new Promise(function (resolve, reject) {
            (0, request_1.default)(options, function (error, response, data) {
                if (error)
                    reject(error);
                resolve(data);
            });
        });
    };
    Ghasedak.sendText = function (user_phone_number, text_message) { };
    return Ghasedak;
}());
exports.Ghasedak = Ghasedak;
