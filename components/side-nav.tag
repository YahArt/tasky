<side-nav>
  <div class="s-layout__sidebar">
  <nav class="s-sidebar__nav">
     <ul>
        <li>
           <a class="s-sidebar__nav-link" href="#/task-overview" id="taskOverview">
              <i class="fas fa-th-list"></i><p>Taskübersicht</p>
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#/archievments" id="archievments">
             <i class="fas fa-trophy"></i><p>Achievments</p>
           </a>
        </li>
        <li>
           <a class="s-sidebar__nav-link" href="#/userSettings" id="userSettings">
              <i class="fas fa-user"></i><p>Benutzereinstellungen</p>
           </a>
        </li>
     </ul>
  </nav>
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
        location = location.replace('/', '');
        location = location.replace('-', ' ');
        const sanitizedLocation = camelize(location);
        setActiveState(sanitizedLocation);
      }
    });
  </script>

  <style media="screen">

  .active {
    font-weight: bold;
  }

  /* Sidebar  inspired from: https://github.com/BlackrockDigital/startbootstrap-simple-sidebar */
  .s-sidebar__nav {
     position: fixed;
     top: 300; /* Respect header height */
     left: -15em;
     overflow: hidden;
     transition: all .3s ease-in;
     width: 15em;
     height: 100%;
     background-color: white;
     z-index: 998;
     box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  }


  .s-sidebar__nav:hover,
  .s-sidebar__nav:focus {
  }

  .s-sidebar__nav:hover,
  .s-sidebar__nav:focus {
     left: 0;
     width: 15em;
  }

  .s-sidebar__nav ul {
     position: absolute;
     top: 4em;
     left: 0;
     margin: 0;
     padding: 0;
     width: 15em;
  }

  .s-sidebar__nav ul li {
     width: 100%;
  }

  .s-sidebar__nav ul li a {
     color: inherit;
  }

  .s-sidebar__nav-link {
     position: relative;
     display: inline-block;
     width: 100%;
     height: 4em;
  }

  .s-sidebar__nav-link p {
     position: absolute;
     top: 50%;
     left: 4em;
     transform: translateY(-50%);
  }


  .s-sidebar__nav-link > i {
     position: absolute;
     top: 0;
     left: 0;
     display: inline-block;
     width: 4em;
     height: 4em;
  }

  .s-sidebar__nav-link > i::before {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
  }

  /* Mobile First */
  @media (min-width: 0em) {
     /* Sidebar */

     .s-sidebar__nav {
        width: 4em;
        left: 0;
     }

     .s-sidebar__nav:hover,
     .s-sidebar__nav:focus {
        width: 15em;
     }
  }

  @media (min-width: 68em) {
     /* Sidebar */

     .s-sidebar__nav {
        width: 15em;
     }

     .s-sidebar__nav ul {
        top: 1.3em;
     }
  }
  </style>
</side-nav>
