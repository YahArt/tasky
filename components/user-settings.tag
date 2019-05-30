<user-settings>
  <header ref="header"></header>
  <side-nav></side-nav>

  <div class="container user-settings">

    <h1 class="upper-case">Ihre Benutzereinstellungen</h1>

    <div class="row mt-3">
      <div class="col-12">
        <div class="md-form">
          <input ref="userName" type="text" class="form-control" id="userName">
          <label for="userName">Benutzername</label>
        </div>
      </div>

      <div class="col-md-9">
        <div class="md-form">
          <input ref="userSkill" type="text" class="form-control" id="userSkills">
          <label for="userSkills">Skill eingeben</label>
        </div>
      </div>

      <div class="col-md-3">
        <div class="md-form">
          <button onclick="{addSkill}" class="btn btn-primary btn-sm">Skill hinzufügen</button>
        </div>
      </div>

      <div class="col-12">
        <div class="md-form">
          <p>Skills</p>
          <span class="skill badge badge-pill badge-default" each="{skill, index in currentUser.skills}">{skill.name}<i onclick="{removeSkill}" class="fas fa-times ml-2"></i>
          </span>
        </div>
        <button type="button" class="btn btn-primary" onclick={saveUserSettings}>Änderungen speichern</button>
      </div>
    </div>
  </div>

</div>

<style media="screen">
  .user-settings {
    padding-top: 50px;
    padding-left: 350px;
  }
  .skill {
    margin: 5px;
  }

  .save-user-settings {
    margin-top: 50px;
  }
</style>

<script type="text/javascript">
  this.mixin('TaskyRepository');
  const defaultUser = {
    name: '',
    level: 1,
    experiencePoints: 50,
    skills: []
  };

  this.updateUserInputFields = function () {
    this.refs.userName.value = this.currentUser.name;
    $('#userName').trigger("change");
    this.update();
  };

  this.addSkill = function(event) {
    event.preventDefault();
    const skillName = this.refs.userSkill.value;
    if (skillName) {
      // Check if skill is not already present
      const foundIndex = this.currentUser.skills.findIndex(s => s.name === skillName);
      if (foundIndex < 0) {
        const defaultBadges = this.taskyRepoGetDefaultBadgesForSkill(skillName);
        this.currentUser.skills.push({
          name: skillName,
          badges: defaultBadges
        });
      }
    }
  };

  this.removeSkill = function(event) {
    event.preventDefault();
    const indexToRemove = event.item.index;
    this.currentUser.skills.splice(indexToRemove, 1);
  };

  this.saveUserSettings = function(event) {
    event.preventDefault();
    // Skills are already up to date so we only need to update the user name
    const newUserName = this.refs.userName.value;
    if (newUserName) {
      this.currentUser.name = newUserName;
      this.userRepoUpdateUser(this.currentUser).then(users => {
          // Send update to header...
          this.refs.header.trigger('userSettingsChanged', users[0]);
      });
    }
  }

  this.currentUser = defaultUser;
  this.on('mount', function () {
    this.userRepoGetAllUsers().then((users) => {
      this.currentUser = users[0];
      this.updateUserInputFields();
    });
  });
</script>
</user-settings>
