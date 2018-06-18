import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return { username: this.username, token: this.generateJWT() };
};

export default mongoose.model('users', schema);
