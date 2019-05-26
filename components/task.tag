<task>
  <div class="task card">
    <div class="card-body">

      <h4 class="card-title">
        <a>{opts.task.name}</a>

        <p class="date">{opts.task.date.toLocaleDateString()}</p>
      </h4>
      <p class="card-text">{opts.task.description}</p>
      <div class="task-action-container">
        <a href="#/task-overview" onClick="{toggleFavourite}" class="{isFavourite: opts.task.isFavourite}">
          <i class="{far: !opts.task.isFavourite, fas: opts.task.isFavourite} fa-heart"></i>
        </a>
        <a onClick="{editTask}" href="#/task-overview">
          <i class="fas fa-pen"></i>
        </a>

        <a onClick="{deleteTask}" href="#/task-overview">
          <i class="fas fa-trash"></i>
        </a>

        <a href="#/task-overview">
          <i class="fas fa-check"></i>
        </a>
      </div>

    </div>
  </div>

  <script type="text/javascript">
    this.deleteTask = function()  {
      this.parent.deleteTask(this.opts.task);
    }

    this.toggleFavourite = function() {
      this.parent.toggleFavourite(this.opts.task);
    }

    this.editTask = function() {
      this.parent.editTask(this.opts.task);
    }

  </script>

  <style media="screen">
    .task {
      margin: 15px;
      min-height: 250px;
    }
    .card-body {
      background-color: #CDDC39;
    }
    .task-action-container {
      position: absolute;
      bottom: 15px;
      right: 15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    .task-action-container a {
      margin: 0 5px;
      color: inherit;
      transition: color 0.5s ease;
    }
    .task-action-container a:hover {
      color: white;
    }

    .date {
      font-size: 1rem;
      margin: 15px 0;
    }

    .card .card-body .card-text {
      color: inherit;
    }

    .isFavourite {
      color: red !important;
    }
  </style>

</task>
