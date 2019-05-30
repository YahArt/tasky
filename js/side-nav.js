riot.tag2('side-nav', '<div class="side-nav text-center"> <h1 class="title">Tasky</h1> <ul class="navigation-list"> <li> <a href="#/task-overview" id="taskOverview">Taskübersicht</a> </li> <li> <a href="#/archievments" id="archievments">Achievments</a> </li> <li> <a href="#/userSettings" id="userSettings">Benutzereinstellungen</a> </li> </ul> </div>', 'side-nav .title,[data-is="side-nav"] .title{ color: #ee6e73; text-transform: uppercase; font-weight: bold; } side-nav .side-nav,[data-is="side-nav"] .side-nav{ background-color: white; box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12); padding: 15px 0 0 0; margin: 0; height: 100%; width: 280px; position: fixed; top: 0; left: 0; z-index: 2; } side-nav .navigation-list,[data-is="side-nav"] .navigation-list{ list-style-type: none; padding: 30px 0 0; } side-nav .navigation-list li,[data-is="side-nav"] .navigation-list li{ margin: 15px auto; } side-nav .navigation-list li a,[data-is="side-nav"] .navigation-list li a{ color: black; width: 100%; padding-bottom: 5px; } side-nav .active,[data-is="side-nav"] .active{ font-weight: bold; }', '', function(opts) {
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
