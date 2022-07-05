import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import * as dotenv from 'dotenv';
import { Server } from 'socket.io'
// Router
import userRouter from './routes/user'

dotenv.config();

const app: Application = express();

const upload = multer();
app.use(upload.array('')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// if you want anyone to be able to connect
app.use(cors({ origin: true }));

//  if you want only your frontend to connect
app.use(cors({ origin: 'http://localhost:3000' }));

// user api
app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy');
});

// const PORT = process.env.PORT || 8000;
const PORT = 8000;
const server = http.createServer(app);

// mongoose.connect(process.env.URI || '');
mongoose.connect('mongodb+srv://quan:buianhquan308@cluster0.hzefrzv.mongodb.net/discord-clone?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
  process.exit(-1);
});

const io = new Server(server, { });

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (recievedMessage) => {
    var chat = recievedMessage.chat;
    chat.users.forEach((user) => {
      if (user == recievedMessage.sender._id) return;
      socket.in(user).emit("message recieved", recievedMessage);
    });
  });

  socket.off("setup", (userData) => {
    socket.leave(userData._id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8085 });
wss.on('connection', client => {
  client.on('message', (data, isBinary) => {
    [...wss.clients].filter(c => c != client).forEach( c => c.send(isBinary ? data.toString() : data ));
  })
  // client.on('close', () => {
  //   console.log('Client disconected');
  // })
  // client.send('hus')
})
