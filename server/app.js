import express from 'express';
import path from 'path';
import 'dotenv/config';
import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

import connectDb from './connectDb.js';
import apiRoutes from './routes/apiRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

connectDb(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.mp34x.mongodb.net/`,
  'exquisite'
);

app.use(logger('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
