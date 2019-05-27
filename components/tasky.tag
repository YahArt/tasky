<tasky>
  <!-- Mount point container -->
  <div id="content"></div>

  <script>
    let currentPage = null;

    function switchPage(pageToSwitch) {
      if (currentPage) {
        currentPage.unmount(true);
      }
      currentPage = riot.mount("div#content", pageToSwitch)[0];
    };

    route(currentRoute => {
      switch (currentRoute) {
        case "login":
          switchPage("login");
          break;
        case "task-overview":
          switchPage("task-overview");
          break;
        case "archievments":
          switchPage("archievments");
          break;
        case "register":
          switchPage("register");
          break;
        default:
          // TODO: Add error handling in case of invalid page
          switchPage("login");
          break;
      }
    });

    route.start(true);
  </script>
</tasky>
