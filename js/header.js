riot.tag2('header', '<div class="header"> <h1>Tasky</h1> <img src="./images/profile-picture.png" class="profile-picture rounded-circle" alt="Profile Picture"> <p>{this.currentUser.name}</p> <p>Level {this.currentUser.level}</p> <div class="progress"> <p class="progress-text">HP: </p> <div class="progress-bar progress-bar-striped progress-bar-animated progress-health" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%">100/150</div> </div> <div class="progress"> <p class="progress-text">MP: </p> <div id="health" class="progress-bar progress-bar-striped progress-bar-animated progress-magic" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%">25/100</div> </div> </div> </div>', 'header .header,[data-is="header"] .header{ display: flex; flex-direction: column; justify-content: center; align-items: center; height: 400px; border-bottom: 1px solid black; } header .profile-picture,[data-is="header"] .profile-picture{ margin: 10px 0; width: 150px; height: auto; } header .progress,[data-is="header"] .progress{ width: 350px; margin-bottom: 15px; } header .progress-text,[data-is="header"] .progress-text{ font-weight: bold; margin-right: 15px; } header .progress-health,[data-is="header"] .progress-health{ background-color: #4CAF50; } header .progress-magic,[data-is="header"] .progress-magic{ background-color: #9C27B0; }', '', function(opts) {
  // Require tasky repository
  this.mixin('UserRepository');
  const defaultUser = {
    name: '',
    level: 1,
    experiencePoints: 50,
    skills: [],
  }
  this.currentUser = defaultUser;
  this.on('mount', function () {
    this.userRepoGetAllUsers().then((users) => {
      this.currentUser = users[0];
      this.update();
    });
  });
});
