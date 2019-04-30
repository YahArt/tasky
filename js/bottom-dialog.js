riot.tag2('bottom-dialog', '<div class="modal fade bottom" id="bottomModal" tabindex="-1" role="dialog" aria-labelledby="bottomModalLabel" aria-hidden="true" data-backdrop="false"> <div class="modal-dialog modal-fluid modal-frame modal-bottom" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="{modal-title: true, error: error, success: !error}" id="bottomModalLabel">{title}</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="{modal-body: true, error: error}"> {message} </div> <div class="modal-footer"> <button type="button" class="{btn: true, btn-secondary: !error, btn-danger: error}" data-dismiss="modal">Close</button> </div> </div> </div> </div> <button ref="showModalButton" id="bottomModalActivate" type="button" class="btn btn-danger" data-toggle="modal" data-target="#bottomModal"></button>', 'bottom-dialog #bottomModalActivate,[data-is="bottom-dialog"] #bottomModalActivate{ display: none; } bottom-dialog .modal-title,[data-is="bottom-dialog"] .modal-title{ font-weight: bold; } bottom-dialog .error,[data-is="bottom-dialog"] .error{ color: red; } bottom-dialog .success,[data-is="bottom-dialog"] .success{ color: green; }', '', function(opts) {
this.on("toggle", function(messageObj) {
  // Update message properties
  this.title = messageObj.title;
  this.message = messageObj.message;
  this.error = messageObj.error;
  this.update();
  return this.refs.showModalButton.click();
});
});
