import { CustomError } from "./custom-error";

export class AccessDeniedError extends CustomError {
  statusCode = 401;
  reason = "شما دسترسی ندارید! ";
  constructor() {
    super("شما دسترسی ندارید");

    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
