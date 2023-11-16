import { CustomError } from "./custom-error";
export declare class DatabaseConnectionError extends CustomError {
    errors: any;
    statusCode: number;
    reason: string;
    constructor(errors: any);
    serializeErrors(): {
        message: string;
    }[];
}
