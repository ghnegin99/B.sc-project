import { CustomError } from "./custom-error";
export declare class UserNotExistError extends CustomError {
    field: string;
    statusCode: number;
    constructor(field: string);
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
