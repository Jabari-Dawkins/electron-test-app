function login() {
  var ipc = require('ipc');
  var user = document.loginform.username.value;
  var pass = document.loginform.password.value;

  var result = ipc.sendSync('login-attempt', JSON.stringify({username: user, password: pass }));
  
  if(result != "")
    alert(result);

  ipc = null;
}
