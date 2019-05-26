let TaskRepository = {

  taskRepoInitialize: function() {
    this.dbPromise = idb.openDB('tasky-db', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains('tasks')) {
          var tasksOS = db.createObjectStore('tasks', {keyPath: 'id', autoIncrement: true});
        }
      },
    });
  },

  taskRepoAddTask: function(task) {
    return this.dbPromise.then(function (db) {
      var transaction = db.transaction(['tasks'], 'readwrite');
      var store = transaction.objectStore('tasks');
      store.add(task);
      return store.getAll();
    });
  },

  taskRepoUpdateTask: function(task) {
    return this.dbPromise.then(function (db) {
      var transaction = db.transaction(['tasks'], 'readwrite');
      var store = transaction.objectStore('tasks');
      store.put(task);
      return store.getAll();
    });
  },

  taskRepoDeleteTask: function(task) {
    return this.dbPromise.then(function (db) {
      var transaction = db.transaction(['tasks'], 'readwrite');
      var store = transaction.objectStore('tasks');
      store.delete(task.id);
      return store.getAll();
    });
  },

  taskRepoAddDummyTask: function() {
    const dummyTask = this.taskRepoGetDefaultTasks()[0];
    return this.taskRepoAddTask(dummyTask);
  },

  taskRepoGetAllTasks: function() {
    return this.dbPromise.then(function (db) {
      var transaction = db.transaction(['tasks'], 'readonly');
      var store = transaction.objectStore('tasks');
      return store.getAll();
    });
  },

  init: function() {
    this.taskRepoInitialize();
  },

  taskRepoGetDefaultTasks: function() {
    let tasks = [];
    for (var i = 0; i < 10; i++) {
      let dummyTask = {
        title: `Task ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: new Date(),
        priority: 1,
        notificationType: 1,
        tags: [
          `Tag ${i}`
        ],
        skillSet: [
          `Skill ${i}`
        ],
        isFavourite: true,
        completed: false,
      };

      tasks.push(dummyTask);
    }
    return tasks;

  },

  taskRepoGetActiveTasks: function() {
    // TODO: Check indexedDb if no data available return via getDefaultTasks
    return this.taskRepoGetDefaultTasks();
  }
}
