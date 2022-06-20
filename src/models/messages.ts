import mongoose, { Schema, Document } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, versionKey: false, collection: 'messages' }
);

interface MessageInterface extends Document {
  sender: Schema.Types.ObjectId;
  content: String | undefined;
  chat: Schema.Types.ObjectId;
  readBy: Array<Schema.Types.ObjectId>;
}

let MessageModel = mongoose.model<MessageInterface>('messages', MessageSchema);

export { MessageInterface };

export default MessageModel;
