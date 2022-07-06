import mongoose, { Schema, Document } from 'mongoose';

class Session {
  public email: string;
  public expiresAt: Date;

  constructor(email: string, expiresAt: Date) {
      this.email = email;
      this.expiresAt = expiresAt;
  }

  // we'll use this method later to determine if the session has expired
  isExpired() {
    return this.expiresAt < (new Date())
  }
}

const SessionSchema = new Schema(
  {
    token: {
      type: String,
      required: true
    },
    session: {
      type: Object,
      required: true
    },
  },
  { collection: 'sessions' }
);

interface SessionInterface extends Document {
  token: String;
  session: Object;
}

let SessionModel = mongoose.model<SessionInterface>('sessions', SessionSchema);

export { SessionInterface, Session };

export default SessionModel;
