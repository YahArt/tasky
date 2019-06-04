riot.tag2('header', '<div class="container-fluid header"> <div class="row py-3"> <div class="col-md-3"> <div class="text-center"> <img src="./images/profile-picture.png" class="rounded-circle" alt="Profile Picture"> <p class="user-name">{this.currentUser.name}</p> <p class="user-level">Level {this.currentUser.level}</p> <div id="levelProgress" class="ldBar label-center" data-value="{this.percentage}" data-preset="line" style="width:30%;height:40;margin:auto" data-aspect-ratio="none"></div> </div> </div> <div class="col-md-9 my-auto text-center"> <h4 class="current-location">{headerLocation}</h4> </div> </div> </div> </div>', 'header .header,[data-is="header"] .header{ position: fixed; width: 100%; min-height: 300px; z-index: 999; background-color: white; box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12); } header .user-name,[data-is="header"] .user-name{ margin: 15px 0; font-weight: bold; } header .user-level,[data-is="header"] .user-level{ font-weight: bold; text-transform: uppercase; font-size: 1.5rem; } header .current-location,[data-is="header"] .current-location{ font-weight: bold; } header .ldBar-label,[data-is="header"] .ldBar-label{ margin: 10px 0; }', '', function(opts) {
  // Require tasky repository
  this.mixin('TaskyRepository');
  const defaultUser = {
    name: '',
    level: 1,
    experiencePoints: 50,
    skills: []
  };

  this.headerLocation = "";

  this.currentUser = defaultUser;
  this.experienceUntilNextLevel = defaultUser.level * 150;
  this.percentage = 0;
  this.update();
  this.on('mount', function () {
    this.progressElement = new ldBar('#levelProgress');
    this.userRepoGetAllUsers().then((users) => {
      this.currentUser = users[0];
      this.calculateExperiencePointsUntilNextLevel();
      this.calculatePercentage();
      this.update();
    });
  });

  // In case the user has reached more points. -> Gets called by taskOverview
  this.on('completeTask', task => {
    this.currentUser.experiencePoints = this.currentUser.experiencePoints + task.points;
    this.currentUser.scoredPoints = this.currentUser.scoredPoints + task.points;
    // For each badge in the given skills which are active add points
    const activeSkills = task.skills.filter(s => s.active);
    activeSkills.forEach(activeSkill => {
      const foundIndex = this.currentUser.skills.findIndex(userSkill => userSkill.name === activeSkill.name);
      if (foundIndex >= 0) {
        this.currentUser.skills[foundIndex].badges.filter(b => !b.completed).forEach(badge => {
          badge.currentPoints = badge.currentPoints + task.points;
          if (badge.currentPoints >= badge.pointsToComplete) {
            badge.completed = true;
          }
        });
      }
    });

    // Update the user
    this.userRepoUpdateUser(this.currentUser).then(users => {
      this.currentUser = users[0];
      this.calculateUserLevel();
      this.calculateExperiencePointsUntilNextLevel();
      this.calculatePercentage();
      this.update();
    });
  });

  this.calculateExperiencePointsUntilNextLevel = function () {
    this.experienceUntilNextLevel = this.currentUser.level * 70;
  }

  this.on('userSettingsChanged', user => {
    this.currentUser = user;
    this.calculateExperiencePointsUntilNextLevel();
    this.calculatePercentage();
    this.update();
  });

  this.calculateUserLevel = function () {
    if (this.currentUser.experiencePoints >= this.experienceUntilNextLevel) {
      this.currentUser.level = this.currentUser.level + 1;
      // Start at the beginning again
      this.currentUser.experiencePoints = 0;
    }
  }

  this.calculatePercentage = function () {
    this.percentage = (100 / this.experienceUntilNextLevel) * this.currentUser.experiencePoints;
    if (this.progressElement) {
      this.progressElement.set(this.percentage);
    }
  }

  this.on('mount', function () {
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0
          ? word.toLowerCase()
          : word.toUpperCase();
      }).replace(/\s+/g, '');
    }

    function getHeaderLocation(locationIdentifier) {
      switch (locationIdentifier) {
        case "taskOverview":
          return "Taskübersicht";
        case "archievments":
          return "Achievments";
        case "userSettings":
          return "Benutzereinstellungen";
        default:
          return "";

      }
    }

    // Set active state according to current location
    const currentLocationUrl = window.location.href;
    let location = currentLocationUrl.split('#').pop();
    if (location) {
      location = location.replace('/', '');
      location = location.replace('-', ' ');
      const sanitizedLocation = camelize(location);
      this.headerLocation = getHeaderLocation(sanitizedLocation);
    }
  });
});
