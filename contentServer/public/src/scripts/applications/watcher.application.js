"use strict";
//This app is not requiring angular.

$(document).ready(function () {
  var socket = io.connect('localhost:1337');
  var slide = $('#slide');
  var flash = $('#flash');
  slide.hide();
  flash.show();

  socket.on('serverMsg', function (data) {
    slide.show();
    flash.hide();
    if(!data) {
      // stack overflow
      return;
    } else {
      $('#slide-title').text(data.title);
      $('#slide-text').text(data.text);
      $('#slide-content').attr('src', '/uploads/'+data.content.fileName);
      $('#slide-content').attr('alt', data.title);
    }
  });
})
