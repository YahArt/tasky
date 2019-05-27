let TaskRepository = {

  openAndInitialize: function() {
    this.dbPromise = idb.openDB('tasky-db', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains('tasks')) {
          var tasksOs = db.createObjectStore('tasks', {
            keyPath: 'id',
            autoIncrement: true
          });
        }
      }
    });
    return this.dbPromise;
  },

  taskRepoAddTask: function(task) {
    return this.openAndInitialize().then(() => {
      return this.dbPromise.then(function(db) {
        var transaction = db.transaction(['tasks'], 'readwrite');
        var store = transaction.objectStore('tasks');
        store.add(task);
        return store.getAll();
      });
    });
  },

  taskRepoUpdateTask: function(task) {
      return this.openAndInitialize().then(() => {
        return this.dbPromise.then(function(db) {
          var transaction = db.transaction(['tasks'], 'readwrite');
          var store = transaction.objectStore('tasks');
          store.put(task);
          return store.getAll();
        });
      });
  },

  taskRepoDeleteTask: function(task) {
    return this.openAndInitialize().then(() => {
      return this.dbPromise.then(function(db) {
        var transaction = db.transaction(['tasks'], 'readwrite');
        var store = transaction.objectStore('tasks');
        store.delete(task.id);
        return store.getAll();
      });
    });
  },

  taskRepoAddDummyTask: function() {
    const dummyTask = this.taskRepoGetDefaultTasks()[0];
    return this.taskRepoAddTask(dummyTask);
  },

  taskRepoGetAllTasks: function() {
    return this.openAndInitialize().then(() => {
      return this.dbPromise.then(function(db) {
        var transaction = db.transaction(['tasks'], 'readonly');
        var store = transaction.objectStore('tasks');
        return store.getAll();
      });
    });
  },
}
