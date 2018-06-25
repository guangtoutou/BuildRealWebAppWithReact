import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from './models/User';
import api from './api';
import parseErrors from './utils/parseError';
import { sendConfirmationEmail, sendResetPasswordEmail } from './mailer';

dotenv.config();
const app = express();
app.use(cors());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false
  })
);

app.post('/login', (req, res) => {
  const credentials = req.body;
  User.findOne({ username: credentials.username }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(400).json('invalid credentials');
    }
  });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(user => {
      res.status(200).json(user.toAuthJSON());
      sendConfirmationEmail(user);
    })
    .catch(err => res.status(400).json(parseErrors(err.errors)));
});

app.get('/confirm', (req, res) => {
  const token = req.query.token;
  const decoded = jwt.decode(token);
  User.findOne({ username: decoded.username }).then(user => {
    if (user && user.confirmed === false) {
      user.confirmed = true;
      user.save().then(user => {
        res.status(200).json(user.toAuthJSON());
      });
    } else if (user && user.confirmed === true) {
      res.status(400).json({ message: 'email already confirmed' });
    } else {
      res.status(400).json({ message: 'invalid credentials' });
    }
  });
});

app.post('/forget_password', (req, res) => {
  const username = req.body.username;
  User.findOne({ username }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(400).json({ message: 'invalid request' });
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', api);

app.listen(8080, () => console.log('running on localhost:8080'));
