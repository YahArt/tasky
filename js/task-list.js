riot.tag2('task-list', '<div class="row"> <div each="{task in defaultTasks}" class="col-md-3"> <task task="{task}"></task> </div> <add-task-button ref="addTaskButton"></add-task-button> <task-modal ref="taskModal"></task-modal> </div>', '', '', function(opts) {
    // Require task repository
    this.mixin('TaskRepository');
    this.defaultTasks = [];

    // In case the user wants to update a specific task etc. -> Gets called by task via parent...
    this.deleteTask = function (taskToDelete) {
      this.taskRepoDeleteTask(taskToDelete).then(tasks => {
        this.defaultTasks = tasks;
        this.update();
      });
    };

    // In case the user makes a task its its favourite
    this.toggleFavourite = function(task) {
      task.isFavourite = !task.isFavourite;
      this.taskRepoUpdateTask(task).then(tasks => {
        this.defaultTasks = tasks;
        this.update();
      });

    }

    // TODO: In case the user wants to create a task etc. -> Gets called by task via parent...
    this.createTask = function(task) {
      this.taskRepoAddTask(task).then(tasks => {
        this.defaultTasks = tasks;
        this.update();
      });

    }

    this.on('mount', function () {
      // First load all available tasks...
      this.taskRepoGetAllTasks().then((tasks) => {
        this.defaultTasks = tasks;
        this.update();
      });

      // In case the user wants to add a new task...
      this.refs.addTaskButton.on('addTask', () => {
        // Launch modal so that the user can enter the appropriate information
        this.refs.taskModal.createNewTask();
        /*
        this.taskRepoAddDummyTask().then(tasks => {
          this.defaultTasks = tasks;
          this.update();
        });
        */
      });

    });
});
