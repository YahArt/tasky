<user-skill-list>
  <div class="row">
    <div each="{skill in userSkills}" class="col-md-3">
      <user-skill skill="{skill}"></user-skill>
    </div>
  </div>
  <user-badges-modal ref="userBadgesModal"></user-badges-modal>
  <script>
    this.mixin('TaskyRepository');
    this.userSkills = [];

    this.on('mount', function () {
      // First load all available tasks...
      this.userRepoGetAllUsers().then((users) => {
        this.userSkills = users[0].skills;
        this.update();
      });
    });

    this.openBadgesModal = function(skill) {
      this.refs.userBadgesModal.openWithSkill(skill);
    }

  </script>
</user-skill-list>
