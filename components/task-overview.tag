<task-overview>
  <header ref="header"></header>
  <side-nav></side-nav>
  <div class="task-overview-container container-fluid">
    <task-list></task-list>
  </div>

  <style media="screen">
    .task-overview-container {
      padding-top: 50px;
      padding-left: 250px;
    }
  </style>

  <script type="text/javascript">
    this.completedTaskWithPoints = function(points) {
      this.refs.header.trigger('completedTaskWithPoints', points);
    }
  </script>

</task-overview>
