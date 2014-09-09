$(document).ready(function() {
  if(window.location.pathname !== '/'){
    google.maps.event.addDomListener(window, 'load', initializeTrailId);
  }

  $('.see-more-comments-button').children().css("padding","13px")
})

function initializeTrailId() {
  var pattern = new RegExp(/\d+/)
  var trailId = Number(pattern.exec(window.location.pathname))

 var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    // center: {lat: 37.09024, lng: -95.712891},
    // zoom: 10,
    minZoom: 8,
    zoomControlOptions:{
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  }

  var map = new google.maps.Map(document.getElementById('trail-map-canvas'), mapOptions);
  var markerCollection = new MarkerCollection(map)
  markerCollection.fetch().done(function(){
    var marker = new Marker(map, trailId)

    marker.fetch().done(function(){
      var mark = marker.marker
      map.setCenter({lat: Number(mark.latitude), lng: Number(mark.longitude)})
      map.setZoom(14)
    })
  })
}


function Marker(map, trailId) {
  this.map = map
  this.trailId = trailId
  this.marker = 0
}

Marker.prototype.fetch = function() {
  var trailId = this.trailId

  var jqXHR = $.ajax({
    url: "/trails/" + trailId,
    type: "GET"
  });

  jqXHR.done(function(marker) {
    this.marker = marker
  }.bind(this));

  return jqXHR
}

