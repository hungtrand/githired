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