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

  <bottom-dialog ref="dialog" opts={messageObj}></bottom-dialog>

  <script type="coffee">
    config =
      apiKey: "AIzaSyBI435cfbcRThHVc_gjUhq3hzqCGyNkvVs"
      authDomain: "tasky-73057.firebaseapp.com"
      databaseURL: "https://tasky-73057.firebaseio.com"
      projectId: "tasky-73057"
      storageBucket: "tasky-73057.appspot.com"
      messagingSenderId: "205490839879"

    firebase.initializeApp config

    @auth = firebase.auth()

    @login = ->
      email = @refs.email.value
      password = @refs.password.value

      @auth.signInWithEmailAndPassword(email, password)
      .then (result) =>
        messageObj =
          title: "Erfolg"
          message: "Sie haben sich erfolgreich angemeldet..."
          error: false
        @refs.dialog.trigger "toggle", messageObj
      .catch (error) =>
        messageObj =
          title: "Fehler"
          message: "#{error}"
          error: true
        @refs.dialog.trigger "toggle", messageObj

    @createAccount = ->
      email = @refs.email.value
      password = @refs.password.value
      @auth.createUserWithEmailAndPassword(email, password)
      .then (result) =>
        messageObj =
          title: "Erfolg"
          message: "Ihr Account wurde erstellt, bitte melden Sie sich an..."
          error: false
        @refs.dialog.trigger "toggle", messageObj
      .catch (error) =>
        messageObj =
          title: "Fehler"
          message: "#{error}"
          error: true
        @refs.dialog.trigger "toggle", messageObj
  </script>

  <style>
    .login {
      margin: 10% auto;
    }
  </style>

</login>
