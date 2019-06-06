riot.tag2('user-skill', '<div class="user-skill card" onclick="{openBadgesModal}"> <div class="card-body"> <h4 class="card-title"> <a>{opts.skill.name}</a> </h4> <p class="card-text">{completedBadges} von {totalBadges} Badges erreicht</p> </div> </div>', 'user-skill .user-skill,[data-is="user-skill"] .user-skill{ margin: 15px; min-height: 250px; } user-skill .card-body,[data-is="user-skill"] .card-body{ background-color: #00BCD4; } user-skill .card .card-body .card-text,[data-is="user-skill"] .card .card-body .card-text{ color: inherit; }', '', function(opts) {
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

});
