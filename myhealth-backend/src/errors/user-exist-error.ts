import { CustomError } from "./custom-error";

export class UserExistError extends CustomError {
  statusCode = 404;

  constructor(public field: string) {
    super(`کاربر ${field} از قبل وجود دارد`);

    Object.setPrototypeOf(this, UserExistError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: `کاربر ${this.field} از قبل وجود دارد`,
      },
    ];
  }
}
