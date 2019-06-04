<task-overview>
  <header ref="header"></header>
  <side-nav></side-nav>
  <div class="task-overview-container container-fluid">
    <task-list></task-list>
  </div>

  <style media="screen">
    .task-overview-container {
      padding-top: 400px;
    }
    @media (min-width: 0em) {
      .task-overview-container {
        padding-left: 6em;
      }
    }
    @media (min-width: 68em) {
      .task-overview-container {
        padding-left: 15em;
      }
    }
  </style>

  <script type="text/javascript">
    this.completeTask = function (task) {
      this.refs.header.trigger('completeTask', task);
    }
  </script>

</task-overview>
