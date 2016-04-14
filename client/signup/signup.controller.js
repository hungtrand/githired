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
				if (response.userId > 0) {
					messenger.setUser(response);
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