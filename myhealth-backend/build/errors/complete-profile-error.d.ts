import { CustomError } from "./custom-error";
export declare class CompleteProfileError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
