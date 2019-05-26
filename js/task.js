riot.tag2('task', '<div class="task card"> <div class="card-body"> <h4 class="card-title"> <a>{opts.task.id}</a> <p class="date">{opts.task.date.toLocaleDateString()}</p> </h4> <p class="card-text">{opts.task.description}</p> <div class="task-action-container"> <a href="#/task-overview" onclick="{toggleFavourite}" class="{isFavourite: opts.task.isFavourite}"> <i class="{far: !opts.task.isFavourite, fas: opts.task.isFavourite} fa-heart"></i> </a> <a href="#/task-overview"> <i class="fas fa-pen"></i> </a> <a onclick="{deleteTask}" href="#/task-overview"> <i class="fas fa-trash"></i> </a> <a href="#/task-overview"> <i class="fas fa-check"></i> </a> </div> </div> </div>', 'task .task,[data-is="task"] .task{ margin: 15px; min-height: 250px; } task .card-body,[data-is="task"] .card-body{ background-color: #CDDC39; } task .task-action-container,[data-is="task"] .task-action-container{ position: absolute; bottom: 15px; right: 15px; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; } task .task-action-container a,[data-is="task"] .task-action-container a{ margin: 0 5px; color: inherit; transition: color 0.5s ease; } task .task-action-container a:hover,[data-is="task"] .task-action-container a:hover{ color: white; } task .date,[data-is="task"] .date{ font-size: 1rem; margin: 15px 0; } task .card .card-body .card-text,[data-is="task"] .card .card-body .card-text{ color: inherit; } task .isFavourite,[data-is="task"] .isFavourite{ color: red !important; }', '', function(opts) {
    this.deleteTask = function()  {
      this.parent.deleteTask(this.opts.task);
    }

    this.toggleFavourite = function() {
      this.parent.toggleFavourite(this.opts.task);
    }

});
