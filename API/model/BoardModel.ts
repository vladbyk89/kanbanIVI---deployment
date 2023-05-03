import mongoose, { Schema } from "mongoose";

export interface BoardInterface {
  boardName: string;
  _id: string;
}

export const BoardSchema: Schema = new Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    userArray: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
    listArray: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<Board>("Board", BoardSchema);
