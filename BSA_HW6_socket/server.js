/*jshint esversion: 6 */
let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let messages = [];
let users = [];

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req,res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', function(req,res) {
  res.sendFile(__dirname + '/script.js');
});

io.on('connection', function(socket){
  console.log('Client connected');

  socket.on('typing', function(data) {
    console.log('typing');
    socket.broadcast.emit('typing', data);
  });

  socket.on('chat message', function(msg) {
    // var matchString = msg.messageText;
      // var re = new RegExp('[^@(.)?$]', 'i');
      // var result = msg.messageText.match(/[^@(.)?$]/gi);
      // console.log(msg.messageText.match(re));

    if(messages.length <= 100) {
      messages.push(msg);   
    } else {
      messages.shift();
      messages.push(msg);   
    }
    io.emit('chat message', msg);
  });

  socket.on('user logged', function(userInfo) {
    users.push(userInfo);   
    // console.log(users);
    io.emit('user logged', userInfo);
  });

  socket.on('disconnect', function () {
    console.log('Client disconnected');
    io.emit('user disconnected');
  });

  socket.emit('chat history', messages);
  socket.emit('list of users', users);
});

server.listen(3000, () => {
  console.log('Server started at port 3000');
});