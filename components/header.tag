<header>
  <div class="header">
    <h1>Tasky</h1>
    <!-- Image is from: https://t2.rbxcdn.com/f37dbf676862a314cdb3f98c08460146-->
    <img src="./images/profile-picture.png" class="profile-picture rounded-circle" alt="Profile Picture">
    <p>Pusheen The Cat</p>
    <p>Level 1</p>
    <div class="progress">
      <p class="progress-text">HP: </p>
      <div class="progress-bar progress-bar-striped progress-bar-animated progress-health" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%">100/150</div>
    </div>

    <div class="progress">
      <p class="progress-text">MP: </p>
      <div id="health" class="progress-bar progress-bar-striped progress-bar-animated progress-magic" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%">25/100</div>
    </div>
  </div>


</div>

  <style media="screen">
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400px;
      /*Inspiration from: https://codepen.io/sdthornton/pen/wBZdXq*/
    }
    .profile-picture {
      margin: 10px 0;
      width: 150px;
      height: auto;
    }

    .progress {
      width: 350px;
      margin-bottom: 15px;
    }

    .progress-text {
      font-weight: bold;
      margin-right: 15px;
    }

    .progress-health {
      background-color: #4CAF50;
    }

    .progress-magic {
      background-color: #9C27B0;
    }
  </style>

</header>
