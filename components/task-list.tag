<task-list>
  <div class="row">
    <div class="col-md-7 md-form mt-0">
      <input ref="filterValue" class="form-control" type="text" placeholder="Durchsuche deine Tasks" aria-label="Search">
    </div>
    <div class="col-md-2 offset-md-1">
      <button onclick="{filterTask}" class="btn btn-primary btn-sm">Filter anwenden</button>
    </div>

    <div class="col-md-2">
      <button onclick="{clearFilter}" class="btn btn-primary btn-sm">Filter löschen</button>
    </div>
  </div>

  <div class="row">
    <div each="{task in displayedTasks}" class="col-md-3">
      <task task="{task}"></task>
    </div>
    <add-task-button ref="addTaskButton"></add-task-button>
    <task-modal ref="taskModal"></task-modal>
  </div>

  <script type="text/javascript">
    // Require tasky repository
    this.mixin('TaskRepository');
    this.allTasks = [];
    this.filteredTasks = [];
    this.displayedTasks = [];
    // In case the user wants to update a specific task etc. -> Gets called by task via parent...
    this.deleteTask = function (taskToDelete) {
      this.taskRepoDeleteTask(taskToDelete).then(tasks => {
        this.allTasks = tasks;
        this.displayedTasks = tasks;
        this.update();
      });
    };

    // In case the user makes a task its its favourite
    this.toggleFavourite = function (task) {
      task.isFavourite = !task.isFavourite;
      this.taskRepoUpdateTask(task).then(tasks => {
        this.allTasks = tasks;
        this.displayedTasks = tasks;
        this.update();
      });
    }

    // In case the user wants to create a task etc. -> Gets called by task via parent...
    this.createTask = function (task) {
      this.taskRepoAddTask(task).then(tasks => {
        this.allTasks = tasks;
        this.displayedTasks = tasks;
        this.update();
      });
    }

    // In case the user wants to save changes done on a task...
    this.updateTask = function (task) {
      this.taskRepoUpdateTask(task).then(tasks => {
        this.allTasks = tasks;
        this.displayedTasks = tasks;
        this.update();
      });
    }

    // In case the user wants to edit a task
    this.editTask = function (task) {
      this.refs.taskModal.openWithTask(task);
    }

    // In case the user wants to filter
    this.filterTask = function () {
      const filterValue = this.refs.filterValue.value;
      if (filterValue) {
        // Allow filtering via title and description
        // TODO: Add filtering via tags etc.
        this.filteredTasks = this.allTasks.filter(t => t.name.toLowerCase().includes(filterValue.toLowerCase()) || t.description.toLowerCase().includes(filterValue.toLowerCase()));
        this.displayedTasks = this.filteredTasks;
        this.update();
      }
    };

    this.clearFilter = function () {
      this.refs.filterValue.value = '';
      this.displayedTasks = this.allTasks;
      this.update();
    };

    this.on('mount', function () {
      // First load all available tasks...
      this.taskRepoGetAllTasks().then((tasks) => {
        this.allTasks = tasks;
        this.displayedTasks = this.allTasks;
        this.update();
      });


      // In case the user wants to add a new task...
      this.refs.addTaskButton.on('addTask', () => {
        // Launch modal so that the user can enter the appropriate information
        this.refs.taskModal.open();
      });

    });
  </script>

</task-list>
