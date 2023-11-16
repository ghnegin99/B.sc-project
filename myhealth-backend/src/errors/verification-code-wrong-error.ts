import { CustomError } from "./custom-error";

export class VerificationCodeWrongError extends CustomError {
  statusCode = 400;

  constructor() {
    super("Not Found!");

    Object.setPrototypeOf(this, VerificationCodeWrongError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "کد فعالسازی وارد شده صحیح نیست",
      },
    ];
  }
}
