riot.tag2('login', '<div class="container login"> <div class="card"> <div class="card-body"> <h4 class="card-title text-center">Login</h4> <form> <div class="md-form mt-5 form-lg"> <input class="form-control" id="email" ref="email" type="email"> <label for="email">E-Mail</label> </div> <div class="md-form mt-5 form-lg"> <input type="password" class="form-control" id="password" ref="password"> <label for="password">Passwort</label> </div> <button type="button" class="btn btn-primary" onclick="{login}">Login</button> <button type="button" class="btn btn-primary" onclick="{register}">Account erstellen</button> <a href="#" class="forgot-login">Login Daten vergessen?</a> </form> </div> </div> </div> <bottom-dialog ref="dialog"></bottom-dialog>', 'login .login,[data-is="login"] .login{ margin: 10% auto; } login .forgot-login,[data-is="login"] .forgot-login{ display: block; margin-top: 15px; font-size: 0.8rem; }', '', function(opts) {
    this.login = function() {
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      if (email !== '' && password !== '') {
        route('dashboard', 'Tasky - Dashboard');
      }
    }.bind(this)

    this.register = function() {
      route('register', 'Tasky - Registrierung');

    }.bind(this)
});
