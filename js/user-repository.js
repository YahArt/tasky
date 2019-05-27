let UserRepository = {
  openAndInitialize: function() {
    this.dbPromise = idb.openDB('tasky-db', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
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
    return this.dbPromise;
  },

  userRepoAddUser: function(user) {
      return this.openAndInitialize().then(() => {
        return this.dbPromise.then(function(db) {
          var transaction = db.transaction(['users'], 'readwrite');
          var store = transaction.objectStore('users');
          store.add(user);
          return store.getAll();
        });
      });
  },

  userRepoUpdateUser: function(user) {
      return this.openAndInitialize().then(() => {
        return this.dbPromise.then(function(db) {
          var transaction = db.transaction(['users'], 'readwrite');
          var store = transaction.objectStore('users');
          store.put(user);
          return store.getAll();
        });
      });
  },

  userRepoGetAllUsers: function() {
    return this.openAndInitialize().then(() => {
      return this.dbPromise.then(function(db) {
        var transaction = db.transaction(['users'], 'readonly');
        var store = transaction.objectStore('users');
        return store.getAll();
      });
    });
  },
};
