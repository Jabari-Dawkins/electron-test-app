var app = require('app');   //Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

//Report crashes to our (electron) server.
require('crash-reporter').start();

//Keep a global reference of the window object, if you don't, the window will
//be closed automatically when the javascript object is GCed
var mainWindow = null;

//Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

//This metod will be called when Electron has done everything
//initialization and ready for creating browser windows.
app.on('ready', function() {
  var ipc = require('ipc');
  var appScreen = require('screen');
  var size = appScreen.getPrimaryDisplay().workAreaSize;
  //Create browser window
  mainWindow = new BrowserWindow({
    width: size.width, 
    height: size.height
  });

  //Load index.html for app
  mainWindow.loadUrl('file://' + __dirname + '/login.html');

  ipc.on('login-attempt', function(event, arg) {
    console.log(arg);
    jsonInfo = JSON.parse(arg);
    usr = jsonInfo.username;
    pass = jsonInfo.password;
    if(usr === "test" && pass === "test") {
      event.returnValue = '';
      mainWindow.loadUrl('file://' + __dirname + '/home.html');
    }
    else
      event.returnValue = 'Invalid username/password!';
  });

  //Emitted when the window is closed
  mainWindow.on('closed', function() {
    //Derefernce the window object, usually you would store windows
    //in an array if your app supports multi windows, this is the
    //time when you should delete the corresponding element.
    mainWindow = null;
  });
});
