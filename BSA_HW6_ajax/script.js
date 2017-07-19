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

  // let userName = '';

  loginButton.addEventListener('click', function() {
    if((loginUser.value === '') || (loginUserNickname.value === '')) {
      alert('Вы не заполнили все поля!');
    } else {
      // var el = document.createElement('li');
      // var el2 = document.createElement('p');
      // var el3 = document.createElement('span');
      // el.innerText = 'Name: ' + loginUser.value;
      // el2.innerText = 'Nickname: ' + loginUserNickname.value;
      // el3.innerText = 'Status: online';
      // userList.appendChild(el);
      // userList.appendChild(el2);
      // userList.appendChild(el3);
      // userName = loginUser.value;
      let data = {
        user: loginUser.value,
        nickname: loginUserNickname.value
      };
      loginForm.classList.add('hide');
      loginUser.value = '';
      loginUserNickname.value = '';
      ajaxRequest({
        method: 'POST',
        url: '/users',
        data: data
      });
    }
  });


  sendMessage.addEventListener('click', function() {
    let data = {
      // user: userName,
      messageText: messageText.value,
      messageDate: new Date().toLocaleString()
    };
    messageText.value = '';
      ajaxRequest({
        method: 'POST',
        url: '/messages',
        data: data
      });
  });



/*  messageText.addEventListener('keyup', function() {
    // let isTyping = {
    //   id: socket.id
    // };
    let data = messageText.value;
    // console.log(data);
  });*/



  // socket.on('chat message', function(msg) {
  //   var el = document.createElement('li');
  //   var el2 = document.createElement('li');
  //   el.innerText = msg.messageDate;
  //   el2.innerText = msg.messageText;
  //   messages.appendChild(el);
  //   messages.appendChild(el2);

  // });

  // socket.on('typing', function(data) {
  //   console.log(data);
  //   let isTyping = document.getElementById('isTyping');
  //   isTyping.innerText = '...is typing';
  // });


  // socket.on('chat history', function(msg) {
  //   // console.log(msg);
  //   messages.innerHTML = '';
  //   for(var i in msg) {
  //     if(msg.hasOwnProperty(i)) {
  //       var el = document.createElement('li');
  //       var el2 = document.createElement('li');
  //       el.innerText = msg[i].messageDate;
  //       el2.innerText = msg[i].messageText;
  //       messages.appendChild(el);
  //       messages.appendChild(el2);
  //     }
  //   }
  // });

  // socket.on('user logged', function(userInfo) {
  //   // console.log(userInfo);
  //   var el = document.createElement('li');
  //   var el2 = document.createElement('p');
  //   var el3 = document.createElement('span');
  //   el.innerText = 'Name: ' + userInfo.user;
  //   el2.innerText = 'Nickname: ' + userInfo.nickname;
  //   el3.innerText = 'Status: online';
  //   userList.appendChild(el);
  //   userList.appendChild(el2);
  //   userList.appendChild(el3);
  // });


  // socket.on('list of users', function(user) {
  //   userList.innerHTML = '';
  //   for(var i in user) {
  //     if(user.hasOwnProperty(i)) {
  //       var el = document.createElement('li');
  //       var el2 = document.createElement('p');
  //       var el3 = document.createElement('span');
  //       el.innerText = 'Name: ' + user[i].user;
  //       el2.innerText = 'Nickname: ' + user[i].nickname;
  //       el3.innerText = 'Status: online';
  //       userList.appendChild(el);
  //       userList.appendChild(el2);
  //       userList.appendChild(el3);
  //     }
  //   }
  // });
  let ajaxRequest = (options) => {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function() {};
    let data = options.data || {};
    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() { 
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(xhr.responseText);
      }
    };
  };
    // xhr.open('GET', 'https://api.myjson.com/bins/152f9j', true);
    // xhr.send();
  var getMessagesData = function() {
    ajaxRequest({
      url: '/messages',
      method: 'GET',
      callback: function(payload) {
        console.log('messages ' + payload);
        msg = JSON.parse(payload);
        messages.innerHTML = '';
        for(var i in msg) {
          if(msg.hasOwnProperty(i)) {
            // var el = document.createElement('li');
            // el.innerText = msg[i].user + msg[i].messageText + msg[i].messageDate;
            // messages.appendChild(el);
            var div = document.createElement('div');
            var el = document.createElement('li');
            var el2 = document.createElement('li');
            el.innerText = msg[i].messageDate;
            el2.innerText = msg[i].messageText;
            div.appendChild(el);
            div.appendChild(el2);
            messages.appendChild(div);
          }
        }
        // console.log(userList);
      }
    });
  };
  var getUsersData = function() {
    ajaxRequest({
      url: '/users',
      method: 'GET',
      callback: function(payload) {
        console.log('users ' + payload);
        usr = JSON.parse(payload);
        userList.innerHTML = '';
        for(var i in usr) {
          if(usr.hasOwnProperty(i)) {
            // var div = document.createElement('div');
            var el = document.createElement('li');
            var el2 = document.createElement('p');
            el.innerText = 'Name: ' + usr[i].user;
            el2.innerText = 'Nickname: ' + usr[i].nickname;
            userList.appendChild(el);
            userList.appendChild(el2);
          }
        }
        // console.log(userList);
      }
    });
  };

 /* var getUsersData = function() {
    ajaxRequest({
      url: '/users',
      method: 'GET',
      callback: function(usr) {
        usr = JSON.parse(usr);
        console.log('users ' + usr);
        userList.innerHTML = '';
        for(var i in usr) {
          if(usr.hasOwnProperty(i)) {
            var el = document.createElement('li');
            el.innerText = usr[i].name + ': ' + usr[i].nickname;
            userList.appendChild(el);
          }
        }
      }
    });
  };*/
  getMessagesData();
  getUsersData();

  setInterval(function() {
    getMessagesData();
    getUsersData();
  }, 1000);

})();