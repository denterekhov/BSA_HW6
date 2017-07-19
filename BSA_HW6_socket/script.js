/*jshint esversion: 6 */
(function() {

  let loginForm = document.getElementById('loginForm');
  let loginUser = document.getElementById('loginUser');
  let loginUserNickname = document.getElementById('loginUserNickname');
  let loginButton = document.getElementById('loginButton');
  let chatWindow = document.getElementById('chat_window');
  let userList = document.getElementById('userList');
  let messages = document.getElementById('messages');
  let messageText = document.getElementById('message_text');
  let sendMessage = document.getElementById('send_message');
  // console.log(isTyping);


  let socket = io.connect();

  loginButton.addEventListener('click', function() {
    // let userSocket = socket.id;
    if((loginUser.value === '') || (loginUserNickname.value === '')) {
      alert('Вы не заполнили все поля!');
    } else {
      let userInfo = {
        id: socket.id,
        user: loginUser.value,
        nickname: loginUserNickname.value
      };
      loginForm.classList.add('hide');
      socket.emit('user logged', userInfo);
      loginUser.value = '';
      loginUserNickname.value = '';
    }

  });


  sendMessage.addEventListener('click', function() {
    let data = {
      messageText: messageText.value,
      messageDate: new Date().toLocaleString()
    };
    messageText.value = '';
    socket.emit('chat message', data);
  });



  messageText.addEventListener('keyup', function() {
    // let isTyping = {
    //   id: socket.id
    // };
    let data = messageText.value;
    // console.log(data);
    socket.emit('typing', data);
  });



  socket.on('chat message', function(msg) {
    var el = document.createElement('li');
    var el2 = document.createElement('li');
    el.innerText = msg.messageDate;
    el2.innerText = msg.messageText;
    messages.appendChild(el);
    messages.appendChild(el2);

  });

  socket.on('typing', function(data) {
    console.log(data);
    let isTyping = document.getElementById('isTyping');
    isTyping.innerText = '...is typing';
  });


  socket.on('chat history', function(msg) {
    // console.log(msg);
    messages.innerHTML = '';
    for(var i in msg) {
      if(msg.hasOwnProperty(i)) {
        var el = document.createElement('li');
        var el2 = document.createElement('li');
        el.innerText = msg[i].messageDate;
        el2.innerText = msg[i].messageText;
        messages.appendChild(el);
        messages.appendChild(el2);
      }
    }
  });

  socket.on('user logged', function(userInfo) {
    // console.log(userInfo);
    var el = document.createElement('li');
    var el2 = document.createElement('p');
    var el3 = document.createElement('span');
    el.innerText = 'Name: ' + userInfo.user;
    el2.innerText = 'Nickname: ' + userInfo.nickname;
    el3.innerText = 'Status: online';
    userList.appendChild(el);
    userList.appendChild(el2);
    userList.appendChild(el3);
  });


  socket.on('list of users', function(user) {
    userList.innerHTML = '';
    for(var i in user) {
      if(user.hasOwnProperty(i)) {
        var el = document.createElement('li');
        var el2 = document.createElement('p');
        var el3 = document.createElement('span');
        el.innerText = 'Name: ' + user[i].user;
        el2.innerText = 'Nickname: ' + user[i].nickname;
        el3.innerText = 'Status: online';
        userList.appendChild(el);
        userList.appendChild(el2);
        userList.appendChild(el3);
      }
    }
  });
})();

//private message
/*var messages = {};

io.on('connection', function (socket) {
  socket.on("register", function(data) {
    messages[data.nickname] = socket.id;
  });
  socket.on("privmessage", function(data){
    var to = messages[data.to];
    io.sockets.socket(to).emit(data.msg);
  });
});
*/