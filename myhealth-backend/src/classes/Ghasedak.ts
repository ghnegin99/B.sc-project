import request from "request";

if (!process.env.GHASEDAK_OTP_TEMPLATE)
  throw new Error("قالب سرویس اعتبار سنجی یافت نشد");

if (!process.env.GHASEDAK_API_KEY)
  throw new Error("کلید دسترسی قاصدک یافت نشد");

export class Ghasedak {
  //FIXME: change api and uri location to environment
  static sendOTP(user_phone_number: string, otp_code: string) {
    var options = {
      method: "POST", 
      url: "https://api.ghasedak.me/v2/verification/send/simple",
      agentOptions: {
        rejectUnauthorized: false,
      },
      headers: {
        "cache-control": "no-cache",
        apikey:
          "00c29ec6a88a3a48e7f33c8334b92290a5754374c109ec4ae97aa795baafa855",
        "content-type": "application/x-www-form-urlencoded",
      },

      form: {
        receptor: user_phone_number,
        template: "MyHealth",
        type: 1,
        param1: otp_code,
      },
    };

    return new Promise((resolve, reject) => {
      request(options, function (error: any, response: any, data: any) {
        if (error) reject(error);

        resolve(data);
      });
    });
  }

  static sendText(user_phone_number: string, text_message: string) {}
}
