riot.tag2('task-list', '<div class="row"> <div class="col-md-9 md-form mt-0"> <input ref="filterValue" class="form-control" type="text" placeholder="Durchsuche deine Tasks" aria-label="Search"> </div> <div class="col-md-1"> <button onclick="{filterTask}" class="btn btn-primary btn-sm">Filter anwenden</button> </div> <div class="col-md-1"> <button onclick="{clearFilter}" class="btn btn-primary btn-sm">Filter löschen</button> </div> </div> <div class="row"> <div each="{task in tasks}" class="col-md-3"> <task task="{task}"></task> </div> <add-task-button></add-task-button> <only-favourites-button ref="showOnlyFavouritesButton"></only-favourites-button> <task-modal ref="taskModal"></task-modal> <complete-task-modal ref="completeTaskModal"></task-modal> </div>', '', '', function(opts) {
    // Require tasky repository
    this.mixin('TaskyRepository');
    this.tasks = [];
    this.isFavouriteFilter = false;

    // In case the user wants to add a task. -> Gets called by add-task-button via parent...
    this.openAddTaskModal = function () {
      this.refs.taskModal.open();
    };

    // In case the user only show favourite tasks -> Gets called by only-favourites-button via parent...
    this.setFavouriteFilter = function(isFavourite) {
      this.isFavouriteFilter = isFavourite;
      this.filterTask();
    }

    // In case the user wants to update a specific task etc. -> Gets called by task via parent...
    this.deleteTask = function (taskToDelete) {
      this.taskRepoDeleteTask(taskToDelete).then(tasks => {
        this.tasks = tasks;
        this.update();
      });
    };

    // In case the user makes a task its its favourite
    this.toggleFavourite = function (task) {
      task.isFavourite = !task.isFavourite;
      this.taskRepoUpdateTask(task).then(tasks => {
        this.tasks = tasks;
        this.update();
      });
    }

    // In case the user wants to create a task etc. -> Gets called by task via parent...
    this.createTask = function (task) {
      this.taskRepoAddTask(task).then(tasks => {
        this.tasks = tasks;
        this.update();
      });
    }

    // In case the user wants to save changes done on a task...
    this.updateTask = function (task) {
      this.taskRepoUpdateTask(task).then(tasks => {
        this.tasks = tasks;
        this.update();
      });
    }

    // In case the user wants to edit a task
    this.editTask = function (task) {
      this.refs.taskModal.openWithTask(task);
    }

    // In case the user wants to complete a task
    this.completeTask = function (task) {
      // TODO: Uncomment after testing...
      //task.active = false;
      this.taskRepoUpdateTask(task).then((tasks) => {
        this.tasks = tasks;
        this.update();
        this.parent.completedTaskWithPoints(task.points);
        this.refs.completeTaskModal.open(task);
      });
    }

    // In case the user wants to filter
    this.filterTask = function () {
      const filterValue = this.refs.filterValue.value;
      this.taskRepoFilterTasks(filterValue, this.isFavouriteFilter).then(filteredTasks => {
        this.tasks = filteredTasks;
        this.update();
      });
    };

    this.clearFilter = function () {
      this.refs.filterValue.value = '';
      this.refs.showOnlyFavouritesButton.trigger('resetOnlyFavourites');
      this.taskRepoGetAllActiveTasks().then((tasks) => {
        this.tasks = tasks;
        this.update();
      });
    };

    this.on('mount', function () {
      // First load all available tasks...
      this.taskRepoGetAllActiveTasks().then((tasks) => {
        this.tasks = tasks;
        this.update();
      });
    });
});
