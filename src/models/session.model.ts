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
      this.expiresAt < (new Date())
  }
}

const SessionSchema = new Schema(
  {
    sessionToken: {
      type: Object,
      required: true
    },
  },
  { collection: 'sessions' }
);

interface SessionInterface extends Document {

}

let SessionModel = mongoose.model<SessionInterface>('sessions', SessionSchema);

export { SessionInterface, Session };

export default SessionModel;
