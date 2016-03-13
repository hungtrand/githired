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