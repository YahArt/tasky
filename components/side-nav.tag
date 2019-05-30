<side-nav>
  <div class="side-nav">
    <ul class="navigation-list">
      <li>
        <a href="#/task-overview" id="taskOverview">Taskübersicht</a>
      </li>
      <li>
        <a href="#/archievments" id="archievments">Achievments</a>
      </li>
      <li>
        <a href="#/userSettings" id="userSettings">Benutzereinstellungen</a>
      </li>
    </ul>
  </div>

  <script type="text/javascript">
    this.on('mount', function () {

      function setActiveState(location) {
        let element = document.getElementById(location);
        if (element) {
          element.classList.add("active");
        } else {
          console.error("Cannot set active set with element id: " + location);
        }
      }

      function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index == 0
            ? word.toLowerCase()
            : word.toUpperCase();
        }).replace(/\s+/g, '');
      }

      // Set active state according to current location
      const currentLocationUrl = window.location.href;
      let location = currentLocationUrl.split('#').pop();
      if (location) {
        location = location.replace('/','');
        location = location.replace('-', ' ');
        const sanitizedLocation = camelize(location);
        setActiveState(sanitizedLocation);
      }
    });
  </script>

  <style media="screen">
    .navigation-list {
      list-style-type: none;
      background-color: white;
      padding: 0;
      margin: 0;
      height: 100%;
      width: 350px;
      position: absolute;
      top: 400px;
      left: 0;
    }
    .navigation-list li {
      display: block;
      text-align: center;
      margin: 15px;
    }
    .navigation-list a:hover {
      color: #E91E63;
    }
    .navigation-list li a {
      color: black;
      width: 100%;
      text-transform: uppercase;
      transition: color 0.5s ease;
      font-size: 1.2rem;
      padding-bottom: 5px;
    }
    .active {
      font-weight: bold;
      color: #E91E63 !important;
    }
  </style>
</side-nav>
