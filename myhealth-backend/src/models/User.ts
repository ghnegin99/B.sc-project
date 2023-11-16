import mongoose, { Date, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema<UserBaseDocument>(
  {
    id: {
      type: Number,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_family: {
      type: String,
    },
    user_age: {},
    user_weight: {},
    user_height: {},
    user_bmi: {},
    user_email: {},
    user_birthday: {},
    user_phone_number: {},
    user_password: { type: String, required: true, min: 6, max: 20 },
    user_gender: { type: Boolean },
    user_disease_background: { type: Boolean, default: 0 },
    user_disease_background_description: { type: String },
    user_verify_code: { type: String, min: 5, max: 5 },
    user_status: { type: Number, default: 1, required: true },
    user_is_verified: { type: Boolean, default: 0 },
    user_is_admin: { type: Boolean, default: 0 },
    user_roll: { type: Number, default: 1 },
    user_tokens: [{ token: { type: String, required: true } }],
    user_exercise_days: [],
    user_exercise_hours: [],
    user_history: [
      {
        history_type: { type: Number, default: 1 },
        history_details: { type: String },
        history_date: { type: Date, default: new Date() },
      },
    ],
  },
  {
    toJSON: {
      versionKey: false,
      transform: function (doc, ret, options) {
        delete ret.user_password;
        ret.id = ret._id;

        return ret;
      },
    },
  }
);

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
  user_tokens: { token: {} }[];
  user_exercise_days: [];
  user_exercise_hours: [];
  user_history: [
    { history_type: number; history_details: string; history_date?: Date }
  ];
}

UserSchema.methods.GenerateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    process.env.JWT_KEY!
  );

  user.user_tokens = user.user_tokens.concat({ token });

  await user.save();
  return token;
};

const User = mongoose.model<UserBaseDocument>("User", UserSchema);

export interface UserBaseDocument extends IUser, Document {}

export { User, UserSchema };
