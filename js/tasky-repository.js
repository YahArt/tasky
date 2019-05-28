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
    let cursor = await store.openCursor();
    const results = [];
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true)
      results.push(cursor.value);
      cursor = await cursor.continue();
    }
    return results;
  },

  taskRepoUpdateTask: async function(task) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readwrite');
    var store = transaction.objectStore('tasks');
    store.put(task);
    let cursor = await store.openCursor();
    const results = [];
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true)
      results.push(cursor.value);
      cursor = await cursor.continue();
    }
    return results;
  },

  taskRepoDeleteTask: async function(task) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readwrite');
    var store = transaction.objectStore('tasks');
    store.delete(task.id);
    let cursor = await store.openCursor();
    const results = [];
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true)
      results.push(cursor.value);
      cursor = await cursor.continue();
    }
    return results;
  },

  taskRepoGetAllTasks: async function() {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readonly');
    var store = transaction.objectStore('tasks');
    return store.getAll();
  },

  taskRepoGetAllActiveTasks: async function() {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readonly');
    var store = transaction.objectStore('tasks');
    let cursor = await store.openCursor();
    const results = [];
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true)
      results.push(cursor.value);
      cursor = await cursor.continue();
    }
    return results;
  },

  taskRepoFilterTasks: async function(filterValue, onlyFavourites) {
    const db = await this.taskyRepoOpenAndInitialize();
    var transaction = db.transaction(['tasks'], 'readonly');
    var store = transaction.objectStore('tasks');
    let cursor = await store.openCursor();
    const results = [];
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true)
      if (filterValue) {
        // Check if filterValue is a potential date
        const date = new Date(filterValue);
        if (date && !isNaN(date.getTime())) {
          // Compare dates only by year month and day ignore hours etc. as we do not have any way to set them...
          if (task.date && task.date.year === date.year && task.date.monthIndex === date.monthIndex && task.date.day === date.day) {
            results.push(task);
          }
        }
        // No Date entered just search other properties
        else {
          // Allow filtering by name, description, skills or tags
          if (task.name.toLowerCase().includes(filterValue.toLowerCase()) || task.description.toLowerCase().includes(filterValue.toLowerCase()) || task.skills.some(s => s.toLowerCase().includes(filterValue.toLowerCase())) || task.tags.some(t => t.toLowerCase().includes(filterValue.toLowerCase()))) {
            results.push(task);
          }
        }
      } else {
        // Ignore filter value just add id
        results.push(task);
      }
      cursor = await cursor.continue();
    }
    // Depending on onlyFavourites flag only include onlyFavourites
    if (onlyFavourites) {
      return results.filter(r => r.isFavourite);
    }
    return results;
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
