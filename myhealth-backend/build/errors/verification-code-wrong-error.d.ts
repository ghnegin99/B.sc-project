import { CustomError } from "./custom-error";
export declare class VerificationCodeWrongError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
