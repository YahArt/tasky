riot.tag2('task-overview', '<header ref="header"></header> <side-nav></side-nav> <div class="task-overview-container container-fluid"> <task-list></task-list> </div>', 'task-overview .task-overview-container,[data-is="task-overview"] .task-overview-container{ padding-top: 400px; } @media (min-width: 0em) { task-overview .task-overview-container,[data-is="task-overview"] .task-overview-container{ padding-left: 6em; } } @media (min-width: 68em) { task-overview .task-overview-container,[data-is="task-overview"] .task-overview-container{ padding-left: 15em; } }', '', function(opts) {
    this.completeTask = function (task) {
      this.refs.header.trigger('completeTask', task);
    }
});
