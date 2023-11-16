export declare class Ghasedak {
    static sendOTP(user_phone_number: string, otp_code: string): Promise<unknown>;
    static sendText(user_phone_number: string, text_message: string): void;
}
