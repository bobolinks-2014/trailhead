$(document).ready(function(){

  $('.see-more-comments-button').on('click', function(event){
    event.preventDefault();
    var currentID = $('.one-comment').last().attr('data-id');
    var trailID = (/\d+/).exec(window.location.pathname);

    var request = $.ajax({
      url: "/more_comments",
      type: "GET",
      data: { trail: { current_id: currentID, trail: trailID } },
      dataType: "json"
    });

    request.done(function(response){
      for(i = 0; i < response.length; i++){
        $('.one-comment').last().after(
          '<div class="one-comment" data-id="' + response[i].id + '"><div class="comment-top"><div class="comment-top-left">' + response[i].user.username + ' ' + response[i].date_hiked + '</div><div class="comment-top-right">rating: ' + response[i].rating + ' difficulty: ' + response[i].difficulty + '</div></div><div class="comment-review"><div class="comment-review-body"><p>' + response[i].review + '</p></div></div><div class="comment-bottom"><div class="comment-tip"><p>Tip:' + response[i].tip + ' </p></div><div class="comment-date-hiked">date hiked:' + response[i].date_hiked + '</div></div></div>'
          )

      };

    });

    return request;
  });
});
