<header>
  <div class="header">
    <h1>Tasky</h1>
    <!-- Image is from: https://t2.rbxcdn.com/f37dbf676862a314cdb3f98c08460146-->
    <img src="./images/profile-picture.png" class="profile-picture rounded-circle" alt="Profile Picture">
    <p>{this.currentUser.name}</p>
    <p>Level {this.currentUser.level}</p>
    <div class="progress">
      <p class="progress-text">Punkte:
      </p>
      <div class="progress-bar progress-bar-striped progress-bar-animated progress-health" role="progressbar" aria-valuenow="{this.displayedExperiencePoints}" aria-valuemin="0" aria-valuemax="{this.experienceUntilNextLevel}" style="width: {this.displayedExperiencePoints}%">{this.displayedExperiencePoints}/{this.experienceUntilNextLevel}</div>
    </div>
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
  .progress {
    width: 350px;
    margin-bottom: 15px;
  }
  .progress-text {
    font-weight: bold;
    margin-right: 15px;
  }
  .progress-health {
    background-color: #4CAF50;
  }
  .progress-magic {
    background-color: #9C27B0;
  }
</style>

<script type="text/javascript">
  // Require tasky repository
  this.mixin('TaskyRepository');
  const defaultUser = {
    name: '',
    level: 1,
    experiencePoints: 50,
    skills: [],
  };

  this.currentUser = defaultUser;
  this.experienceUntilNextLevel = defaultUser.level * 50;
  this.displayedExperiencePoints = defaultUser.experiencePoints;
  this.update();
  this.on('mount', function () {
    this.userRepoGetAllUsers().then((users) => {
      this.currentUser = users[0];
      this.calculateUserLevel();
      this.calculateExperiencePointsUntilNextLevel();
      this.calculateDisplayedExperiencePoints();
      this.update();
    });
  });

  // In case the user has reached more points. -> Gets called by taskOverview
  this.on('completedTaskWithPoints', points => {
    this.currentUser.experiencePoints = this.currentUser.experiencePoints + points;
    this.calculateUserLevel();
    this.calculateExperiencePointsUntilNextLevel();
    this.calculateDisplayedExperiencePoints();
    this.update();

  });

  // TODO: Fix this stuff...
  this.calculateExperiencePointsUntilNextLevel = function() {
    this.experienceUntilNextLevel = this.currentUser.level * 70;
  }

  this.calculateDisplayedExperiencePoints = function() {
    this.displayedExperiencePoints = this.currentUser.experiencePoints % this.experienceUntilNextLevel;
  }

  this.calculateUserLevel = function() {
    if (this.currentUser.experiencePoints >= this.experienceUntilNextLevel) {
      this.currentUser.experiencePoints = this.currentUser.experiencePoints % this.experienceUntilNextLevel;
      this.currentUser.level = this.currentUser.level + 1;
    }
  }

</script>

</header>
