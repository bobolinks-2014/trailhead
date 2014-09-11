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
      if (response.length != 5){
        $('.see-more-comments-button').hide();
      };

      var rangeHash = {0: "easy", 1: "moderate", 2: "hard"};

      function ratingTrees(rating){
        var trees = '';
        for(i = 0; i < rating; i++){
          trees = trees + '<i class="fa fa-tree" style="color: #143914"></i>';
        }
        for(i = 0; i < 5-rating; i++){
          trees = trees + '<i class="fa fa-tree" style="color: #d3d3d3"></i>';
        }
        return trees;
      }

      for(i = 0; i < response.length; i++){
        $('.comment-section').last().after(
          '<div class="comment-section"><div class="one-comment" data-id="'+ response[i].id +'"><div class="comment-top"><div class="comment-top-right"> rating: '+ ratingTrees(response[i].rating) +' difficulty: '+ rangeHash[response[i].difficulty] +'</div></div><div class="comment-review"><div class="comment-review-body"><p>'+ response[i].review +'</p></div></div><div class="comment-bottom"><div class="comment-tip"><p><strong>Tip: </strong>'+response[i].tip+'</p></div><div class="comment-date-hiked"></div><div class="comment-top-left"> Authored by: <strong>'+response[i].user.username+'</strong> | date posted: '+response[i].created_at+' | date hiked: '+response[i].date_hike+'</div></div></div></div>'
          )
      };

    });

    return request;
  });
});
