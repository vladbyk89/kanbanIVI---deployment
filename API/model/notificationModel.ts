import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./UserModel";

interface Notification {
  message: string;
  _id: string;
}

export const NotificationSchema: Schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: UserSchema,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<Notification>("Notification", NotificationSchema);
