// $(document).ready(function() {
//   if(window.location.pathname !== '/'){
//     google.maps.event.addDomListener(window, 'load', initializeTrailId);
//   }
// })

// function initializeTrailId() {
//   var pattern = new RegExp(/\d+/)
//   var trailId = Number(pattern.exec(window.location.pathname))

//  var mapOptions = {
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       disableDefaultUI: true,
//       zoomControl: true,
//       center: {lat: 37.09024, lng: -95.712891},
//       zoom: 4,
//       zoomControlOptions:{
//         style: google.maps.ZoomControlStyle.LARGE,
//         position: google.maps.ControlPosition.LEFT_CENTER
//       }



// var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

// var markerCollection = new MarkerCollection(map)
//   markerCollection.fetch().done(function() {
//     var marker = new Marker(map, trailId)
//     marker.fetch().done(function(){
//       var mark = marker.marker
//       var trails = markerCollection.collection

//       map.setCenter(mark.latitude, mark.longitude)


//     })
//   })







// function fetchMarker(){

// }

// // function trailId {
// // }


// function center() {
//   return "40.702147,-74.015794"
// }

// // // function marker {

// // // }

// function zoom(){
//   return "5"
// }

// function url(){
//   console.log("http://maps.googleapis.com/maps/api/staticmap?center="+center()+"&zoom="+zoom()+"&maptype=roadmap&size=600x300")


// // &markers="+marker()+""

// // &markers=color:green%7Clabel:G%7C40.711614,-74.012318


// }

// function Marker(map, trailId) {
//   this.map = map
//   this.marker = 0
// }

// Marker.prototype.fetch = function() {

//   var jqXHR = $.ajax({
//     url: "/trails/" + trailId,
//     type: "GET",
//     dataType: "json"
//   });

//   jqXHR.done(function(marker) {
//     this.marker = marker
//     return jqXHR
// };

