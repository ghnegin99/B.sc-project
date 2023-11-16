import { CustomError } from "./custom-error";

export class UserNotExistError extends CustomError {
  statusCode = 404;

  constructor(public field: string) {
    super(`User not found`);

    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: `کاربری یافت نشد ${this.field}`,
      },
    ];
  }
}
