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