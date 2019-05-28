<complete-task-modal>
  <div class="modal fade" id="completedTaskModal" tabindex="-1" role="dialog" aria-labelledby="completeTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">{task.name} wurde erfolgreich abgeschlossen</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3 text-center">
          <h4>Sie haben Ihre Fertigkeiten in folgenden Bereichen verbessert</h4>
          <span class="badge badge-pill badge-default" each="{skill, index in task.skills}">{skill}</span>
          <br>
          <br>
          <h4>und erhalten hierfür <span class="task-score">{task.points} Punkte</span></h4>
        </div>
      </div>
    </div>
  </div>

  <script>
    const defaultTask = {
      name: 'Test',
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

    this.on('before-mount', () => {
      this.task = defaultTask;
    });

    this.open = (completedTask) => {
      this.task = completedTask;
      this.update();
      $('#completedTaskModal').modal('show')

    };
  </script>

  <style media="screen">
    .badge {
      margin: 3px;
    }

    .task-score {
      color: #2bbbad;
      font-weight: bold;
      font-size: 1.2rem;
    }
  </style>
</complete-task-modal>
