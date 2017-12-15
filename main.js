/*jslint browser: true*/
'use strict';

var users = ['FreeCodeCamp', 'DavyJonesBR', 'Realms', 'ExtraCredits', 'Vezley', 'YoDa', 'smashdota', 'Alinity', 'emilycc'];

var userContainer = document.querySelector('.users'),
    indexPointer = document.querySelector('.index-pointer'),
    navAll = document.querySelector('.all a'),
    navOnline = document.querySelector('.users-online a'),
    navOffline = document.querySelector('.users-offline a');

var userDisplayStatus = 'all';

function callAPI() {
  
  clearUsers();
  
  users.forEach(function(users) {
  
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.twitch.tv/kraken/streams/' + users, true);
  request.setRequestHeader('Client-ID', 'magndgamnhcvyyvfed0xuscpsswl7a');

  request.onload = function() {
    
    if (request.status >= 200 && request.status < 400) {
      
      var game, status, logo;
      
      var data = JSON.parse(request.responseText);
      console.log(data);

      
      if (data.stream === null) {
        game = "Offline";
        status = "offline";

      } else if (data.stream === undefined) {
        game = "Acount Closed";
        status = "offline";

      } else {
          game = data.stream.game;
          status = "online";
      }
      
      logo = data.stream === null ? 'https://d30y9cdsu7xlg0.cloudfront.net/png/90580-200.png' : data.stream.channel.logo;
      
      if (userDisplayStatus === 'all' || (userDisplayStatus === 'online' && data.stream !== null) || (userDisplayStatus === 'offline' && data.stream === null)) {
        
        userContainer.innerHTML += '<div class="' + status + '"><img src="' + logo + '"><a href="https://www.twitch.tv/' + users.toLocaleLowerCase() + '">' + users + '</a><p>' + game + '</p></div>';
        
      } else {
        
        return;
      }
    

    } else {
      console.log('Server return error');
    }
};

request.onerror = function() {
  console.log('Connection error');
};

request.send();
  
});
}

function clearUsers() {
  userContainer.innerHTML = '';
}

function clearNavLinks() {
  navAll.classList.remove('selected');
  navOnline.classList.remove('selected');
  navOffline.classList.remove('selected');
}



navAll.addEventListener('click', function() {
  indexPointer.setAttribute('style','margin-left: 40px;');
  userDisplayStatus = 'all';
  clearNavLinks();
  this.classList.add('selected');
  callAPI();
});

navOnline.addEventListener('click', function() {
  indexPointer.setAttribute('style','margin-left: 180px;');
  userDisplayStatus = 'online';
  clearNavLinks();
  this.classList.add('selected');
  callAPI();  
});

navOffline.addEventListener('click', function() {
  indexPointer.setAttribute('style','margin-left: 370px;');
  userDisplayStatus = 'offline';
  clearNavLinks();
  this.classList.add('selected');
  callAPI();
});


callAPI();



 



