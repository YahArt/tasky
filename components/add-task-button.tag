<add-task-button>
  <!-- Inspiration from:  https://codepen.io/androidcss/pen/yOopGp -->
  <a onclick="{openAddTaskModal}" href="#/task-overview" class="float">
    <i class="fa fa-plus my-float"></i>
  </a>

  <script type="text/javascript">
    this.openAddTaskModal = (e) => {
      e.preventDefault();
      this.parent.openAddTaskModal();
    }
  </script>

  <style media="screen">
    .float {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 40px;
      right: 40px;
      background-color: #3949AB;
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      box-shadow: 2px 2px 3px #3949AB;
    }
    .my-float {
      margin-top: 22px;
    }
  </style>

</add-task-button>
