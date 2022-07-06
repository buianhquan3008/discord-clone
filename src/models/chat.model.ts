import mongoose, { Schema, Document } from 'mongoose';

const ChatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message'
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  },
  { timestamps: true, versionKey: false, collection: 'chat' }
);

interface ChatInterface extends Document {
  chatName: String | undefined;
  isGroupChat: String | undefined;
  users: Array<Schema.Types.ObjectId>;
  latestMessage: Schema.Types.ObjectId;
  groupAdmin: Schema.Types.ObjectId;
}

let ChatModel = mongoose.model<ChatInterface>('chat', ChatSchema);

export { ChatInterface };

export default ChatModel;
