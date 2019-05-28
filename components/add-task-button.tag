<add-task-button>
  <!-- Inspiration from:  https://codepen.io/androidcss/pen/yOopGp -->
  <a onclick="{emitAddingTask}" href="#/task-overview" class="float">
    <i class="fa fa-plus my-float"></i>
  </a>

  <script type="text/javascript">

    this.emitAddingTask = (e) => {
      e.preventDefault();
      this.trigger('addTask');
    }
  </script>

  <style media="screen">
    .float {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 40px;
      right: 40px;
      background-color: #0C9;
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      box-shadow: 2px 2px 3px #999;
    }
    .my-float {
      margin-top: 22px;
    }
  </style>

</add-task-button>
