import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor(public errors: any) {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
