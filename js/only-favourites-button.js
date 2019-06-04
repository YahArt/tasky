riot.tag2('only-favourites-button', '<a onclick="{toggleOnlyFavourites}" href="#/task-overview" class="float"> <i class="{isFavourite: showOnlyFavourites, far: !showOnlyFavourites, fas: showOnlyFavourites} fa-heart my-float"></i> </a>', 'only-favourites-button .float,[data-is="only-favourites-button"] .float{ position: fixed; width: 60px; height: 60px; bottom: 120px; right: 40px; background-color: #3949AB; color: #FFF; border-radius: 50px; text-align: center; box-shadow: 2px 2px 3px #3949AB; } only-favourites-button .my-float,[data-is="only-favourites-button"] .my-float{ margin-top: 22px; } only-favourites-button .isFavourite,[data-is="only-favourites-button"] .isFavourite{ color: red !important; }', '', function(opts) {
    this.showOnlyFavourites = false;
    this.toggleOnlyFavourites = (e) => {
      this.showOnlyFavourites = !this.showOnlyFavourites;
      e.preventDefault();
      this.parent.setFavouriteFilter(this.showOnlyFavourites);
    }

    this.on('resetOnlyFavourites', () => {
      this.showOnlyFavourites = false;
      this.update();
    });

});
