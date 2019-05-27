let TaskyRepository = {

  taskyRepoOpenAndInitialize: function() {
    return idb.openDB('tasky-db', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains('tasks')) {
          var tasksOs = db.createObjectStore('tasks', {
            keyPath: 'id',
            autoIncrement: true
          });
        }

        if (!db.objectStoreNames.contains('users')) {
          var usersOS = db.createObjectStore('users', {
            keyPath: 'id',
            autoIncrement: true
          });
          // Add dummy user...
          const dummyUser = {
            name: 'Pusheen The Cat',
            level: 1,
            experiencePoints: 50,
            skills: [
              'Skill 1', 'Skill 2', 'Skill 3'
            ]
          };
          usersOS.add(dummyUser);
        }
      }
    });
  },

  taskRepoAddTask: async function(task) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readwrite');
    var store = transaction.objectStore('tasks');
    store.add(task);
    return store.getAll();
  },

  taskRepoUpdateTask: async function(task) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readwrite');
    var store = transaction.objectStore('tasks');
    store.put(task);
    return store.getAll();
  },

  taskRepoDeleteTask: async function(task) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readwrite');
    var store = transaction.objectStore('tasks');
    store.delete(task.id);
    return store.getAll();
  },

  taskRepoAddDummyTask: async function() {
    const dummyTask = this.taskRepoGetDefaultTasks()[0];
    return this.taskRepoAddTask(dummyTask);
  },

  taskRepoGetAllTasks: async function() {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readonly');
    var store = transaction.objectStore('tasks');
    return store.getAll();
  },

  userRepoAddUser: async function(user) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['users'], 'readwrite');
    var store = transaction.objectStore('users');
    store.add(user);
    return store.getAll();
  },

  userRepoUpdateUser: async function(user) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['users'], 'readwrite');
    var store = transaction.objectStore('users');
    store.put(user);
    return store.getAll();
  },

  userRepoGetAllUsers: async function() {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['users'], 'readonly');
    var store = transaction.objectStore('users');
    return store.getAll();
  },
}
