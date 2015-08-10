// Working function - plots the GPX path of any file provided in the filepath parameter (expects the file to be located in the 'data' subfolder)

	var mapOptions = {
	zoom: 10,
	center: { lat: 51.656664, lng: -0.893995},
	mapTypeId: google.maps.MapTypeId.TERRAIN,
	}

	var map = new google.maps.Map(document.getElementById('map-canvas'),
	  mapOptions);

	map.setOptions({styles: mapStyle});

	function addGPX(filepath) {

	  var coordsArray = [];

	    var xhr = new XMLHttpRequest();
	    xhr.onload = function() {
	      var response = xhr.responseXML;
	      pointsArray = response.getElementsByTagName('trkpt');
	      for (var i=0; i<pointsArray.length; i++) {
	        var lat = parseFloat(pointsArray[i].getAttribute('lat'));
	        var lon = parseFloat(pointsArray[i].getAttribute('lon'));
	        coordsArray.push( new google.maps.LatLng(lat, lon))
	      }

		  var flightPath = new google.maps.Polyline({
		    path: coordsArray,
		    geodesic: true,
		    strokeColor: '#FF0000',
		    strokeOpacity: 0.3,
		    strokeWeight: 2
		  });

		  flightPath.setMap(map);

	}
	    xhr.open('GET', 'data/' + filepath, true);
	    xhr.send(null);

	}

for ( var i=0; i<filenames.length; i++ ) {
	addGPX(filenames[i]);
}

// google.maps.event.addDomListener(window, 'load', initialize); -- uncommenting this causes problems with the scope of the map variable - needs to be accessible to the addGPX function.