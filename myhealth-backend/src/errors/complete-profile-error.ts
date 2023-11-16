import { CustomError } from "./custom-error";

export class CompleteProfileError extends CustomError {
  statusCode = 500;
  reason = "اطلاعات فردی شما قبلا وارد شده است. به صفحه اصلی مراجعه کنید";
  constructor() {
    super("اطلاعات فردی شما قبلا وارد شده است. به صفحه اصلی مراجعه کنید");

    Object.setPrototypeOf(this, CompleteProfileError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
