riot.tag2('add-task-button', '<a onclick="{openAddTaskModal}" href="#/task-overview" class="float"> <i class="fa fa-plus my-float"></i> </a>', 'add-task-button .float,[data-is="add-task-button"] .float{ position: fixed; width: 60px; height: 60px; bottom: 40px; right: 40px; background-color: #0C9; color: #FFF; border-radius: 50px; text-align: center; box-shadow: 2px 2px 3px #999; } add-task-button .my-float,[data-is="add-task-button"] .my-float{ margin-top: 22px; }', '', function(opts) {
    this.openAddTaskModal = (e) => {
      e.preventDefault();
      this.parent.openAddTaskModal();
    }
});
