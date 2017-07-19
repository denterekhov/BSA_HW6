/*jshint esversion: 6 */
let app = require('express')();
let server = require('http').Server(app);
let bodyParser = require('body-parser');

let messages = [];
let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req,res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', function(req,res) {
  res.sendFile(__dirname + '/script.js');
});

app.get('/messages', function(req,res) {
  res.json(messages);
});

app.post('/messages', function(req,res) {
  messages.push(req.body);
});

app.get('/users', function(req,res) {
  res.json(users);
});

app.post('/users', function(req,res) {
  users.push(req.body);
});


server.listen(3000, () => {
  console.log('Server started at port 3000');
});