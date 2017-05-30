/*jslint browser: true*/
/*global $, jQuery*/

  var users = ["FreeCodeCamp", "Meluist", "EnJoy_The_Silence_", "Freack1982"]; 
  
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/streams/' + users,
 headers: {
   'Client-ID': 'magndgamnhcvyyvfed0xuscpsswl7a'
 },
 success: function(data) {
   console.log(data);
 }
});


$(document).ready(function () {  
  "use strict";
  
});