import mongoose, { Schema, Document } from 'mongoose';
import { bcrypt } from 'bcrypt';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    pic: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'user'
  }
);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

interface UserInterface extends Document {
  name: String | undefined;
  email: String | undefined;
  password: String | undefined;
  pic: String;
  isAdmin: Boolean;
}

let UserModel = mongoose.model<UserInterface>('user', UserSchema);

export { UserInterface };

export default UserModel;
