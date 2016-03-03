function sidebar_directive() {
	return {
		templateUrl: 'sidebar/sidebar.template.html'
		, scope: {
			show: "="
		}
		, link: function($scope, $element, $attrs) {
			$scope.$watch('show', function() {
				$element.toggleClass("toggled");
				
			});

			
		}
	}
}