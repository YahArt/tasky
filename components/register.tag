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

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="md-form">
          <select class="browser-default custom-select">
            <option selected="selected">Beruf</option>
            <option value="1">IT / Telekommunikation</option>
            <option value="2">Gesundheit</option>
            <option value="3">Konstruktion</option>
            <option value="3">Architektur</option>
          </select>
        </div>
      </div>

      <div class="col-md-3 offset-md-1">
        <div class="md-form">
          <input type="email" class="form-control" id="email">
          <label for="email">Email</label>
        </div>
      </div>
    </div>

    <label class="bold upper-case skills" for="skills">Skills</label>

    <div class="row mt-3">
      <div class="col-md-3">
        <label for="organisation bold upper-case">Organisation</label>
      </div>

      <div class="col-md-8 offset-md-1">
          <input type="range" class="custom-range" id="organisation" min="0" max="10" step="1">
      </div>

      <div class="col-md-3">
        <label for="structure bold upper-case">Struktur</label>
      </div>

      <div class="col-md-8 offset-md-1">
          <input type="range" class="custom-range" id="structure" min="0" max="10" step="1">
      </div>

      <div class="col-md-3">
        <label for="finance bold upper-case">Buchhaltung</label>
      </div>

      <div class="col-md-8 offset-md-1">
          <input type="range" class="custom-range" id="finance" min="0" max="10" step="1">
      </div>

      <div class="col-md-3">
        <label for="flexiblity bold upper-case">Flexiblität</label>
      </div>

      <div class="col-md-8 offset-md-1">
          <input type="range" class="custom-range" id="flexiblity" min="0" max="10" step="1">
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-3">
        <button type="button" class="btn btn-primary" onclick={register}>Registrieren</button>
      </div>
      <div class="col-md-3 offset-md-1">
        <button type="button" class="btn btn-primary" onclick={cancel}>Abbrechen</button>
      </div>
    </div>

  </div>

  <script>
    register() {
      route('login', 'Tasky - Login');
    }

    cancel() {
      route('login', 'Tasky - Login');
    }
  </script>

  <style>
    .upper-case {
      text-transform: uppercase;
    }
    .bold {
      font-weight: bold;
    }
    .skills,
    .user-information {
      margin-top: 15px;
    }
  </style>

</register>
