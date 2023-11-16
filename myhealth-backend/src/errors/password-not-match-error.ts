import { CustomError } from "./custom-error";

export class PasswordNotMatchError extends CustomError {
  statusCode = 400;

  constructor() {
    super("Not Found!");

    Object.setPrototypeOf(this, PasswordNotMatchError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "رمز عبور با تکرار آن مطابقت ندارد",
      },
    ];
  }
}
