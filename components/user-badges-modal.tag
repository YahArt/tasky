<user-badges-modal>
  <div class="modal fade" id="badgeModal" tabindex="-1" role="dialog" aria-labelledby="badgeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Badge Übersicht zu {skill.name}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="row">
            <div each="{badge, index in skill.badges}" class="col-12">
              <badge index="{index}" badge="{badge}"></badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <script>
  const defaultSkill = {
    name: '',
    badges: []
  };

  this.on('before-mount', () => {
    // Initialize form data here...
    this.skill = defaultSkill;
  });

  this.openWithSkill = (skill) => {
    this.skill = skill;
    this.update();
    $('#badgeModal').modal('show')
  };
  </script>

</user-badges-modal>
