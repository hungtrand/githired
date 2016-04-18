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