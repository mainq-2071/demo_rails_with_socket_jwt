const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Should add basic auth or other special auth
app.post('/push_data_from_rails', function(req, res, next) {
  if(req.body && req.body.msg) {
    // userId to send to
    io.sockets.to("1").emit('DATA_MESSAGE', req.body.msg);
  }
  res.json({key:"value"});
});

// check to make user user pass valid token
var userId = '';
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  jwt.verify(token, 'secret', function(err, decoded) {
    if (decoded) {
      userId = decoded.user_id;
      // socket.id = userId;
      socket.userId = userId;
      next();
    } else {
      next(new Error("invalid_token"));
    }
  });
});

io.on('connection', (socket) => {
  console.log(socket.userId)
  console.log('a user connected');
  // join user to room with userId
  socket.join(socket.userId + "");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});

// const test = jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: 360 * 360 });
// console.log(test)
