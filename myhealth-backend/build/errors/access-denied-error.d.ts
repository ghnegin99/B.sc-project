import { CustomError } from "./custom-error";
export declare class AccessDeniedError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
