<task-overview>
  <header ref="header"></header>
  <side-nav></side-nav>
  <div class="task-overview-container container-fluid">
    <task-list></task-list>
  </div>

  <style media="screen">
    .task-overview-container {
      padding-top: 300px;
      padding-left: 280px;
    }
  </style>

  <script type="text/javascript">
    this.completeTask = function(task) {
      this.refs.header.trigger('completeTask', task);
    }
  </script>

</task-overview>
