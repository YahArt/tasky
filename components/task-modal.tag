<task-modal>
  <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="{hidden: this.editMode} modal-title w-100 font-weight-bold">Task erstellen</h4>
          <h4 class="{hidden: !this.editMode} modal-title w-100 font-weight-bold">Task editieren</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <div class="md-form">
                <input ref="taskName" required="required" type="text" id="taskName" class="form-control validate">
                <label class="{active: this.task.name}" for="taskName">Name des Tasks</label>
              </div>
            </div>

            <div class="col-md-4 offset-md-2">
              <div class="md-form">
                <input ref="currentTag" type="text" id="taskTags" class="form-control">
                <label for="taskTags">Tag eingeben</label>
                <span class="badge badge-pill badge-default" each="{tag, index in task.tags}">{tag}<i onclick="{removeTag}" class="fas fa-times ml-2"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 offset-md-1">
              <div class="md-form">
                <textarea ref="taskDescription" type="text" id="taskDescription" class="md-textarea form-control" rows="4"></textarea>
                <label class="{active: this.task.description}" for="taskDescription">Beschreibung des Tasks</label>
              </div>
            </div>

            <div class="col-md-4 offset-md-2">
              <div class="md-form">
                <button onclick="{addTag}" class="btn btn-primary btn-sm">Tag hinzufügen</button>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 offset-md-1">
              <div class="md-form">
                <input ref="taskDate" class="task-date flatpickr flatpickr-input" type="text" placeholder="Fälligkeitsdatum" readonly="readonly">
              </div>
            </div>

            <div class="col-md-4 offset-md-2">
              <div class="md-form">
                <p>Skills</p>
                <span class="badge badge-pill badge-default" each="{skill, index in task.skills}">{skill}<i onclick="{removeSkill}" class="fas fa-times ml-2"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 offset-md-1">
              <div class="md-form">
                <p>Priorität</p>
                <span onclick="{makeTaskPriority}" class="{priority: taskPriority.isPriority} badge badge-pill badge-default" each="{taskPriority, index in task.priorities}">{taskPriority.description}</span>
              </div>
            </div>

            <div class="col-md-4 offset-md-2">
              <div class="md-form">
                <p>Favorit</p>
                <i onclick="{toggleFavourite}" class="{isFavourite: task.isFavourite, far: !task.isFavourite, fas: task.isFavourite} fa-heart"></i>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button onclick="{createTask}" class="{hidden: this.editMode} btn btn-default">Task erstellen</button>
          <button onclick="{updateTask}" class="{hidden: !this.editMode} btn btn-default">Änderungen speichern</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-trigger text-center">
    <a ref="modalTrigger" href="#/taskOverview" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#taskModal"></a>
  </div>

  <script>
    const defaultTask = {
      name: '',
      description: '',
      isFavourite: false,
      tags: [],
      skills: [
        'Skill 1', 'Skill 2', 'Skill 3'
      ],
      priorities: [
        {
          description: 'Hoch',
          isPriority: true
        }, {
          description: 'Mittel',
          isPriority: false
        }, {
          description: 'Tief',
          isPriority: false
        }
      ]
    };

    this.updateModalInputFields = () => {
      this.refs.taskName.value = this.task.name;
      this.refs.taskDescription.value = this.task.description;
      this.refs.taskDate.value = this.task.date;
      this.update();
    }

    this.on('before-mount', () => {
      // Initialize form data here...
      this.task = defaultTask;
    });

    this.open = () => {
      this.editMode = false;
      console.log('in open...');
      this.task = defaultTask;
      this.updateModalInputFields();
      this.refs.modalTrigger.click();
    };

    this.openWithTask = (task) => {
      this.editMode = true;
      this.task = task;
      this.updateModalInputFields();
      this.refs.modalTrigger.click();
    };

    this.clearTaskPriorities = () => {
      for (var i = 0; i < this.task.priorities.length; i++) {
        this.task.priorities[i].isPriority = false;
      }
    };

    this.makeTaskPriority = (event) => {
      const priorityIndex = event.item.index;
      if (priorityIndex >= 0) {
        this.clearTaskPriorities();
        this.task.priorities[priorityIndex].isPriority = true;
        this.update();
      }
    };

    this.toggleFavourite = () => {
      this.task.isFavourite = !this.task.isFavourite;
    };

    this.createTask = () => {
      this.task.name = this.refs.taskName.value;
      this.task.description = this.refs.taskDescription.value;
      this.task.date = new Date(this.refs.taskDate.value);
      this.parent.createTask(this.task);
    };

    this.updateTask = () => {
      this.task.name = this.refs.taskName.value;
      this.task.description = this.refs.taskDescription.value;
      this.task.date = new Date(this.refs.taskDate.value);
      this.parent.updateTask(this.task)
    }

    this.removeTag = (event) => {
      const indexToRemove = event.item.index;
      if (indexToRemove >= 0) {
        this.task.tags.splice(indexToRemove, 1);
      }
    };

    this.removeSkill = (event) => {
      const indexToRemove = event.item.index;
      if (indexToRemove >= 0) {
        this.task.skills.splice(indexToRemove, 1);
      }
    };

    this.addTag = function () {
      const newTag = this.refs.currentTag.value;
      if (newTag !== '') {
        this.task.tags.push(newTag);
      }
    };

    this.on('mount', function () {
      $(".task-date").flatpickr({altInput: true, altFormat: "j F Y", dateFormat: "Y-m-d", locale: "de"});
    });
  </script>

  <style media="screen">
    .modal-trigger {
      display: none;
    }
    .modal-dialog {
      width: 50vw;
    }
    .badge {
      margin: 3px;
    }
    .priority {
      background-color: red !important;
    }
    .isFavourite {
      color: red !important;
    }

    .hidden {
      display: none;
    }
  </style>
</task-modal>
