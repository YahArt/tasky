riot.tag2('task-modal', '<div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModalLabel" aria-hidden="true"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header text-center"> <h4 show="{this.editMode}" class="modal-title w-100 font-weight-bold">Task editieren</h4> <h4 hide="{this.editMode}" class="modal-title w-100 font-weight-bold">Task erstellen</h4> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body mx-3"> <div class="row"> <div class="col-md-4 offset-md-1"> <div class="md-form"> <input ref="taskName" required="required" type="text" id="taskName" class="form-control validate"> <label for="taskName">Name des Tasks</label> </div> </div> <div class="col-md-4 offset-md-2"> <div class="md-form"> <input ref="currentTag" type="text" id="taskTags" class="form-control"> <label for="taskTags">Tag eingeben</label> <span class="badge badge-pill badge-default" each="{tag, index in task.tags}">{tag}<i onclick="{removeTag}" class="fas fa-times ml-2"></i> </span> </div> </div> </div> <div class="row"> <div class="col-md-4 offset-md-1"> <div class="md-form"> <textarea ref="taskDescription" type="text" id="taskDescription" class="md-textarea form-control" rows="4"></textarea> <label for="taskDescription">Beschreibung des Tasks</label> </div> </div> <div class="col-md-4 offset-md-2"> <div class="md-form"> <button onclick="{addTag}" class="btn btn-primary btn-sm">Tag hinzufügen</button> </div> </div> </div> <div class="row"> <div class="col-md-4 offset-md-1"> <div class="md-form"> <input ref="taskDate" id="taskDate" class="task-date flatpickr flatpickr-input" type="text" placeholder="Fälligkeitsdatum" readonly="readonly"> </div> </div> <div class="col-md-4 offset-md-2"> <div class="md-form"> <p>Skills</p> <span class="badge badge-pill badge-default" each="{skill, index in task.skills}">{skill}<i onclick="{removeSkill}" class="fas fa-times ml-2"></i> </span> </div> </div> </div> <div class="row"> <div class="col-md-4 offset-md-1"> <div class="md-form"> <p>Priorität</p> <span onclick="{makeTaskPriority}" class="{priority: taskPriority.isPriority} badge badge-pill badge-default" each="{taskPriority, index in task.priorities}">{taskPriority.description}</span> </div> </div> <div class="col-md-4 offset-md-2"> <div class="md-form"> <p>Favorit</p> <i onclick="{toggleFavourite}" class="{isFavourite: task.isFavourite, far: !task.isFavourite, fas: task.isFavourite} fa-heart"></i> </div> </div> </div> </div> <div class="modal-footer d-flex justify-content-center"> <button hide="{this.editMode}" onclick="{createTask}" class="btn btn-default">Task erstellen</button> <button show="{this.editMode}" onclick="{updateTask}" class="btn btn-default">Änderungen speichern</button> </div> </div> </div> </div>', 'task-modal .modal-trigger,[data-is="task-modal"] .modal-trigger{ display: none; } task-modal .modal-dialog,[data-is="task-modal"] .modal-dialog{ width: 50vw; } task-modal .badge,[data-is="task-modal"] .badge{ margin: 3px; } task-modal .priority,[data-is="task-modal"] .priority{ background-color: red !important; } task-modal .isFavourite,[data-is="task-modal"] .isFavourite{ color: red !important; } task-modal .hidden,[data-is="task-modal"] .hidden{ display: none; }', '', function(opts) {
    this.mixin('TaskyRepository');
    const defaultTask = {
      name: '',
      description: '',
      isFavourite: false,
      points: 20,
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

    const flatPickrConfig = {
      altInput: true,
      altFormat: "j F Y",
      dateFormat: "Y-m-d",
      locale: "de"
    };

    this.updateModalInputFields = () => {
      this.refs.taskName.value = this.task.name;
      this.refs.taskDescription.value = this.task.description;

      if (this.task.date && !isNaN(this.task.date.getTime())) {

        const fp = flatpickr("#taskDate", flatPickrConfig);
        fp.setDate(this.task.date, false, flatPickrConfig.dateFormat);

      }

      $('#taskName').trigger("change");
      $('#taskDescription').trigger("change");
      this.update();
    }

    this.on('before-mount', () => {

      console.log('task-modal before-mount');
      this.editMode = false;
      this.task = defaultTask;
    });

    this.open = () => {
      this.userRepoGetAllUsers().then((users) => {
        this.editMode = false;
        this.task = defaultTask;
        this.task.skills = users[0].skills;
        this.updateModalInputFields();
        $('#taskModal').modal('show')
      });

    };

    this.openWithTask = (task) => {
      this.editMode = true;
      this.task = task;
      this.updateModalInputFields();
      $('#taskModal').modal('show')
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
      const selectedTaskPriorityDescription = this.task.priorities.filter(p => p.isPriority)[0].description;
      this.task.points = this.calculatePointsAccordingToPriority(selectedTaskPriorityDescription);
      this.parent.createTask(this.task);
    };

    this.updateTask = () => {
      this.task.name = this.refs.taskName.value;
      this.task.description = this.refs.taskDescription.value;
      this.task.date = new Date(this.refs.taskDate.value);
      const selectedTaskPriorityDescription = this.task.priorities.filter(p => p.isPriority)[0].description;
      this.task.points = this.calculatePointsAccordingToPriority(selectedTaskPriorityDescription);
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

    this.calculatePointsAccordingToPriority = function (priorityDescription) {
      switch (priorityDescription) {
        case "Hoch":
          return 50;
        case "Mittel":
          return 30;
        case "Tief":
          return 20;
        default:
          return 0;
      }
    }

    this.on('mount', function () {
      $(".task-date").flatpickr(flatPickrConfig);
    });
});
