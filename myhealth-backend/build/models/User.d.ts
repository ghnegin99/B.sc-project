import mongoose, { Date } from "mongoose";
declare const UserSchema: mongoose.Schema<UserBaseDocument, mongoose.Model<UserBaseDocument, any, any, any>, {}>;
export interface IUser extends Document {
    id: number;
    user_name: string;
    user_family: string;
    user_age: string;
    user_bmi: string;
    user_gender: boolean;
    user_weight: string;
    user_height: string;
    user_email: string;
    user_birthday: string;
    user_phone_number: string;
    user_password: string;
    user_verify_code: string | null;
    user_disease_background: boolean | undefined;
    user_disease_background_description: string;
    user_status: number;
    user_is_verified: boolean | undefined;
    user_is_admin: boolean | undefined;
    user_roll: number;
    user_tokens: {
        token: {};
    }[];
    user_exercise_days: [];
    user_exercise_hours: [];
    user_history: [
        {
            history_type: number;
            history_details: string;
            history_date?: Date;
        }
    ];
}
declare const User: mongoose.Model<UserBaseDocument, {}, {}, {}>;
export interface UserBaseDocument extends IUser, Document {
}
export { User, UserSchema };
