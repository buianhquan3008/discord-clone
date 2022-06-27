import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import * as dotenv from 'dotenv';
import { Server } from 'socket.io'

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

// const PORT = process.env.PORT || 8000;

// const server = http.createServer(app);

// mongoose.connect(process.env.URI || '');

// const db = mongoose.connection;
// db.on('error', (err) => {
//   console.log(err);
//   process.exit(-1);
// });

// const io = new Server(server, { });

// io.on("connection", (socket) => {
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//   });

//   socket.on("new message", (recievedMessage) => {
//     var chat = recievedMessage.chat;
//     chat.users.forEach((user) => {
//       if (user == recievedMessage.sender._id) return;
//       socket.in(user).emit("message recieved", recievedMessage);
//     });
//   });

//   socket.off("setup", (userData) => {
//     socket.leave(userData._id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8082 });
wss.on('connection', ws => {
  console.log('New client conected!');
  ws.on('close', () => {
    console.log('Client disconected');
  })
})