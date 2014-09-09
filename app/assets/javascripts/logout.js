$(document).ready(function() {

  $(".logout-button").on('click', function(event){
    event.preventDefault();

    var request = $.ajax({
      url: "/logout",
      type: "GET"
    });

    request.done(function(response){
      $(".logout-button").hide();
      $(".signin-button").show();
      $(".signup-button").show();
      $('.signin-form button').show();
      $('.signup-form button').show();
      $('.center').show();
      $('.close-button.signin').show();
      $('.close-button.signup').show();
      $('.signin-form .message').text("");
      $('.signup-form .message').text("");
      $('.continue-button.signin').hide();
      $('.continue-button.signup').hide();
      $('.style-choose-photo').hide();
      $(".comment-button").hide();
      $(".choose-photo").hide();
      $(".submit-photo").hide();
    });

    return request;
    });
  });

