const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4000',
  },
});

let datas = []; // nomes ...

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('base', function (data) {
    if (data && data.length > 0 && datas.includes(data) === false) {
      datas.push(data);
    }
    io.emit('base', { datas });
  });
});

httpServer.listen(4000, () => {
  console.log('Server Init ...');
});
