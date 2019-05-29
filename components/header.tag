<header>
  <div class="header">
    <h1>Tasky</h1>
    <!-- Image is from: https://t2.rbxcdn.com/f37dbf676862a314cdb3f98c08460146-->
    <img src="./images/profile-picture.png" class="profile-picture rounded-circle" alt="Profile Picture">
    <p class="user-name">{this.currentUser.name}</p>
    <p class="user-level">Level {this.currentUser.level}</p>
    <div id="levelProgress" class="ldBar label-center" data-value="{this.percentage}" data-stroke="data:ldbar/res,stripe(#ff9,#fc9,1)" style="width:30%;height:30%;margin:auto"></div>
  </div>

</div>

<style media="screen">
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    border-bottom: 1px solid black;
  }
  .profile-picture {
    margin: 10px 0;
    width: 150px;
    height: auto;
  }

  .user-name {
    font-weight: bold;
  }

  .user-level {
    font-size: 2rem;
  }
</style>

<script type="text/javascript">
  // Require tasky repository
  this.mixin('TaskyRepository');
  const defaultUser = {
    name: '',
    level: 1,
    experiencePoints: 50,
    skills: []
  };

  this.currentUser = defaultUser;
  this.experienceUntilNextLevel = defaultUser.level * 150;
  this.displayedExperiencePoints = defaultUser.experiencePoints;
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
  this.on('completedTaskWithPoints', points => {
    this.currentUser.experiencePoints = this.currentUser.experiencePoints + points;
    this.calculateUserLevel();
    this.calculateExperiencePointsUntilNextLevel();
    this.calculatePercentage();
    this.update();

  });

  // TODO: Fix this stuff...
  this.calculateExperiencePointsUntilNextLevel = function () {
    this.experienceUntilNextLevel = this.currentUser.level * 70;
  }

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
</script>

</header>
