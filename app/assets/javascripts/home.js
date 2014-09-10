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
    zoom: 5,
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
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(geolocate);
        map.setZoom(18);
        findNearestTrails(trails);
      })
      }else{
        map.setCenter({lat: 37.09024, lng: -95.712891})
        map.setZoom(5)
      }
      backtoHomeView(trails)
      backtotheUSView()
  })


  function backtotheUSView(){
    $('.all-trails-button').on("click", function(){
      map.setCenter({lat: 37.09024, lng: -95.712891})
      map.setZoom(5)  
    })
  }


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

  function backtoHomeView(markers) {
    $(".current-local-button").on("click", function() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(geolocate);
          map.setZoom(18);
          findNearestTrails(markers);
        })
      }else{
        map.setCenter({lat: 37.09024, lng: -95.712891})
        map.setZoom(4)
      }
    })
  }


  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  $('#pac-input').css("left: 5px")

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

  $(".create-trail-button").on("click", function(event) {
      var position = map.getCenter();
      
      var polyline = new google.maps. Polyline({

      });

      var marker = new google.maps.Marker({
        position: position,
        draggable: true,
        map: map,
        info: new google.maps.InfoWindow({
          content: '<div class="marker-info-window">Drag this marker to your trail head</div>'
        })

      });
      // marker.setAnimation(DROP);

      marker.info.open(map, marker);


      google.maps.event.addListener(marker, "drag", function(event){
        marker.position = event.latLng;
       });


      $(".cancel-create-trail").on("click" , function(event){
        event.preventDefault();
        marker.setMap(null);
      });


      $(".submit-create-trail").on("click", function(event) {
        event.preventDefault();

        marker.draggable = false;

        var name = $(".trail-form-name input").val();
        var city = $(".trail-form-city input").val();
        var state = $(".trail-form-state input").val();
        var length = $(".trail-form-length input").val();
        var description = $(".trail-form-description textarea").val();
       
        var latitude = marker.position.lat();
        var longitude = marker.position.lng();
  

        var jqXHR = $.ajax({
          url: "/trails",
          type: "POST",
          data: { name: name, city: city, state: state, length: length, description: description, latitude: latitude, longitude: longitude },
          dataType: "json"
        });
     
        jqXHR.done(function(response) {
          
          if(response.sucess != 1){
            // debugger
            var trail = response.trail;

            trailInfo = '<div class="new-trail-info"><h1 id="firstHeading" class="firstHeading"> <a href=/trails/'+trail.id + '>' + trail.name + '</a></h1> <p> Length: ' + trail.length + ' mile(s) <p> Rating: Not yet rated </p> <p> Difficulty: Not yet rated </p> </div>';

            marker.info.content = trailInfo;
            marker.info.close(map, marker);
            marker.info.open(map, marker);

            
          } else{
            debugger
          }
        });
      });
  
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

        info: new google.maps.InfoWindow({
          content: '<div id="info-content">'+
          '<h1 id="firstHeading" class="firstHeading"> <a href=/trails/'+markers[i]["id"] + '>' + markers[i]["name"] + '</a></h1> <p> Length: ' + markers[i]["length"] + ' mile(s) <p> Rating: '+ markers[i]["rating"] +' </p> <p> Difficulty: ' + markers[i]["difficulty"] + '</p> </div>'
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



