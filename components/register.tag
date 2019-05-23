<register>
  <div class="container">

    <h1 class="upper-case">Registrierung</h1>
    <h4 class="upper-case">Bitte füllen Sie die untenstehenden Informationen aus</h4>

    <label class="bold upper-case user-information" for="user-information">Benutzerinformationen</label>

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="md-form">
          <input type="text" class="form-control" id="user-name">
          <label for="user-name">Benutzername</label>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="password" class="form-control" id="password">
          <label for="password">Passwort</label>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="md-form">
          <input type="text" class="form-control" id="last-name">
          <label for="last-name">Name</label>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="text" class="form-control" id="first-name">
          <label for="first-name">Vorname</label>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="date" class="form-control" id="date-of-birth">
          <label for="date-of-birth">Geburtsdatum</label>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="md-form">
          <input type="text" class="form-control" id="street-and-house-number">
          <label for="street-and-house-number">Strasse / Hausnummer</label>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="text" class="form-control" id="plz-location">
          <label for="plz-location">PLZ / Ort</label>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="text" class="form-control" id="city">
          <label for="city">Stadt</label>
        </div>
      </div>
    </div>

  </div>

  <style>
    .upper-case {
      text-transform: uppercase;
    }
    .bold {
      font-weight: bold;
    }
    .user-information {
      margin-top: 15px;
    }
  </style>

</register>
