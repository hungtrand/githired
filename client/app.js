(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var navbar_directive = require("./navbar/navbar.directive");
var sidebar_directive = require("./sidebar/sidebar.directive");

var searchInput_directive = require("./search/searchInput.directive");

var gmap_directive = require("./gmap/gmap.directive");
var gmap_controller = require("./gmap/gmap.controller");

var signup_directive = require("./signup/signupForm.directive");
var signup_service = require("./signup/signup.service");

var messenger_service = require("./messenger.service");

var main_controller = require("./main.controller");

window.init = function() {
	var app = angular.module('githired', ['ngResource', 'ngAnimate']);

	app
		.service('messenger_service', [messenger_service])
		.service('signup_service', ['$resource', '$rootScope', signup_service])
	;

	app
		.directive('ghNavbar', [navbar_directive])
		.directive('ghSidebar', [sidebar_directive])
		.directive('ghGmap', [gmap_directive])
		.directive('ghSearch', [searchInput_directive])
		.directive('ghSignupForm', [signup_directive])
	;

	app
		.controller('main_controller', ['$scope', 'messenger_service', main_controller])
		.controller('gmapController', ['$scope', gmap_controller])
	;

	angular.bootstrap(document, ['githired']);

	$(window).resize(function() {
		var h = $(window).height();

		$('#gmap').css('height', h);
	}).resize();

};
},{"./gmap/gmap.controller":2,"./gmap/gmap.directive":3,"./main.controller":4,"./messenger.service":5,"./navbar/navbar.directive":7,"./search/searchInput.directive":8,"./sidebar/sidebar.directive":9,"./signup/signup.service":11,"./signup/signupForm.directive":12}],2:[function(require,module,exports){
module.exports = function($scope) {
	
}
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = function ($scope, messenger) {
	$scope.sidebarModel = messenger.getSidebar();
}
},{}],5:[function(require,module,exports){
module.exports = function() {
	var models = {
		sidebar: {
			show: false
		}
		, signup: {
			show: false
		}

		, user: null
	}

	var service = {

		getSidebar: function() {
			return models.sidebar;
		}
		
		, getSignup: function() {
			return models.signup;
		}

		, getUser: function() {
			return models.user;
		}

		,setUser: function(user) {
			var self = this;
			models.user = angular.extend({}, user);
		}
	}

	return service;
}
},{}],6:[function(require,module,exports){
module.exports = function($scope, messenger) {
	// models
	$scope.user = messenger.getUser();
	$scope.sidebar = messenger.getSidebar();
	$scope.signup = messenger.getSignup();

	// events handlers
	$scope.$on('searchBar.input.submit', function(evt, keywords) {
		$scope.$broadcast("status.waiting");
	});

	$scope.$on('models.user.updated', function(evt, user) {
		$scope.user = messenger.getUser();
	});

	// helpers
	$scope.vEllipsisToggle = function() {
		$scope.sidebar.show = !$scope.sidebar.show;
		$scope.vEllipsis = $scope.sidebar.show;
	}

	$scope.triggerSignup = function() {
		$scope.signup.show = true;
	}

	
}
},{}],7:[function(require,module,exports){
module.exports = function() {
	var controller = require("./navbar.controller");

	return {
		templateUrl: 'navbar/navbar.template.html'
		, link: function($scope, $element, $http) {

		}
		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{"./navbar.controller":6}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports =function() {
	var controller = function($scope) {
	}
	return {
		templateUrl: 'sidebar/sidebar.template.html'
		, scope: {
			model: "="
		}

		, link: function($scope, $element, $attrs) {
			$scope.$watch('model', function(properties) {
				$element.toggleClass("toggled", properties.show);
			}, true);

			
		}

		, controller: ['$scope', controller]
	}
}
},{}],10:[function(require,module,exports){
module.exports = function($scope, signup_service, messenger) {
	$scope.messenger = messenger;
	$scope.model = messenger.getSignup();
	$scope.formError = '';
	$scope.error = '';
	$scope.status = 'standby';

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
		
		$scope.model.company =  $scope.model.isEmployer ? $scope.model.company : '';
		$scope.model.firstName = $scope.model.isEmployee ? $scope.model.firstName : '';
		$scope.model.lastName = $scope.model.isEmployee ? $scope.model.lastName : '';

		signup_service.signup(
			$scope.model
			, function(response) {
				if (response.UserId > 0) {
					messenger.setUser(response);
					$scope.$emit('models.user.updated', response);
					$scope.$broadcast('models.user.updated', response);
					$scope.status = 'success';
				} else {
					if (angular.isArray(response.error)) {
						$scope.error = response.error.join('\n');
					} else {
						$scope.error = response;
					}
					$scope.status = 'standby';
				}
			}
			, function(error) {
				$scope.error = error;
				$scope.status = 'standby';
			}
		);
	}

	$scope.$watch('model', function() {
		$scope.formError = '';
	}, true);
}
},{}],11:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/signup/'
		, {}
		, {
			signup: { method: 'POST' }
		});

	return client;
}
},{}],12:[function(require,module,exports){
module.exports = function() {
	var controller = require('./signup.controller');

	return {
		templateUrl: 'signup/signup.form.html'
		, scope: {
			model: '='
		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			$scope.$watch('model', function(newModel) {
				if (newModel.show) {
					modal.modal('show');
				} else {
					modal.modal('hide');
				}
			}, true);

			$scope.$watch('status', function(newStatus) {
				if ($scope.status == 'success') {
					setTimeout(function() {
						modal.modal('hide');
					}, 1000);
				}
			});

			modal.on('hidden.bs.modal', function() {
				$scope.model.show = false;
				setTimeout(function() { $scope.$apply(); }, 100);
			});
		}

		, controller: ['$scope', 'signup_service', 'messenger_service', controller]
	}
}
},{"./signup.controller":10}]},{},[1]);
