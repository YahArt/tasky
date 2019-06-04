<user-skill>
  <div class="user-skill card" onClick="{openBadgesModal}">
    <div class="card-body">

      <h4 class="card-title">
        <a>{opts.skill.name}</a>
      </h4>
      <p class="card-text">{completedBadges} von {totalBadges} Badges erreicht</p>
    </div>
  </div>

  <script type="text/javascript">
  this.totalBadges = 0;
  this.completedBadges = 0;

  this.on('mount', function () {
    // Calculate completed badges etc.
    this.totalBadges = this.opts.skill.badges.length;
    this.completedBadges = this.opts.skill.badges.filter(b => b.completed).length;
    this.update();
  });

  this.openBadgesModal = function(event) {
    event.preventDefault();
    this.parent.openBadgesModal(this.opts.skill);
  }

  </script>

  <style media="screen">
    .user-skill {
      margin: 15px;
      min-height: 250px;
    }
    .card-body {
      background-color: #5E35B1;
    }
    .card .card-body .card-text {
      color: inherit;
    }
  </style>

</user-skill>
