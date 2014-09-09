$(document).ready(function() {
  if(window.location.pathname === "/"){
    google.maps.event.addDomListener(window, 'load', initializeHome);
  }
})

function initializeHome() {

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
  var marker = []

  var markerCollection = new MarkerCollection(map)
  markerCollection.fetch().done(function() {
    var trails = markerCollection.collection
    var markerCluster = new MarkerClusterer(map, trails, {gridSize: 50, maxZoom: 15 });
    SearchBox(trails);
    // InfoWindows(trails)
    CurrentLocationtoNearestTrails(trails)
  })


  function findNearestTrails(markers) {
    count = 0
    for(var i= markers.length -1, bounds=map.getBounds(); i > 0; i--){
      if( bounds.contains(markers[i].getPosition()) ){
        count++;
      }
    }
    if(count > 5){
      map.setZoom(map.getZoom())
    }else{
      map.setZoom(map.getZoom()-1)
      findNearestTrails(markers);
    }
  }

  function CurrentLocationtoNearestTrails(markers) {
    $(".button-current-location").on("click", function() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(geolocate);
          map.setZoom(18);
          findNearestTrails(markers);
        })
      }
    })
  }


  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

  function SearchBox(trails) {
    google.maps.event.addListener(searchBox, 'places_changed', function() {
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
      findNearestTrails(trails);
    });
  }
  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  $(".add-marker-button").on("click", function(event) {
    google.maps.event.addListener(map, 'click', function(event) {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        info: new google.maps.InfoWindow({
          content: '<form class="trail-form" action="/user_trails/new"><p><label> Trail Name: <label><input name="name" type="text"></input></p><p><label> City: <label><input name="city" type="text"></input></p><p><label> State: <label><input name="state" type="text"></input></p><p><label> Length: <label><input name="length" type="text"></input></p><p><label> Description: <label><input name="description" type="text"></input></p><p><button type="submit" name="trail_submit">Submit Trail</button></form></p>'
        })
      })

        marker.info.open(map, marker)
      $("button[name='trail_submit']").on("click", function(e) {
        e.preventDefault();

        var name = $(".trail-form input[name=name]").last().val();
        var city = $(".trail-form input[name=city]").last().val();
        var state = $(".trail-form input[name=state]").last().val();
        var length = $(".trail-form input[name=length]").last().val();
        var description = $(".trail-form input[name=description]").last().val();
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();

        var jqXHR = $.ajax({
          url: "/trails",
          type: "POST",
          data: {name: name, city: city, state: state, length: length, description: description, latitude: latitude, longitude: longitude},
          dataType: "json"
        });

        jqXHR.done(function(response) {
          if(response.success === 0){
            debugger;
            marker.info.close()
            alert("thanks for your response")
          }
        })
      })
    })
  })
}

function MarkerCollection(map) {
  this.map = map
  this.collection = []
}

MarkerCollection.prototype.fetch = function() {
  function trees(rating){
    var info_trees = ""
    if(rating == null){
      info_trees = 'not yet rated'
    }
    else{
      for(i=0; i<rating; i++){
        info_trees = info_trees + '<i class="fa fa-tree"></i>'
      }
    }
    return info_trees
  }

  var jqXHR = $.ajax({
    url: "/trails",
    type: "GET",
    dataType: "json"
  });

  jqXHR.done(function(markers) {
    var trails = []
    var infoWindows = []
    var rangeHash = {0: "easy", 1: "moderate", 2: "hard"}
    for (i=0; i < markers.length; i++) {
      var p = new google.maps.LatLng(markers[i]["latitude"],markers[i]["longitude"])
      var marker = new google.maps.Marker({
        position: p,
        map: this.map,
        id: markers[i]["id"],
        title: markers[i]["name"],
        // url: "/trails/" + markers[i]["id"], 
        info: new google.maps.InfoWindow({
          content: '<div id="info-content">'+
          '<h1 id="firstHeading" class="firstHeading"> <a href=/trails/'+markers[i]["id"] + '>' + markers[i]["name"] + '</a></h1> <p> Length: ' + markers[i]["length"] + ' mile(s) <p> Rating: ' + trees(markers[i]["rating"]) + '</p> <p> Difficulty: ' + rangeHash[Math.floor(markers[i].difficulty)] + '</p> </div>'
        }) 
      })
      trails.push(marker)
      infoWindows.push(marker.info)
      google.maps.event.addListener(marker, "dblclick", function(){
        window.location.href = '/trails/'+ this.id
      })
      google.maps.event.addListener(marker, "click", function() {
        for(i=0; i<infoWindows.length; i++){
          infoWindows[i].close();
        }
        this.info.open(this.map, this);
      })
          
    };
    this.collection = trails
  }.bind(this));

  return jqXHR
};



