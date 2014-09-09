// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require clusterer
//= require popup
//= require_tree .
$(document).ready(function() {
  $("#icon").on("click", function() {
    window.location.pathname = "/"
    initializeHome();
  })

  var request = $.ajax({
    url: '/sessions',
    type: 'GET',
    dataType: 'json'
  })

  request.done(function(user) {
    if (user.success == "fails"){
      $(".signin-button").show();
      $(".signup-button").show();
      $(".logout-button").hide();
      $(".comment-button").hide();
      $('.style-choose-photo').hide();
      $(".submit-photo").hide();
    }else{
      $(".signin-button").hide();
      $(".signup-button").hide();
      $(".logout-button").show();
      $(".comment-button").show();
      $('.style-choose-photo').show();
      $(".choose-photo").show();
    }
  })
})
