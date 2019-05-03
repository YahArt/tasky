riot.tag2('tasky', '<div id="content"></div>', '', '', function(opts) {
    const firebaseConfig = {
      apiKey: "AIzaSyBI435cfbcRThHVc_gjUhq3hzqCGyNkvVs",
      authDomain: "tasky-73057.firebaseapp.com",
      databaseURL: "https://tasky-73057.firebaseio.com",
      projectId: "tasky-73057",
      storageBucket: "tasky-73057.appspot.com",
      messagingSenderId: "205490839879"
    };

    firebase.initializeApp(firebaseConfig);

    let currentPage = null;

    function switchPage(pageToSwitch) {
      if (currentPage) {
        console.log("unmounting previous");
        currentPage.unmount(true);
      }
      currentPage = riot.mount("div#content", pageToSwitch)[0];
    };

    route(currentRoute => {
      switch (currentRoute) {
        case "login":
          switchPage("login");
          break;
        default:
          switchPage("landing-page");
          break;
      }
    });
    route.start(true);
});
