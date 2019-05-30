const getDefaultBadgesForSkill = function(skillName) {
  return [{
      name: `Anfänger der ${skillName}`,
      pointsToComplete: 100,
      currentPoints: 0,
      completed: false
    },

    {
      name: `Novize der ${skillName}`,
      pointsToComplete: 300,
      currentPoints: 0,
      completed: false
    },

    {
      name: `Meister der ${skillName}`,
      pointsToComplete: 3000,
      currentPoints: 0,
      completed: false
    }
  ];
};

let TaskyRepository = {

  taskyRepoGetDefaultBadgesForSkill: function(skillName) {
    return getDefaultBadgesForSkill(skillName);
  },

  taskyRepoOpenAndInitialize: function() {
    return idb.openDB('tasky-db', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {

        // Setup task storage
        if (!db.objectStoreNames.contains('tasks')) {
          var tasksOs = db.createObjectStore('tasks', {
            keyPath: 'id',
            autoIncrement: true
          });
        }

        // Setup user storage
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
            scoredPoints: 0,
            skills: [{
                name: 'Effizienz',
                badges: getDefaultBadgesForSkill('Effizienz')
              },
              {
                name: 'Teamfähigkeit',
                badges: getDefaultBadgesForSkill('Teamfähigkeit')
              },
              {
                name: 'Schnelligkeit',
                badges: getDefaultBadgesForSkill('Schnelligkeit')
              },
              {
                name: 'Kommunikation',
                badges: getDefaultBadgesForSkill('Kommunikation')
              },
              {
                name: 'Kreativität',
                badges: getDefaultBadgesForSkill('Kreativität')
              },
              {
                name: 'Organisation',
                badges: getDefaultBadgesForSkill('Organisation')
              },
              {
                name: 'Soziale Kompetenz',
                badges: getDefaultBadgesForSkill('Soziale Kompetenz')
              },
              {
                name: 'Problemlösung',
                badges: getDefaultBadgesForSkill('Problemlösung')
              },

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
    const isSameDate = (a, b) => {
      return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };
    while (cursor) {
      const task = cursor.value;
      if (task && task.active === true) {
        if (filterValue) {
          // Check if filterValue is a potential date
          const date = new Date(filterValue);
          if (date && !isNaN(date.getTime())) {
            // Compare dates only by year month and day ignore hours etc. as we do not have any way to set them...
            if (isSameDate(date, task.date)) {
              results.push(task);
            }
          }
          // No Date entered just search other properties
          else {
            // Allow filtering by name, description, skills or tags
            if (task.name.toLowerCase().includes(filterValue.toLowerCase()) || task.description.toLowerCase().includes(filterValue.toLowerCase()) || task.skills.some(s => s.name.toLowerCase().includes(filterValue.toLowerCase())) || task.tags.some(t => t.toLowerCase().includes(filterValue.toLowerCase()))) {
              results.push(task);
            }
          }
        } else {
          // Ignore filter value just add id
          results.push(task);
        }
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
