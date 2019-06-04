riot.tag2('side-nav', '<div class="s-layout__sidebar"> <nav class="s-sidebar__nav"> <ul> <li> <a class="s-sidebar__nav-link" href="#/task-overview" id="taskOverview"> <i class="fas fa-th-list"></i><p>Taskübersicht</p> </a> </li> <li> <a class="s-sidebar__nav-link" href="#/archievments" id="archievments"> <i class="fas fa-trophy"></i><p>Achievments</p> </a> </li> <li> <a class="s-sidebar__nav-link" href="#/userSettings" id="userSettings"> <i class="fas fa-user"></i><p>Benutzereinstellungen</p> </a> </li> </ul> </nav> </div>', 'side-nav .active,[data-is="side-nav"] .active{ font-weight: bold; } side-nav .s-sidebar__nav,[data-is="side-nav"] .s-sidebar__nav{ position: fixed; top: 300; left: -15em; overflow: hidden; transition: all .3s ease-in; width: 15em; height: 100%; background-color: white; z-index: 998; box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12); } side-nav .s-sidebar__nav:hover,[data-is="side-nav"] .s-sidebar__nav:hover,side-nav .s-sidebar__nav:focus,[data-is="side-nav"] .s-sidebar__nav:focus{ } side-nav .s-sidebar__nav:hover,[data-is="side-nav"] .s-sidebar__nav:hover,side-nav .s-sidebar__nav:focus,[data-is="side-nav"] .s-sidebar__nav:focus{ left: 0; width: 15em; } side-nav .s-sidebar__nav ul,[data-is="side-nav"] .s-sidebar__nav ul{ position: absolute; top: 4em; left: 0; margin: 0; padding: 0; width: 15em; } side-nav .s-sidebar__nav ul li,[data-is="side-nav"] .s-sidebar__nav ul li{ width: 100%; } side-nav .s-sidebar__nav ul li a,[data-is="side-nav"] .s-sidebar__nav ul li a{ color: inherit; } side-nav .s-sidebar__nav-link,[data-is="side-nav"] .s-sidebar__nav-link{ position: relative; display: inline-block; width: 100%; height: 4em; } side-nav .s-sidebar__nav-link p,[data-is="side-nav"] .s-sidebar__nav-link p{ position: absolute; top: 50%; left: 4em; transform: translateY(-50%); } side-nav .s-sidebar__nav-link > i,[data-is="side-nav"] .s-sidebar__nav-link > i{ position: absolute; top: 0; left: 0; display: inline-block; width: 4em; height: 4em; } side-nav .s-sidebar__nav-link > i::before,[data-is="side-nav"] .s-sidebar__nav-link > i::before{ position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); } @media (min-width: 0em) { side-nav .s-sidebar__nav,[data-is="side-nav"] .s-sidebar__nav{ width: 4em; left: 0; } side-nav .s-sidebar__nav:hover,[data-is="side-nav"] .s-sidebar__nav:hover,side-nav .s-sidebar__nav:focus,[data-is="side-nav"] .s-sidebar__nav:focus{ width: 15em; } } @media (min-width: 68em) { side-nav .s-sidebar__nav,[data-is="side-nav"] .s-sidebar__nav{ width: 15em; } side-nav .s-sidebar__nav ul,[data-is="side-nav"] .s-sidebar__nav ul{ top: 1.3em; } }', '', function(opts) {
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
});
