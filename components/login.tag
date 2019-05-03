<login>
  <div class="container login">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title text-center">Login</h4>
        <form>
          <!-- Material input -->
          <div class="md-form mt-5 form-lg">
            <input type="text" class="form-control" id="email" ref="email">
            <label for="email">E-Mail</label>
          </div>
          <!-- Material input -->
          <div class="md-form mt-5 form-lg">
            <input type="password" class="form-control" id="password" ref="password">
            <label for="password">Passwort</label>
          </div>

          <button type="button" class="btn btn-primary" onclick={login}>Login</button>
          <button type="button" class="btn btn-primary" onclick={createAccount}>Account erstellen</button>
        </form>
      </div>
    </div>
  </div>

  <bottom-dialog ref="dialog"></bottom-dialog>

  <script>
    const auth = firebase.auth();

    login() {
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      auth.signInWithEmailAndPassword(email, password).then(result => {
        const messageObj = {
          title: "Erfolg",
          message: "Sie haben sich erfolgreich angemeldet...",
          error: false
        };
        this.refs.dialog.trigger("toggle", messageObj);
      }).catch(error => {
        const messageObj = {
          title: "Fehler",
          message: `${error}`,
          error: true
        };
        this.refs.dialog.trigger("toggle", messageObj);
      })
    }

    createAccount() {
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      auth.createUserWithEmailAndPassword(email, password).then(result => {
        const messageObj = {
          title: "Erfolg",
          message: "Ihr Account wurde erfolgreich angelegt...",
          error: false
        };
        this.refs.dialog.trigger("toggle", messageObj);
      }).catch(error => {
        const messageObj = {
          title: "Fehler",
          message: `${error}`,
          error: true
        };
        this.refs.dialog.trigger("toggle", messageObj);
      })
    }
  </script>

  <style>
    .login {
      margin: 10% auto;
    }
  </style>

</login>
