(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");
var searchInput_directive = require("./search/searchInput.directive");
var gmap_directive = require("./gmap/gmap.directive");
var signin_directive = require("./signin/signin.directive");
var signup_directive = require("./signup/signupForm.directive");
var postjob_directive = require("./postjob/postjobForm.directive");
var mySkills_directive = require("./skills/mySkills.directive");

var user_factory = require("./user.factory");
var joblist_factory = require("./jobs/joblist.factory");
var mySkills_factory = require("./skills/mySkills.factory");
var job_factory = require("./postjob/job.factory");

var gmap_controller = require("./gmap/gmap.controller");

var postjob_service = require("./postjob/postjob.service");
var messenger_service = require("./messenger.service");
var trendySkills_service = require("./skills/trendySkills.service");


var main_controller = require("./main.controller");

window.init = function() {
	var app = angular.module('githired', ['ngResource', 'ngAnimate', 'ui.bootstrap']);

	app
		.factory('user_factory', ['$resource', '$rootScope', 
                                            'mySkills_factory', user_factory])
		.factory('joblist_factory', ['$resource', joblist_factory])
        .factory('mySkills_factory', ['$resource', mySkills_factory])
        .factory('job_factory', ['$resource', '$rootScope', job_factory])
	;

	app
		.service('messenger_service', ['$rootScope', 'user_factory', 'joblist_factory', 
										'job_factory', messenger_service])
        .service('trendySkills_service', ['$resource', trendySkills_service])
	;

	app
		.directive('ghNavbar', [navbar_directive])
		.directive('ghSidebar', [sidebar_directive])
		.directive('ghGmap', [gmap_directive])
		.directive('ghSearch', [searchInput_directive])
		.directive('ghSigninModal', [signin_directive])
		.directive('ghSignupForm', [signup_directive])
		.directive('ghPostJobForm', [postjob_directive])
        .directive('ghMySkills', [mySkills_directive])
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

},{"./gmap/gmap.controller":2,"./gmap/gmap.directive":3,"./jobs/joblist.factory":4,"./main.controller":5,"./messenger.service":6,"./navbar/navbar.directive":8,"./postjob/job.factory":9,"./postjob/postjob.service":11,"./postjob/postjobForm.directive":12,"./search/searchInput.directive":13,"./sidebar/sidebar.directive":14,"./signin/signin.directive":16,"./signup/signupForm.directive":18,"./skills/mySkills.directive":19,"./skills/mySkills.factory":20,"./skills/trendySkills.service":21,"./user.factory":22}],2:[function(require,module,exports){
module.exports = function($scope, messenger) {
	$scope.control = {};
	$scope.jobs = messenger.joblist;
	messenger.gmap.control = $scope.control;
	
	$scope.requestPostJob = function(objAddress) {
		messenger.jobPostingForm.control.show(objAddress);
	}
}
},{}],3:[function(require,module,exports){
module.exports = function() {
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

    function markerFactory(title, pos, info) {
        var newMarker = new google.maps.Marker({
            map: map,
            draggable: false,
            icon: 'images/logo32.png',
            title: title,

            animation: google.maps.Animation.DROP,
            position: pos
        });

        var infowindow = new google.maps.InfoWindow({
            content: info
        });

        newMarker.addListener('click', function() {
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
                    var contentString = job.jobAddress.formattedAddress;
                    contentString += '<br /><br />' + job.jobDescription;
                    var title  = '<h3 class="text-danger">' + job.jobTitle + '</h3>';
                    contentString = title + '<pre class="text-primary">' + contentString + '</pre>';

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


                    var marker = markerFactory(job.jobTitle, pos, contentString);

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
                                formattedAddress: results[0].formatted_address,
                latLng: e.latLng
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
                                    var marker = markerFactory(
                                        job.jobTitle,
                                        results[0].geometry.location,
                                        job.jobDescription
                                        );
                                } else {
                                    alert("Geocode was not successful for the following reason: " + status);
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

},{"./gmap.controller":2}],4:[function(require,module,exports){
module.exports = function($resource) {
	var url = "api/jobs";

	return $resource(url);
}

},{}],5:[function(require,module,exports){
module.exports = function ($scope, messenger) {
    console.log(messenger.joblist);
    if (sessionStorage.getItem("__githired.user.credentials__")) {
        var strCredentials = sessionStorage.getItem("__githired.user.credentials__");
        var email = strCredentials.split(":")[0];
        var pass = strCredentials.split(":")[1];
        messenger
            .signin({ email: email, password: pass})
            .then(
                function(response) {
                    messenger.user.fetchSkills();
                },
                function(failure) {
                    console.log("Failed to load user. Error: " + failure);
                }
            );
    }
}

},{}],6:[function(require,module,exports){
module.exports = function($rootScope, user_factory, joblist_factory, job_factory) {

    var service = {
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
        jobs: [], 
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
            self.job = job_factory.createJob({userId: this.user.userId}, jobForm);
            self.job.$promise
                .then(
                        function(newJob) {
                            // self.setSession(signupForm);
                        }
                        ,
                        function(error) {
                            $rootScope.$broadcast('error', error);
                        });

            return self.job.$promise;
        }, 
        fetchJobs: function() {
            var self = this;
            joblist_factory.query({}, function(response) {
                // success
                console.log("i'm in success");
                console.log("Response:" + response);

                // self.joblist.splice(0, self.joblist.length);
                angular.copy(response, self.joblist); // use angular copy to save reference
            }, function(failure) {
                // failure
                console.log("Failure:" + failure);
            });
        }
    }

    // Display job markers on load
    service.fetchJobs();

    return service;
}

},{}],7:[function(require,module,exports){
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

}

},{}],8:[function(require,module,exports){
module.exports = function() {
	var controller = require("./navbar.controller");

	return {
		templateUrl: 'navbar/navbar.template.html'
		, link: function($scope, $element, $http) {

		}
		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{"./navbar.controller":7}],9:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	// define the class
	var resJob = $resource(
		'/api/jobs/:request',
		{
			request: "@createJob"
		},
		{
			createJob: { method: 'POST', params: { request: 'createJob' } }
		}
	);	

	return resJob;
}
},{}],10:[function(require,module,exports){
module.exports = function($scope, messenger) {
	$scope.control = {};
	messenger.jobPostingForm.control = $scope.control;
	$scope.model = {};

	$scope.submitPostJob = function() {
		messenger
			.addJob($scope.model)
			.then(function() { $scope.control.hide() });
	}
}
},{}],11:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/postjob/'
		, {}
		, {
			postjob: { method: 'POST' }
		});
	
	return client;
}
},{}],12:[function(require,module,exports){
module.exports = function() {
    var controller = require('./postjob.controller');

    return {
        templateUrl: 'postjob/postjob.form.html',
            control: "="

                ,
            link: function($scope, $element, $attrs) {
                var modal = $element.find('.modal');

                $scope.control.show = function(objAddress) {
                    $scope.model = {
                        jobTitle: '',
                        jobDescription: '',
                        jobAddress: objAddress,
                        jobWageType: null,
                        jobMinWage: '',
                        jobMaxWage: '',
                        jobSetWage: ''
                    }

                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                    $scope.model = null;
                }
            }

        ,
            controller: ['$scope', 'messenger_service', controller]
    }
}

},{"./postjob.controller":10}],13:[function(require,module,exports){
module.exports = function() {

	var suggestions = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: "search/suggestions.json"
	});

	function fetchSuggestions(q, sync) {
		if (q === '') {
			sync(suggestions.get(
				'developer', 'engineer', 'designer', 'tester'
			));
		} else {
			suggestions.search(q, sync);
		}
	}

	return {
		templateUrl: 'search/searchBar.template.html',
		link: function($scope, $element, $attrs) {
			$element.find('form').on('submit', function(e) {
				console.log($scope.searchInput);
				$scope.sendQuery($scope.searchInput);
			});

			$element.find('.inputSearch').typeahead({
				hint: true,
				highlight: true,
				minLength: 0
			}, {
				name: 'states',
				source: fetchSuggestions,
				templates: {
					empty: [
						'<div class="text-muted">',
						'No Suggestion',
						'</div>'
					].join('\n'),
					suggestion: function(data) {
						var templ = '<div class="list-group-item">' + '{{data}}</div>';

						return templ.replace(/{{data}}/g, data);
					}
				}
			});

			$element.find('.inputSearch')
				.on('focus', function() {
					$(this).select();
				})
				.bind('typeahead:select', function(e, sugg) {
					$scope.sendQuery(sugg);
				});

			$element.find('#searchLog .dropdown-menu').on('click', function(e) {
				e.stopPropagation();
			});
		},

		controller: ['$scope', function($scope) {
			$scope.waiting = false;
			$scope.searchLog = {};
			$scope.clear = function() {
				$scope.searchLog = {};
				$scope.$emit('searchInput.cleared');
				$scope.searchInput = '';
				setTimeout(function() { $scope.$apply(); }, 10);
			}

			$scope.$on("searchInput.status.waiting", function() {
				$scope.waiting = true;
				setTimeout(function() { $scope.$apply(); }, 10);
			});

			$scope.$on("searchInput.status.ready", function() {
				$scope.waiting = false;

				setTimeout(function() {
					$scope.$apply();
				},10);
			});

			$scope.sendQuery = function(query) {
				if (query) $scope.searchInput = query;
				if (!$scope.searchLog.hasOwnProperty(query) && typeof query !== 'undefined') {
					$scope.searchLog[query] = true;
				}

				var keywords = Object.keys($scope.searchLog);

				if (keywords.length > 0) {
					$scope.$emit('searchInput.submitted', keywords);
				} else {
					$scope.$emit('searchInput.log.clear');
				}
			}
		}]
	}
}
},{}],14:[function(require,module,exports){
module.exports =function() {
	var controller = function($scope, messenger) {
		$scope.control = {};
		messenger.sidebar.control = $scope.control;
	}
	return {
		templateUrl: 'sidebar/sidebar.template.html'
		, scope: {

		}

		, link: function($scope, $element, $attrs) {
			$scope.control.show = function() {
				$element.toggleClass("toggled", true);
			}
			$scope.control.hide = function() {
				$element.toggleClass("toggled", false);
			}
		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{}],15:[function(require,module,exports){
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
                        }, 2000);
                    }
                    , function(failure) {
                        $scope.error = failure.data;
                        $scope.status = "standby";
                    }
                 );
    }
}

},{}],16:[function(require,module,exports){
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
},{"./signin.controller":15}],17:[function(require,module,exports){
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

        if (!validate()) return false;

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

},{}],18:[function(require,module,exports){
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
},{"./signup.controller":17}],19:[function(require,module,exports){
module.exports = function() {
    var controller = function($scope, messenger, trendySkills_service) {
        $scope.control = {};
        $scope.waiting = false;
        $scope.user = messenger.user;

        $scope.status = "";

        $scope.skills = $scope.user.skills;
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
module.exports = function($resource, $rootScope, mySkills_factory) {
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
                signout: { method: 'POST', params: { request: 'signout' } }

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

    return resUser;
}

},{}]},{},[1]);
