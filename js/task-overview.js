riot.tag2('task-overview', '<header ref="header"></header> <side-nav></side-nav> <div class="task-overview-container container-fluid"> <task-list></task-list> </div>', 'task-overview .task-overview-container,[data-is="task-overview"] .task-overview-container{ padding-top: 50px; padding-left: 250px; }', '', function(opts) {
    this.completedTaskWithPoints = function(points) {
      this.refs.header.trigger('completedTaskWithPoints', points);
    }
});
