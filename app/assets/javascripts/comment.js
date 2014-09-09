$(document).ready(function() {
  var tree = 0;

  $(".comment-button").on('click', function(event){
    event.preventDefault();
    initializeCommentForm();
    showCommentForm();

    function initializeCommentForm() {      
      $(".comment-form .fa").css("color", "gray");

      var levelDescription = ["children and elderly, trails are generally in good condition, under 300 foot elevation gain, under 4 miles round trip", "someone in good hiking condition, trails are generally in good condition, between 300 and 1000 foot increase in elevation, between 4 and 10 miles in length", "someone in excellent hiking condition, trails are not always in good condition, over 1000 foot increase in elevation, over 10 miles in length"];

      var rangeHash = {0: "Easy:", 1: "Moderate:", 2: "Hard:"};
      var range = 1.5;
      $(".comment-form input[type=range]").val(range);
      $(".comment-form #range").text(rangeHash[Math.floor(range)]);
      $(".difficulty-text").text(levelDescription[Math.floor(range)]);
      
      $('.comment-form input[type=range]').change(function(){
        range = $('.comment-form input[type=range]').val();
        $(".comment-form #range").text(rangeHash[Math.floor(range)]);
        $(".difficulty-text").text(levelDescription[Math.floor(range)]);
      });
    }; 

    function showCommentForm() {
      $('.comment-form').bPopup({
        modalClose: false,
        opacity: 0.6,
        positionStyle: 'fixed',
        modalColor: '#CFDBC5',
        modalClose: true//'fixed' or 'absolute'
      });

      $(".comment-form .fa-tree").on('click', function(event){
        tree = Number($(this).attr('class').split(" ").pop())
        for(i=0; i < tree; i++){
          $($(".comment-form .fa-tree")[i]).css("color","green")
        }
        for(i=tree; i< 5; i++){
          $($(".comment-form .fa-tree")[i]).css("color","gray")
        }
      })
    };
  });

  $('.comment-form button').on('click', function(event){
    var rating = tree;
    var difficulty = Number($(".comment-form input[type=range]").val());
    var tip = $(".comment-form textarea[name*=tip").val();
    var review = $(".comment-form textarea[name*=review]").val();
    var date_hiked = $(".comment-form input[type=date]").val();
    var pattern = new RegExp(/\d+/)
    var trail_id = Number(pattern.exec(window.location.pathname))
    var request = $.ajax({
      url: "/trails/"+trail_id+"/comments",
      type: "POST",
      data: {comments: {trail_id: trail_id, rating: rating, difficulty: difficulty, tip: tip, review: review, date_hiked: date_hiked} },
      dataType: "json"
    });  
    request.done(function(response){
      debugger;
      if (response.success != 1){
        $(".comment-form").bPopup().close()
        $(".comment-form input[type=range]").val(range);
        $(".comment-form textarea[name*=tip").val("");
        $(".comment-form textarea[name*=review]").val("");
        $(".comment-form input[type=date]").val("");
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dateString = year + '-' + month + '-' + day;

        $('.comment-section').first().before(
          '<div class="comment-section"><div class="one-comment" data-id="'+ response.id +'"><div class="comment-top"><div class="comment-top-right"> rating: '+ response.rating +' difficulty: '+ response.difficulty +'</div></div><div class="comment-review"><div class="comment-review-body"><p>'+ response.review +'</p></div></div><div class="comment-bottom"><div class="comment-tip"><p><strong>Tip: </strong>'+response.tip+'</p></div><div class="comment-date-hiked"></div><div class="comment-top-left"> Authored by: <strong>'+response.user.username+'</strong> | date posted: '+ dateString +' | date hiked: '+ response.date_hiked +'</div></div></div></div>'
          )
      }
      else if (response.success === 1){
        var message = response.message;
        $('.comment-form .message').show();
        $('.comment-form .message').text(message);
        $('.comment-form .message').css("color","red");
      }
    });
  });
});

