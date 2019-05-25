riot.tag2('side-nav', '<div class="side-nav"> <ul class="navigation-list"> <li> <a href="#/task-overview" id="taskOverview">Taskübersicht</a> </li> <li> <a href="#/archievments" id="archievments">Achievments</a> </li> </ul> </div>', 'side-nav .navigation-list,[data-is="side-nav"] .navigation-list{ list-style-type: none; background-color: white; padding: 0; margin: 0; height: 100%; min-width: 250px; position: absolute; top: 400px; left: 0; } side-nav .navigation-list li,[data-is="side-nav"] .navigation-list li{ display: block; text-align: center; margin: 15px; } side-nav .navigation-list a:hover,[data-is="side-nav"] .navigation-list a:hover{ color: #E91E63; } side-nav .navigation-list li a,[data-is="side-nav"] .navigation-list li a{ color: black; width: 100%; text-transform: uppercase; transition: color 0.5s ease; font-size: 1.2rem; padding-bottom: 5px; } side-nav .active,[data-is="side-nav"] .active{ border-bottom: 1px solid black; }', '', function(opts) {
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
});
