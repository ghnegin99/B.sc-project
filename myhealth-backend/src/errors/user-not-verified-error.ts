import { CustomError } from "./custom-error";

export class UserNotVerifiedError extends CustomError {
  statusCode = 404;

  constructor(public field: string) {
    super(`کاربر ${field} هنوز فعال نشده است`);

    Object.setPrototypeOf(this, UserNotVerifiedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: `کاربر ${this.field} هنوز فعال نشده است`,
      },
    ];
  }
}
