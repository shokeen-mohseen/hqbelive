/**
 * Functionality specific to Wintage Engineers & Consultants.
 *
 * Provides helper functions to enhance the theme experience.
 */

var $ = jQuery;

//if(window.location.hostname==='localhost') {
siteURL = "http://localhost:8888/projects/LTV";


var customGMap;
var lastOpenedInfoWindow;
var postCodePattern = /^\d{5}$/;
var location_shared = true;
var curr_page = 1;
var markers = [];
var availableDates = [];
var $availDatesCalender;

var geocoder;

( function( $ ) {
  // Initialize Map
  function initialize(elementID, Lat, Lng) {
    var myOptions = {
      center: new google.maps.LatLng(Lat,Lng),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scaleControl: false,
      scrollwheel: false,
      disableDefaultUI: true
    };

    customGMap = new google.maps.Map(document.getElementById(elementID), myOptions);
    
    var geocoder = new google.maps.Geocoder();
    
    codeAddress(geocoder, customGMap);
    
    google.maps.event.addListener(customGMap, 'click', function(event) {
      geocoder.geocode({
        'latLng': event.latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            alert(results[0].formatted_address);
          }
        }
      });
    });
  }
  
  function codeAddress(geocoder, map) {
    var address = "new york city";
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function findNearLocations(){
    initialize('googleMap', 27.3289011, -81.8061973);
    initialize('googleMapOther', 27.3289011, -81.8061973);
  } 
  
  ( function() {
    if($('.google-map-embed').length > 0){
      findNearLocations();
    }
    
    $('.searchsubmit').click(function() {
//      alert("A");
//      var geocoder = new google.maps.Geocoder();
//      alert(customGMap);
//      codeAddress(geocoder, customGMap);
    });
    
  } )();
} )( jQuery );
