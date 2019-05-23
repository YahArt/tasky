riot.tag2('tasky', '<div id="content"></div>', '', '', function(opts) {
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
          break;
          switchPage("login");
        case "dashboard":
          switchPage("dashboard");
          break;
        case "register":
          switchPage("register");
          break;
        default:

          switchPage("login");
          break;
      }
    });
    route.start(true);
});
