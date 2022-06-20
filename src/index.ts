import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import * as dotenv from 'dotenv';
import socket from 'socket.io'

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// if you want anyone to be able to connect
app.use(cors({ origin: true }));

//  if you want only your frontend to connect
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy');
});

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connect(process.env.URI || '');

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
  process.exit(-1);
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// const io = socket.listen(server);