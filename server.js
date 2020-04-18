var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('static'));
app.use('/images', express.static('images'));

// io.on('connection', (socket) => {
//   socket.on('draw', (ran) => {
//      console.log('card drawn')
//     socket.broadcast.emit('draw', ran);
//   });
// });

http.listen(3000, () => {
  console.log('listening on *:3000');
});