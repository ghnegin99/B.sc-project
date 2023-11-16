import { CustomError } from "./custom-error";
export declare class UserExistError extends CustomError {
    field: string;
    statusCode: number;
    constructor(field: string);
    serializeErrors(): {
        message: string;
        field?: string | undefined;
    }[];
}
