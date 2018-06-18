import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import dotenv from 'dotenv';

import User from './models/User';
import api from './api';

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
    console.log(user);
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(400).json('invalid credentials');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', api);

app.listen(8080, () => console.log('running on localhost:8080'));
