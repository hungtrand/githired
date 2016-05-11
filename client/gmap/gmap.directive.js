module.exports = function($compile, messenger) {
    var controller = require('./gmap.controller');
    /***** Private properties ******/
    var mapOptions = {
        center: new google.maps.LatLng(37.335268, -121.881361),
        zoom: 13,
    };

    var map, geocoder;
    var markers = [];
    var markerByJobId = {};

    function clearMarkers(markerList) {
        angular.forEach(markerList, function(marker, index) {
            marker.setMap(null);
            delete markers[index];
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

        markerByJobId[job.jobId] = newMarker;

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

            var input = document.getElementById('gmapHomeLocation');
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(13);  
                }

                var marker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                }); 

                marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                $scope.$emit('gmap.home.set');
            });

            $scope.control = {}

            google.maps.event.addListener(map, 'dblclick', function(e) {
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

            $scope.$on("models.jobs.added", function(event, newJob) {
                retrieveLatLngOfJobAndSetOnMap(newJob);
            });

            $scope.$on("models.jobs.address.updated", function(event, job) {
                markerByJobId[job.jobId].setMap(null);
                delete markerByJobId[job.jobId];
                retrieveLatLngOfJobAndSetOnMap(job);
            });

            $scope.$on("models.jobs.updated", 
                    function(event, data) {
                        clearMarkers(markers);

                        var i = 0;
                        var timeout = 200;

                        var recurse = function(i) {
                            if (i >= $scope.jobs.length) return false;

                            if (i >= 9) timeout = 1000
                            else timeout = 250;
                            setTimeout(function() {
                                retrieveLatLngOfJobAndSetOnMap($scope.jobs[i]);
                                recurse(++i);
                            }, timeout);
                        }

                        recurse(i);
                    }
                    );

            function retrieveLatLngOfJobAndSetOnMap(job) {
                geocoder.geocode({
                    'address': job.location + ""
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var addressComponents = results[0]['address_components'];

                        job.jobAddress = extractAddress(addressComponents);
                        var marker = markerFactory(
                            job,
                            results[0].geometry.location,
                            $scope
                            );

                        markers.push(marker);
                    } else {
                        console.log("Geocode was not successful for the following reason: " + status);
                    }
                });
            }


        }
    }
}
