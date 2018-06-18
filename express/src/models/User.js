import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, index: true },
    password: { type: String, required: true }
  },
  { timestamp: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('users', schema);
