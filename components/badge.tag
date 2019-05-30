<badge>
  <div class="md-form">
    <h4 class="text-center">{this.opts.badge.name} ({this.opts.badge.currentPoints} von {this.opts.badge.pointsToComplete} Punkten erreicht)<i show="{this.opts.badge.completed}" class="status completed fas fa-check-circle"></i><i show="{!this.opts.badge.completed}" class="status incomplete fas fa-times-circle"></i></h4>

    <div class="badge-progres-container">
      <div id="badgeProgress{this.opts.index}" class="ldBar lBar-label label-center" data-value="{this.percentage}" data-stroke="data:ldbar/res,stripe(#ff9,#fc9,1)" style="width:100%;height:100;margin:auto" data-stroke-width="10" data-aspect-ratio="none"></div>
    </div>
  </div>

  <script>
    this.calculatePercentage = function () {
      this.percentage = (100 / this.opts.badge.pointsToComplete) * this.opts.badge.currentPoints;
      if (this.progressElement) {
        this.progressElement.set(this.percentage);
      }
    }
    this.on('mount', function () {
      const uniqueId = `#badgeProgress${this.opts.index}`;
      this.progressElement = new ldBar(uniqueId);
      this.calculatePercentage();
      this.update();
    });
  </script>

  <style media="screen">
    .ldBar-label {
      font-size: 1.5em;
    }
    .badge-progress-container {
      width: 450px;
    }
    .status {
      position: absolute;
      right: 15px;
    }

    .completed {
      color: green !important;
    }

    .incomplete {
      color: red !important;
    }
  </style>
</badge>
