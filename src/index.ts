import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import * as dotenv from 'dotenv';
import { Server } from 'socket.io';
// Router
import userRouter from './routes/user';
import morgan from 'morgan';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// if you want anyone to be able to connect
app.use(cors({ origin: true }));

//  if you want only your frontend to connect
app.use(cors({ origin: 'http://localhost:3000' }));

// Request logger
// TODO: create a rotating write stream
// const accessLogStream = createStream("access.log", {
//   size: "10M",
//   interval: "1d", // rotate daily
//   path: path.join(__dirname, "../log"),
// });

// setup the logger
morgan.token("real-ip", (req) => req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || undefined);
// app.use(morgan(":real-ip - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"", {  }));
app.use(morgan(":real-ip [:date[clf]] :method :url :status :response-time ms - :res[content-length]"));
// user api
app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy');
});

app.use((error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// const PORT = process.env.PORT || 8000;
const PORT = 8000;
const server = http.createServer(app);

// mongoose.connect(process.env.URI || '');
mongoose.connect(
  'mongodb+srv://quan:buianhquan308@cluster0.hzefrzv.mongodb.net/discord-clone?retryWrites=true&w=majority'
);
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
  process.exit(-1);
});

const io = new Server(server, {});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('new message', (recievedMessage) => {
    var chat = recievedMessage.chat;
    chat.users.forEach((user) => {
      if (user == recievedMessage.sender._id) return;
      socket.in(user).emit('message recieved', recievedMessage);
    });
  });

  socket.off('setup', (userData) => {
    socket.leave(userData._id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8085 });
wss.on('connection', (client) => {
  client.on('message', (data, isBinary) => {
    [...wss.clients]
      .filter((c) => c != client)
      .forEach((c) => c.send(isBinary ? data.toString() : data));
  });
  // client.on('close', () => {
  //   console.log('Client disconected');
  // })
  // client.send('hus')
});
