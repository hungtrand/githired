(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");
var searchInput_directive = require("./search/searchInput.directive");
var gmap_directive = require("./gmap/gmap.directive");
var signin_directive = require("./signin/signin.directive");
var signup_directive = require("./signup/signupForm.directive");
var postjob_directive = require("./postjob/postjobForm.directive");
var mySkills_directive = require("./skills/mySkills.directive");
var jobWindow_directive = require("./jobs/jobWindow.directive");
var bids_directive = require("./bids/bids.directive");

var user_factory = require("./user.factory");
var joblist_factory = require("./jobs/joblist.factory");
var mySkills_factory = require("./skills/mySkills.factory");
var job_factory = require("./postjob/job.factory");
var bid_factory = require('./bids/bid.factory');
var bidlist_factory = require('./bids/bidlist.factory');

var gmap_controller = require("./gmap/gmap.controller");

var postjob_service = require("./postjob/postjob.service");
var messenger_service = require("./messenger.service");
var trendySkills_service = require("./skills/trendySkills.service");


var main_controller = require("./main.controller");

window.init = function() {
    var app = angular.module('githired', ['ngResource', 'ngAnimate', 'ui.bootstrap']);

    app
        .factory('user_factory', ['$resource', '$rootScope', 'mySkills_factory', 'bid_factory', user_factory])
        .factory('joblist_factory', ['$resource', joblist_factory])
        .factory('mySkills_factory', ['$resource', mySkills_factory])
        .factory('job_factory', ['$resource', '$rootScope', 'bidlist_factory', job_factory])
        .factory('bid_factory', ['$resource', bid_factory])
        .factory('bidlist_factory', ['$resource', bidlist_factory])
        ;

    app
        .service('messenger_service', ['$rootScope', 'user_factory', 'joblist_factory', 
                'job_factory', messenger_service])
        .service('trendySkills_service', ['$resource', trendySkills_service])
        ;

    app
        .directive('ghNavbar', [navbar_directive])
        .directive('ghSidebar', ['messenger_service', sidebar_directive])
        .directive('ghGmap', ["$compile", "messenger_service", gmap_directive])
        .directive('ghSearch', [searchInput_directive])
        .directive('ghSigninModal', [signin_directive])
        .directive('ghSignupForm', [signup_directive])
        .directive('ghPostJobForm', [postjob_directive])
        .directive('ghMySkills', [mySkills_directive])
        .directive('ghJobWindow', ['messenger_service', 'job_factory', jobWindow_directive])
        .directive('ghBids', [bids_directive])
        ;

    app
        .controller('main_controller', ['$scope', 'messenger_service', main_controller])
        ;

    angular.bootstrap(document, ['githired']);

    $(window).resize(function() {
        var h = $(window).height();

        $('#gmap').css('height', h);
    }).resize();

};

},{"./bids/bid.factory":2,"./bids/bidlist.factory":3,"./bids/bids.directive":5,"./gmap/gmap.controller":6,"./gmap/gmap.directive":7,"./jobs/jobWindow.directive":9,"./jobs/joblist.factory":10,"./main.controller":11,"./messenger.service":12,"./navbar/navbar.directive":14,"./postjob/job.factory":15,"./postjob/postjob.service":17,"./postjob/postjobForm.directive":18,"./search/searchInput.directive":19,"./sidebar/sidebar.directive":20,"./signin/signin.directive":22,"./signup/signupForm.directive":24,"./skills/mySkills.directive":25,"./skills/mySkills.factory":26,"./skills/trendySkills.service":27,"./user.factory":28}],2:[function(require,module,exports){
module.exports = function($resource) {
	// define the class
	var resBid = $resource(
		'/api/user/:userId/bids/:bidId',
		{
			userId: "@userid",
			bidId: "@bidId"
		},
		{
			create: { method: 'POST' },
                        rate: { method: 'PUT'}
		}
	);
	return resBid;
}

},{}],3:[function(require,module,exports){
module.exports = function($resource) {
	var url = "/api/user/:userId/:requestParam1/:jobId/:requestParam2";

	var resBidList = $resource(
		url,
		{
			userId: "@userId",
			jobId: "@jobId",
			requestParam1: "@aRequestParam1",
			requestParam2: "@aRequestParam2"
		},
		{
			fetchBids: { method: 'GET', params: { request: 'currentbids' } }
		}
	);

	return resBidList;
}

},{}],4:[function(require,module,exports){
module.exports = function($scope, messenger, $sce) {
    $scope.control = {};
    messenger.bidsModal.control = $scope.control;

    $scope.getSource = function(linkedin) {
        return "bids/linkedin-widget.html#/?profile=" + encodeURIComponent(linkedin);
    }

    $scope.acceptBid = function(bid, index) {
        bid.accepted = true;
        setTimeout(function() {
            bid.deleted = true;
            $scope.$apply();
        },3000);
    }

    $scope.declineBid = function(bid, index) {
        bid.declined = true;
        setTimeout(function() {
            bid.deleted = true;
            $scope.$apply();
        },3000);
    }
}

},{}],5:[function(require,module,exports){
module.exports = function() {
	var controller = require('./bids.controller');

	return {
		templateUrl: 'bids/bids.modal.html'
		, scope: {
			
		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			
			$scope.control.show = function(job) { 
				$scope.bids = job.bids;
				modal.modal('show'); 
			}
			$scope.control.hide = function() { modal.modal('hide'); }
		}

		, controller: ['$scope', 'messenger_service', '$sce', controller]
	}
}

},{"./bids.controller":4}],6:[function(require,module,exports){
module.exports = function($scope, messenger) {
	$scope.control = {};
	$scope.jobs = messenger.joblist;
	messenger.gmap.control = $scope.control;
	
	$scope.requestPostJob = function(objAddress) {
		messenger.jobPostingForm.control.show(objAddress);
	}
}
},{}],7:[function(require,module,exports){
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

        newMarker.openJobWindow = function() {
            var content = $compile("<gh-job-window job-id='" + job.jobId + "'></gh-job-window>")(scope);

            var infowindow = new google.maps.InfoWindow({
                content: content[0] 
            });   

            infowindow.open(map, newMarker); 
        }

        newMarker.addListener('click', function() {
           this.openJobWindow(); 
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

            $scope.$on("jobWindow.open", function(evt, job) {
                var marker = markerByJobId[job.jobId];
                marker.openJobWindow();
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

},{"./gmap.controller":6}],8:[function(require,module,exports){
module.exports = function($scope, messenger, job_factory) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;
    $scope.bidding = false;
    $scope.startEdit = function() {
        messenger.jobPostingForm.control.edit($scope.job);
    }

    $scope.showBids = function(job, user) {
    	// since job may be raw data from database, it might not have functions defined in job.factory.js
    	// create a new job with values from job
    	var objjob = new job_factory();
    	angular.extend(objjob, job);

    	// now fetch the jobs
    	objjob.fetchBids();

        messenger.bidsModal.control.show(objjob);
    }
}

},{}],9:[function(require,module,exports){
module.exports = function(messenger, job_factory) {
    var controller = require('./jobWindow.controller.js');

    return {
        templateUrl: 'jobs/jobWindow.template.html',
        scope: {
            jobId: "="
        },
        link: function($scope, $element, $attrs) {
            angular.forEach($scope.jobs, function(j, i) {
                if (j.jobId == $scope.jobId) {
                    $scope.job = j;
                }
            });

            angular.forEach(messenger.user.bids, function(b, i) {
                if (b.jobId == $scope.jobId) {
                    $scope.job.userBid = b;
                }
            });

            $scope.addBid = function(job) {
                $scope.bidding = true;
                var bidAmount = $element.find('.bidAmount').val() || job.setWage;
                $scope.user
                    .createBid(job.jobId, bidAmount)
                    .then(function(response) {
                        $scope.job.userBid = response;
                        $scope.bidding = false;
                    });
            }
        },
        controller: ['$scope', 'messenger_service', 'job_factory', controller]
    }
}

},{"./jobWindow.controller.js":8}],10:[function(require,module,exports){
module.exports = function($resource) {
	var url = "api/jobs";

	return $resource(url, {}, {
            search: { method: 'POST', isArray: true }
        });
}

},{}],11:[function(require,module,exports){
module.exports = function ($scope, messenger) {
    if (sessionStorage.getItem("__githired.user.credentials__")) {
        var strCredentials = sessionStorage.getItem("__githired.user.credentials__");
        var email = strCredentials.split(":")[0];
        var pass = strCredentials.split(":")[1];
        messenger
            .signin({ email: email, password: pass})
            .then(
                function(response) {
                    messenger.user.fetchSkills();
                    messenger.user.fetchBids();
                    messenger.user.fetchJobs();
                },
                function(failure) {
                    console.log("Failed to load user. Error: " + failure);
                }
            );
    }

    $scope.$on('gmap.home.set', function() {
        $scope.editHome = false;
    });

    messenger.fetchJobs();
}

},{}],12:[function(require,module,exports){
module.exports = function($rootScope, user_factory, joblist_factory, job_factory) {

    var service = {
        editHome: false,
        sidebar: {}, 
        navbar: {}, 
        signup: function(signupForm) {
            var self = this;
            self.user = user_factory.signup(signupForm);
            self.user.$promise
                .then(
                        function(newUser) {
                            self.setSession(signupForm);
                        }
                        ,
                        function(error) {
                            $rootScope.$broadcast('error', error);
                        });

            return self.user.$promise;
        },
        signin: function(signinForm) {
            var self = this;
            self.user = user_factory.signin({}, signinForm);
            self.user.$promise.then(
                    function(response) {
                        if (response.userId) {
                            $rootScope.$broadcast("user.signin.success");
                            self.setSession(signinForm);
                        }
                    },
                    function(response) {
                        $rootScope.$broadcast('error', response);
                    }
                    );
            return self.user.$promise;
        },
        signout: function() {
            sessionStorage.removeItem("__githired.user.credentials__");
            window.location.reload();
        },
        jobPostingForm: {}, 
        joblist: [],
        user: null, 
        gmap: {},
        mySkillsModal: {},
        setSession: function(credentials) {
            var self = this;

            strCredentials = credentials.email + ":" + credentials.password;
            sessionStorage.setItem("__githired.user.credentials__", strCredentials);
        }, 
        addJob: function(jobForm) {
            var self = this;
            // TODO job_factory
            var job = job_factory.createJob({userId: this.user.userId}, jobForm);
            job.$promise
                .then(
                        function(newJob) {
                            newJob.skills = angular.copy(jobForm.skills);
                            self.joblist.push(newJob);
                            $rootScope.$broadcast('models.jobs.added', newJob);
                        }
                        ,
                        function(error) {
                            $rootScope.$broadcast('error', error);
                        });

            return job.$promise;
        },
        updateJob: function(jobForm) {
            var self = this;
            var job = job_factory.update({ jobId: jobForm.jobId }, jobForm);
            
            job.$promise.then(
                function() {
                    angular.forEach(self.joblist, function(oldJob, index) {
                        if ( oldJob.jobId == job.jobId ) {
                            var oldLocation = oldJob.location;
                            angular.copy(job, self.joblist[index]);
                            if (oldLocation != job.location) {
                                $rootScope.$broadcast('models.jobs.address.updated', self.joblist[index]);
                            }
                        }
                    }); 
                },
                function(failure) {
                    console.log(failure);
                }
            )
            
            return job.$promise;
        },
        fetchJobs: function(arrSkills) {
            var self = this;
            var searchParams = { skills: arrSkills || [] };
            var promise = null; 
            if (arrSkills) {
                promise = joblist_factory.search({}, searchParams, function(response) {
                    angular.copy(response, self.joblist);
                    $rootScope.$broadcast('models.jobs.updated');
                }, function(failure) {
                    console.log(failure);
                });
            } else {
                promise = joblist_factory.query({}, function(response) {
                    angular.copy(response, self.joblist); 
                    $rootScope.$broadcast('models.jobs.updated');
                }, function(failure) {
                    // failure
                    console.log("Failure:" + failure);
                });

            }

            return promise.$promise;
        },
        bidsModal: {}
    }

    return service;
}

},{}],13:[function(require,module,exports){
module.exports = function($scope, messenger) {
    $scope.user = messenger.user;

    $scope.$on("user.signin.success", function(evt, data) {
        $scope.user = messenger.user;
    });

    $(document).on('dblclick', function() { console.log($scope.user) });
    $scope.vEllipsisToggle = function() {
        messenger.sidebar.control.show();
    }

    $scope.onSignupClicked = function() {
        messenger.signup.control.show();
    }

    $scope.onSigninClicked = function() {
        messenger.signin.control.show();
    }

    $scope.onSignoutClicked = function() {
        messenger.signout();
    }

    $scope.openMySkillsModal = function() {
        messenger.mySkillsModal.control.show();
    }

    $scope.onSidebarToggleClicked = function() {
        // TODO
        $scope.vEllipsis = !$scope.vEllipsis;
        if ($scope.vEllipsis) {
            messenger.sidebar.control.show();
        } else {
            messenger.sidebar.control.hide();
        }

    }

    $scope.updateUser = function() {
        $scope.user.loading = true;
        $scope.user
            .$save({ userId: $scope.user.userId })
            .then(
                function(response) {
                    $scope.user.loading = false;
                    $scope.editLinkedIn = false;
                    $scope.reloadLinkedInScript();
                },
                function(err) {
                    $scope.user.loading = false;
                });
    }

}

},{}],14:[function(require,module,exports){
module.exports = function() {
    var controller = require("./navbar.controller");

    return {
        templateUrl: 'navbar/navbar.template.html'
            , link: function($scope, $element, $http) {
                $element.find('.menuLinkedInItem').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); 
                });

                $scope.reloadLinkedInScript = function() {
                    var srcScript = $element.find('.linkedinScript').attr('src');
                    $element.find('.linkedinWidgetBlock').find(':not(.profileScript)').remove();
                    $element.find('.linkedinWidgetBlock').append('<script class="linkedinScript" src="' + srcScript + '"></script>');
                }
            }
        , controller: ['$scope', 'messenger_service', controller]
    }
}

},{"./navbar.controller":13}],15:[function(require,module,exports){
module.exports = function($resource, $rootScope, bidlist_factory) {
    // define the class
    var resJob = $resource(
            '/api/jobs/:jobId/:request',
            {
                request: "@createJob",
                jobId: "@jobId"
            },
            {
                createJob: { method: 'POST', params: { request: 'createJob' } },
                update: { method: 'PUT' }
            }
            );	

    resJob.prototype.fetchBids = function() {
        var self = this;
        console.log(self.jobId);
        self.bids = bidlist_factory.query( 
            { 
                requestParam1: 'jobs', 
                requestParam2: 'currentbids',
                jobId: self.jobId 
            }, function(response) {
                console.log("successfully retrieved bids for this job");
            }, function(failure) {
                console.log("Failure: " + failure);
            }
        );
    }

    return resJob;
}

},{}],16:[function(require,module,exports){
module.exports = function($scope, messenger, trendySkills_service) {
    $scope.control = {};
    messenger.jobPostingForm.control = $scope.control;
    $scope.model = {};
    $scope.model.skills = [];


    $scope.submitPostJob = function() {
        $scope.loading = true;
        if ($scope.model.jobId) {
           messenger
               .updateJob($scope.model) 
               .then(function() { 
                   $scope.control.hide();
                   $scope.loading = false;
               }, function() {
                    $scope.loading = false;
               });
        } else {
            messenger
                .addJob($scope.model)
                .then(function() { 
                    $scope.control.hide();
                    $scope.loading = false;
                },
                function() {
                    $scope.loading = false;
                });
        }
       
    }

    $scope.selected = null;
    $scope.selectRequiredSkill = function($item, $model, $label, $event) {
        $scope.selected = "";
        console.log($model);
        $scope.model.skills.push({
            name: $model
        });
    }

    $scope.removeSkill = function($index) {
        if ($scope.model.jobId) {
            $scope.model.skills[$index].delete = true;
        } else {
            $scope.model.skills.splice($index, 1);
        }
    }

    $scope.getSkillSuggestions = function(query) {
        var http = trendySkills_service.getSkills({ like: query});

        return http.$promise.then(
                function(response) {
                    if (response.success) {
                        return response.keywords;
                    } else {
                        return [];
                    }        
                }, 
                function(failure) {
                    console.log(failure);
                }
                );
    }

}

},{}],17:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/postjob/'
		, {}
		, {
			postjob: { method: 'POST' }
		});
	
	return client;
}
},{}],18:[function(require,module,exports){
module.exports = function() {
    var controller = require('./postjob.controller');

    return {
        templateUrl: 'postjob/postjob.form.html',
            control: "=",
            link: function($scope, $element, $attrs) {
                var modal = $element.find('.modal');
                var resetModel = function() {
                    $scope.model.jobId = null;
                    $scope.model.jobTitle = '';
                    $scope.model.jobDescription = '';
                    $scope.model.jobAddress = null;
                    $scope.model.jobWageType = null;
                    $scope.model.minimumWage = '';
                    $scope.model.maximumWage = '';
                    $scope.model.setWage = '';
                    $scope.model.skills.splice(0, $scope.model.skills.length);
                }
                $scope.control.show = function(objAddress) {
                    resetModel();
                    $scope.model.jobAddress = objAddress;
                    setTimeout(function() { $scope.$apply(); }, 200);
                    
                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                }

                $scope.control.edit = function(existingJob) {
                    resetModel();
                    angular.extend($scope.model, existingJob);
                    modal.modal('show');
                }

                modal.on('hidden.bs.modal', function() {
                    resetModel();
                });
            },
            controller: ['$scope', 'messenger_service', 'trendySkills_service', controller]
    }
}

},{"./postjob.controller":16}],19:[function(require,module,exports){
module.exports = function() {

    return {
        templateUrl: 'search/searchBar.template.html',
        link: function($scope, $element, $attrs) {
            $element.find('form').on('submit', function(e) {
                $scope.sendQuery($scope.searchInput);
            });

        },

        controller: ['$scope', 'trendySkills_service', 'messenger_service', 
                    function($scope, trendySkills_service, messenger) {
            $scope.waiting = false;
            $scope.searchLog = {};
            $scope.clear = function() {
                angular.copy({}, $scope.searchLog);
                $scope.searchInput = '';
                $scope.sendQuery();
            }

            $scope.numberOfFilters = 0;

            $scope.selected = null;
            $scope.selectSkill = function($item, $model, $label, $event) {
                $scope.selected = "";
                $scope.searchLog[$model] = true;
                $scope.sendQuery();
            } 

            $scope.$watch('searchLog', function() {
                $scope.numberOfFilters = Object.keys($scope.searchLog).length;
            }, true);

            $scope.getSkillSuggestions = function(query) {
                var http = trendySkills_service.getSkills({ like: query});

                return http.$promise.then(
                        function(response) {
                            if (response.success) {
                                return response.keywords;
                            } else {
                                return [];
                            }        
                        }, 
                        function(failure) {
                            console.log(failure);
                        }
                        );
            }

            $scope.sendQuery = function() {
                var filters = [];
                angular.forEach($scope.searchLog, function(isChecked, filter) {
                    if (isChecked) filters.push(filter);
                });

                if (filters.length > 0) {
                    messenger.fetchJobs(filters);
                } else {
                    messenger.fetchJobs();
                }
            }
        }]
    }
}

},{}],20:[function(require,module,exports){
module.exports =function(messenger) {
    var controller = function($scope, messenger, bid_factory) {
        $scope.control = {};
        messenger.sidebar.control = $scope.control;
        $scope.userBids = messenger.user.bids;
        $scope.maxRating = 5;

        $scope.openJobWindow = function(aJob) {
           $scope.$parent.$broadcast('jobWindow.open', aJob); 
        }
        
        $scope.setRating = function(bid) {
            bid_factory.rate({userId: messenger.user.userId, bidId: bid.bidId}, bid);    
        }
    }
    return {
        templateUrl: 'sidebar/sidebar.template.html'
            , scope: {

            }

        , link: function($scope, $element, $attrs) {
            $scope.control.show = function() {
                $scope.userBids = messenger.user.bids;
                $scope.userJobs = messenger.user.jobs;
                $element.toggleClass("toggled", true);
            }
            $scope.control.hide = function() {
                $element.toggleClass("toggled", false);
            }
       }

        , controller: ['$scope', 'messenger_service', 'bid_factory', controller]
    }
}

},{}],21:[function(require,module,exports){
module.exports = function($scope, messenger) {
    $scope.control = {};
    messenger.signin.control = $scope.control;
    $scope.form = {
        email: null,
        password: null
    };

    $scope.status = "standby";

    $scope.submit = function() {
        $scope.status = "waiting";
        $scope.error = "";
        messenger
            .signin($scope.form)
            .then(
                    function(response) {
                        $scope.status = "success";
                        $scope.form.email = null;
                        $scope.form.password = null;
                        setTimeout(function() {
                            $scope.control.hide();
                            $scope.status = "standby";

                            window.location.reload();
                        }, 1000);
                    }
                    , function(failure) {
                        $scope.error = failure.data;
                        $scope.status = "standby";
                    }
                 );
    }
}

},{}],22:[function(require,module,exports){
module.exports = function() {
	var controller = require('./signin.controller');

	return {
		templateUrl: 'signin/signin.modal.html'
		, scope: {
			
		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			
			$scope.control.show = function() { modal.modal('show'); }
			$scope.control.hide = function() { modal.modal('hide'); }
			
		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{"./signin.controller":21}],23:[function(require,module,exports){
module.exports = function($scope, messenger) {
    $scope.control = {};
    messenger.signup.control = $scope.control;
    $scope.formError = '';
    $scope.error = '';
    $scope.status = 'standby';
    $scope.model = {};

    var validate = function() {
        if ($scope.model.password !== $scope.model.confPassword) {
            $scope.formError = "password";
            return false;
        }

        if (!$scope.model.isEmployer && !$scope.model.isEmployee) {
            $scope.formError = 'employment';
            return false;
        }

        return true;
    }

    $scope.submit = function() {
        $scope.error = '';
        $scope.formError = '';
        $scope.status = 'waiting';

        if (!validate())  {
            return false;
            $scope.waiting = 'standby';
        }

        $scope.model.company = $scope.model.isEmployer ? $scope.model.company : '';
        $scope.model.firstName = $scope.model.isEmployee ? $scope.model.firstName : '';
        $scope.model.lastName = $scope.model.isEmployee ? $scope.model.lastName : '';

        messenger.signup($scope.model)
            .then(
                    function(response) {
                        if (response.userId > 0) {
                            $scope.status = 'success';
                            setTimeout(function() {
                                $scope.control.hide();
                            }, 1500);
                        } else {
                            $scope.error = response;
                            $scope.status = 'standby';
                        }
                    },
                    function(error) {
                        $scope.error = error;
                        $scope.status = 'standby';
                    });
    }
}

},{}],24:[function(require,module,exports){
module.exports = function() {
	var controller = require('./signup.controller');

	return {
		templateUrl: 'signup/signup.form.html'
		, scope: {

		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			$scope.control.show = function() { modal.modal('show'); }
			$scope.control.hide = function() {modal.modal('hide'); }

		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{"./signup.controller":23}],25:[function(require,module,exports){
module.exports = function() {
    var controller = function($scope, messenger, trendySkills_service) {
        $scope.control = {};
        $scope.waiting = false;
        $scope.user = messenger.user;

        $scope.status = "";

        if ($scope.user) $scope.skills = $scope.user.skills;
        messenger.mySkillsModal.control = $scope.control;
        
        $scope.selected = null;
        $scope.selectSkill = function($item, $model, $label, $event) {
            $scope.selected = "";
            $scope.user.skills.push({
                name: $model,
                userSkills: {
                    userId: $scope.user.userId,
                    yearsOfExperience: 0
                }
            });
        }

        $scope.removeSkill = function($index) {
            if (!$scope.user.skills[$index].skillId) {
                $scope.user.skills.splice($index, 1);
            } else {
                $scope.user.skills[$index].delete = true;
            }
        }

        $scope.getSkillSuggestions = function(query) {
            var http = trendySkills_service.getSkills({ like: query});
            
            return http.$promise.then(
                function(response) {
                    if (response.success) {
                        return response.keywords;
                    } else {
                        return [];
                    }        
                }, 
                function(failure) {
                    console.log(failure);
                }
            );
        }

        $scope.save = function() {
            $scope.waiting = true;
            $scope.user
                .saveSkills()
                .then(
                    function(response) {
                        console.log("Saved skills successfully");
                        $scope.waiting = false;
                        $scope.status = "saved";

                        setTimeout(function() {
                            $scope.status = "";
                            $scope.$apply();
                        }, 3000);
                    },

                    function(failure) {
                        console.log(failure);
                    }
                );
        }
    }

    return {
        templateUrl: "skills/mySkills.template.html",
        scope: {

        },
        link: function($scope, $element, $attrs) {
            var modal = $element.find('.modal');
            
            $scope.control.show = function() {
                modal.modal('show');
            }
            $scope.control.hide = function() {
                modal.modal('hide');
            }

        },
        
        controller: ['$scope','messenger_service', 'trendySkills_service', controller]
    }
}

},{}],26:[function(require,module,exports){
module.exports = function($resource) {
    var url = "/api/user/:userId/skills"

    var mySkills = $resource(
        url, 
        {
            userId: '@id'
        }
    );

    return mySkills;
}

},{}],27:[function(require,module,exports){
module.exports = function($resource) {
    var url = "http://trendyskills.com/service";
    var trendySkills = $resource(
        url, 
        {
            callback: "JSON_CALLBACK",
            q: "keywords",
            like: "@query",
            key: "FjlgMNTrEU2eTRgi"
        }, 
        {
            getSkills: {
                method: "JSONP",
                isArray: false
            }
        }
    );

    return trendySkills;
}

},{}],28:[function(require,module,exports){
module.exports = function($resource, $rootScope, mySkills_factory, bid_factory) {
    // define the class
    var resUser = $resource(
            '/api/user/:userId/:request', 
            {
                userId: "@id",
                request: "@signinORsignoutORsignup"
            }, 
            {
                signup: { method: 'POST', params: { request: 'signup' } },
                signin: { method: 'POST', params: { request: 'signin' } },
                signout: { method: 'POST', params: { request: 'signout' }}

            }
    );

    resUser.prototype.saveSkills = function() {
        var self = this;
        var results = mySkills_factory.save(
            { userId: self.userId },
            self.skills
        );

        return results.$promise;
    }

    resUser.prototype.fetchSkills = function() {
        var self = this;
        self.skills = mySkills_factory.query({ userId: self.userId });
    };

    resUser.prototype.fetchJobs = function() {
        var self = this;
        var jobsUrl = '/api/user/:userId/userJobs';
        var res = $resource(jobsUrl, {
            userId: self.userId
        });

        self.jobs = res.query();
    }

    resUser.prototype.fetchBids = function() {
        var self = this;
        var bidUrl = '/api/user/:userId/bids/:bidId';
        var res = $resource(bidUrl, {
            userId: self.userId,
            bidId: '@bidId'
        });

        self.bids = res.query();
    }

    resUser.prototype.createBid = function(jobId, bidAmount) {
        var self = this;
        var userData = {
            userId: self.userId
        }
        var bid = bid_factory.create(userData, { jobId: jobId, bidAmount: bidAmount });
        bid.$promise.then(function() {
            if (!angular.isArray(self.bids)) {
                self.bids = [];
            }
            self.bids.push(bid);
        })
       
        return bid.$promise;
    }

    return resUser;
}

},{}]},{},[1]);
