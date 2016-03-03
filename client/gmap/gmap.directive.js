module.exports = function() {
	/***** Private properties ******/
	var mapOptions = {
		center: new google.maps.LatLng(37.335268, -121.881361),
		zoom: 13,
	};

	var map;
	var markers = [];

	function clearMarkers(markerList) {
		angular.forEach(markerList, function(marker, index) {
			marker.setMap(null);
		});
	}

	function markerFactory(title, lat, lng, info) {
		var newMarker = new google.maps.Marker({
			map: map,
			draggable: false,
			title: title,

			animation: google.maps.Animation.DROP,
			position: {
				lat: lat,
				lng: lng
			}
		});

		var infowindow = new google.maps.InfoWindow({
			content: info
		});

		newMarker.addListener('click', function() {
			infowindow.open(map, newMarker);
		});

		return newMarker;
	}


	/****** directive properties ********/
	return {
		scope: {
			data: '='
		},
		link: function($scope, $element, $attrs) {
			map = new google.maps.Map($element[0], mapOptions);

			$scope.$watch('data', function(newData, oldData) {
				if (!oldData) oldData = [];
				if (!newData) newData = [];
				if (newData.length < oldData.length) {
					clearMarkers(markers);
				}

				for (var i = oldData.length, l = newData.length; i < l; i++) {
					var tweet = newData[i];

					if (!tweet.coordinates) return false;
					var lat = tweet.coordinates[0];
					var lng = tweet.coordinates[1];

					var contentString = tweet.text;
					var icon = 'img/markers/earthquake-3.png';

					var marker = markerFactory('Job: ', lat, lng, contentString);

					markers.push(marker);
				}

				setTimeout(function() {
					$scope.$apply(), 300
				});
			}, true);
		}
	}
}