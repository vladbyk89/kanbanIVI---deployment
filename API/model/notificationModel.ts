import mongoose, { Schema } from "mongoose";

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
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<Notification>("Notification", NotificationSchema);
