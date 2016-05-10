module.exports = function($compile, messenger) {
    var controller = require('./gmap.controller');
    /***** Private properties ******/
    var mapOptions = {
        center: new google.maps.LatLng(37.335268, -121.881361),
        zoom: 13,
    };

    var map, geocoder;
    var markers = [];

    function clearMarkers(markerList) {
        angular.forEach(markerList, function(marker, index) {
            marker.setMap(null);
        });
    }

    function markerFactory(job, pos, scope) {
        var icon = 'images/logo32.png';
        if (messenger.user && job.userId == messenger.user.userId) {
            icon = 'images/logo32-green.png';
        }
        var newMarker = new google.maps.Marker({
            map: map,
            draggable: false,
            icon: icon,

            animation: google.maps.Animation.DROP,
            position: pos
        }); 

        newMarker.addListener('click', function() {
            var content = $compile("<gh-job-window job-id='" + job.jobId + "'></gh-job-window>")(scope);

            var infowindow = new google.maps.InfoWindow({
                content: content[0] 
            });   
                
            infowindow.open(map, newMarker);
        });

        return newMarker;
    }

    var extractAddress = function(arrAddress) {
        var itemRoute = '';
        var itemLocality = '';
        var itemCountry = '';
        var itemPc = '';
        var itemSnumber = '';
        var itemState = '';

        // iterate through address_component array
        angular.forEach(arrAddress, function(address_component, i) {

            if (address_component.types[0] == "route") {
                itemRoute = address_component.long_name;
            }

            if (address_component.types[0] == "locality") {
                itemLocality = address_component.long_name;
            }

            if (address_component.types[0] == "country") {
                itemCountry = address_component.long_name;
            }

            if (address_component.types[0] == "administrative_area_level_1") {
                itemState = address_component.long_name;
            }

            if (address_component.types[0] == "postal_code") {
                itemPc = address_component.long_name;
            }

            if (address_component.types[0] == "street_number") {
                itemSnumber = address_component.long_name;
            }
            //return false; // break the loop   
        });

        return {
            number: itemSnumber,
                street: itemRoute,
                city: itemLocality,
                state: itemState,
                country: itemCountry,
                postal: itemPc
        }
    }


    /****** directive properties ********/
    return {
        controller: ['$scope', 'messenger_service', controller],
        scope: {

        },
        link: function($scope, $element, $attrs) {
            map = new google.maps.Map($element[0], mapOptions);
            geocoder = new google.maps.Geocoder();

            $scope.control = {
                addJob: function(job) {

                    if (job.coordinates) {
                        var lat = job.coordinates[0];
                        var lng = job.coordinates[1];

                        var pos = {
                            lat: lat,
                            lng: lng
                        }
                    } else if (job.jobAddress) {
                        var pos = job.jobAddress.latLng;
                    }


                    var marker = markerFactory(job, pos, $scope);

                    markers.push(marker);
                    setTimeout(function() {
                        $scope.$apply();
                    }, 200);
                }
            }

            google.maps.event.addListener(map, 'click', function(e) {
                geocoder.geocode({
                    'latLng': e.latLng
                },
                function(results, status) {
                    var address = "";
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            address = {
                                formattedAddress: results[0].formatted_address, latLng: e.latLng
                            }

                            angular.extend(address, extractAddress(results[0].address_components));

                            $scope.requestPostJob(address);
                        }
                    } else {
                        // TODO handle error
                    }
                });
            });

            $scope.$watch("jobs", 
                    function(newJobsArray, oldJobsArray) {

                        // TODO (4/24/2016): remove all markers from the map to avoid stale markers.

                        function retrieveLatLngOfJobAndSetOnMap(job) {
                            geocoder.geocode({
                                'address': job.location + ""
                            },
                            function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    console.log(results);
                                    job.jobAddress = results[0].geometry.location;
                                    var marker = markerFactory(
                                        job,
                                        results[0].geometry.location,
                                        $scope
                                        );
                                } else {
                                    console.log("Geocode was not successful for the following reason: " + status);
                                }
                            });
                        }

                        for (var i = 0; i < newJobsArray.length; i++) {
                            retrieveLatLngOfJobAndSetOnMap(newJobsArray[i]);
                        }
                    },
                    true);
        }
    }
}
