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
//= require_tree .


$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', initialize);
})


function initialize() {
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    center: {lat: 37.09024, lng: -95.712891},
    zoom: 4,
    zoomControlOptions:{
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


  var markerCollection = new MarkerCollection(map)
  markerCollection.fetch().done(function() {
    var trails = markerCollection.collection
    var markerCluster = new MarkerClusterer(map, trails, {gridSize: 50, maxZoom: 15 });
    SearchBox(trails);
  })

  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  function SearchBox(trails) {
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      console.log("places_changed")
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = trails[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
    });
  }
  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

function MarkerCollection(map) {
  this.map = map
  this.collection = []
}

MarkerCollection.prototype.fetch = function() {

  var jqXHR = $.ajax({
    url: "/trails",
    type: "GET",
    dataType: "json"
  });

  jqXHR.done(function(markers) {
    var trails = []
    for (i=0; i < markers.length; i++) {
      var p = new google.maps.LatLng(markers[i]["latitude"],markers[i]["longitude"])
      var marker = new google.maps.Marker({
        position: p,
        map: this.map,
        title: markers[i]["name"],
        url: "/trails/" + markers[i]["id"]
      })
      trails.push(marker)
    };
    this.collection = trails
  }.bind(this));

  return jqXHR

}








