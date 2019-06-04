<only-favourites-button>
  <!-- Inspiration from: https://codepen.io/androidcss/pen/yOopGp -->
  <a onclick="{toggleOnlyFavourites}" href="#/task-overview" class="float">
    <i class="{isFavourite: showOnlyFavourites, far: !showOnlyFavourites, fas: showOnlyFavourites} fa-heart my-float"></i>
  </a>

  <script type="text/javascript">
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

  </script>

  <style media="screen">
    .float {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 120px;
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

    .isFavourite {
      color: red !important;
    }
  </style>

</only-favourites-button>
