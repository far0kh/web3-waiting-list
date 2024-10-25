// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  twitter: {
    type: String,
  },
  invited_by: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
