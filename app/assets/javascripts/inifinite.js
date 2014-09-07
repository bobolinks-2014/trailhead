$(document).ready(function(){
	$('button.load-more-comments').on('click', function(event){
		event.preventDefault();

		var currentID = $($('.comments-body').children().last()).attr('data-id');
		var trailID = (/\d+/).exec(window.location.pathname);

		var request = $.ajax({
      url: "/trails/"+trailID,
      type: "GET",
      data: { trail: { current_id: currentID } },
      dataType: "json"
    });
		
		request.done(function(response){
			for(i = 0; i < response.length; i++){
				$('.comments-body').append("<p data-id='"+ response[i].id +"'>"+response[i].review+ " "+  response[i].id +"</p>")
			};

		});

		return request;
	});
});