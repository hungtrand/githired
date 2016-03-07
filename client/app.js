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
	var app = angular.module('githired', ['ngResource']);

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
},{"./gmap/gmap.controller":2,"./gmap/gmap.directive":3,"./main.controller":4,"./messenger.service":5,"./navbar/navbar.directive":6,"./search/searchInput.directive":7,"./sidebar/sidebar.directive":8,"./signup/signup.service":9,"./signup/signupForm.directive":10}],2:[function(require,module,exports){
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
	$scope.sidebarModel = messenger.sidebar;
}
},{}],5:[function(require,module,exports){
module.exports = function() {
	var service = {
		sidebar: {
			show: false
		}
		, signup: {
			show: false
		}

		, getSignupModel: function() {
			return this.signup;
		}
	}

	return service;
}
},{}],6:[function(require,module,exports){
module.exports = function() {
	var controller = function($scope, messenger) {
		$scope.vEllipsisToggle = function() {
			messenger.sidebar.show = !messenger.sidebar.show;
			$scope.vEllipsis = messenger.sidebar.show;
		}

		$scope.$on('searchBar.input.submit', function(evt, keywords) {
			$scope.$broadcast("status.waiting");
		});

		$scope.triggerSignup = function() {
			messenger.signup.show = true;
		}
	}

	return {
		templateUrl: 'navbar/navbar.template.html'
		, link: function($scope, $element, $http) {

		}
		, controller: ['$scope', 'messenger_service', controller]
	}
}
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/signup/'
		, {}
		, {
			signup: { method: 'POST' }
		});

	return client;
}
},{}],10:[function(require,module,exports){
module.exports = function() {
	var controller = function($scope, signup_service, messenger) {
		$scope.messenger = messenger;
		$scope.model = messenger.getSignupModel();
		$scope.formError = '';

		$scope.submit = function() {
			$scope.formError = '';
			if ($scope.model.password !== $scope.model.confPassword) {
				$scope.formError = "password";
				return false;
			}

			signup_service.signup();
			console.log('submitted');
		}

	}

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

			modal.on('hidden.bs.modal', function() {
				$scope.model.show = false;
				setTimeout(function() { $scope.$apply(); }, 100);
			});
		}

		, controller: ['$scope', 'signup_service', 'messenger_service', controller]
	}
}
},{}]},{},[1]);
