import { CustomError } from "./custom-error";

export class PasswordWrongError extends CustomError {
  statusCode = 400;

  constructor() {
    super("رمز عبور وارد شده صحیح نیست");

    Object.setPrototypeOf(this, PasswordWrongError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "رمز عبور وارد شده صحیح نیست",
      },
    ];
  }
}
