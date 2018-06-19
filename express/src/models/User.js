import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    password: { type: String, required: true },
    confirmed: { type: Boolean, default: false }
  },
  { timestamp: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET);
};

schema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: 'this email is already taken' });

export default mongoose.model('users', schema);
