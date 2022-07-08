// import { string } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

class Session {
  public email: string;
  public expiresAt: Date;
  public isExpired: boolean;

  constructor(email: string, expiresAt: Date) {
    this.email = email;
    this.expiresAt = expiresAt;
    this.isExpired = this.expiresAt < (new Date()); 
  }

  // we'll use this method later to determine if the session has expired
  // isExpired() {
  //   return this.expiresAt < (new Date())
  // }
}

const SessionSchema = new Schema(
  {
    token: {
      type: String,
      required: true
    },
    session: {
      email: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
      // isExpired: {
      //   type: Boolean,
      // }
    },
  },
  { collection: 'sessions' }
);

interface SessionInterface extends Document {
  token: String;
  session: {
    email: String,
    expiresAt: Date,
    // isExpired: String,
  };
}

let SessionModel = mongoose.model<SessionInterface>('sessions', SessionSchema);

export { SessionInterface, Session };

export default SessionModel;
