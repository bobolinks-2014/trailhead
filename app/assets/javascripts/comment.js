$(document).ready(function() {
  var tree = 0;

  $(".comment-button").on('click', function(event){
    event.preventDefault();
    initializeCommentForm();
    showCommentForm();

    function initializeCommentForm() {      
      $(".comment-form .fa").css("color", "gray")
      var rangeHash = {0: "easy", 1: "moderate", 2: "hard"}
      var range = 1.5
      $(".comment-form input[type=range]").val(range)
      $(".comment-form #range").text(rangeHash[Math.floor(range)])
      
      $('.comment-form input[type=range]').change(function(){
        range = $('.comment-form input[type=range]').val()
        $(".comment-form #range").text(rangeHash[Math.floor(range)])
      })
    } 

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
    console.log(tree)
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
      if (response.success === 0){
        $(".comment-form").bPopup().close()
        $(".comment-form input[type=range]").val(range);
        $(".comment-form textarea[name*=tip").val("");
        $(".comment-form textarea[name*=review]").val("");
        $(".comment-form input[type=date]").val("");
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

