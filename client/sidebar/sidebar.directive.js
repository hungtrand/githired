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