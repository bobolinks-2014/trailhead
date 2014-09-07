$(document).ready(function(){
  $('.choose-photo').change(function(){
    var photoText = $('.choose-photo').val();
    var arr = photoText.split('\\');
    photoText = arr[arr.length-1];
    $('.choose-photo').hide();
    $('.submit-photo').show()
    $('.upload-button').append('<p class="photo-text">'+photoText+'</p>')
  });

});
