import { CustomError } from "./custom-error";
export declare class UserNotVerifiedError extends CustomError {
    field: string;
    statusCode: number;
    constructor(field: string);
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
