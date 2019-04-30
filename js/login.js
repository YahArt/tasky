riot.tag2('login', '<div class="container login"> <div class="card"> <div class="card-body"> <h4 class="card-title text-center">Login</h4> <form> <div class="md-form mt-5 form-lg"> <input type="text" class="form-control" id="email" ref="email"> <label for="email">E-Mail</label> </div> <div class="md-form mt-5 form-lg"> <input type="password" class="form-control" id="password" ref="password"> <label for="password">Passwort</label> </div> <button type="button" class="btn btn-primary" onclick="{login}">Login</button> <button type="button" class="btn btn-primary" onclick="{createAccount}">Account erstellen</button> </form> </div> </div> </div> <bottom-dialog ref="dialog" opts="{messageObj}"></bottom-dialog>', 'login .login,[data-is="login"] .login{ margin: 10% auto; }', '', function(opts) {
var config;

config = {
  apiKey: "AIzaSyBI435cfbcRThHVc_gjUhq3hzqCGyNkvVs",
  authDomain: "tasky-73057.firebaseapp.com",
  databaseURL: "https://tasky-73057.firebaseio.com",
  projectId: "tasky-73057",
  storageBucket: "tasky-73057.appspot.com",
  messagingSenderId: "205490839879"
};

firebase.initializeApp(config);

this.auth = firebase.auth();

this.login = function() {
  var email, password;
  email = this.refs.email.value;
  password = this.refs.password.value;
  return this.auth.signInWithEmailAndPassword(email, password).then((result) => {
    var messageObj;
    messageObj = {
      title: "Erfolg",
      message: "Sie haben sich erfolgreich angemeldet...",
      error: false
    };
    return this.refs.dialog.trigger("toggle", messageObj);
  }).catch((error) => {
    var messageObj;
    messageObj = {
      title: "Fehler",
      message: `${error}`,
      error: true
    };
    return this.refs.dialog.trigger("toggle", messageObj);
  });
};

this.createAccount = function() {
  var email, password;
  email = this.refs.email.value;
  password = this.refs.password.value;
  return this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
    var messageObj;
    messageObj = {
      title: "Erfolg",
      message: "Ihr Account wurde erstellt, bitte melden Sie sich an...",
      error: false
    };
    return this.refs.dialog.trigger("toggle", messageObj);
  }).catch((error) => {
    var messageObj;
    messageObj = {
      title: "Fehler",
      message: `${error}`,
      error: true
    };
    return this.refs.dialog.trigger("toggle", messageObj);
  });
};
});
