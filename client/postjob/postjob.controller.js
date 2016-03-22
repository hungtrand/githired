module.exports = function($scope, postjob_service, messenger) {
	$scope.messenger = messenger;
	$scope.model = messenger.getPostJob();
	$scope.error = '';

	$scope.submit = function() {
		console.log("pressed");
		postjob_service.postjob(
			$scope.model
			, function(response) {
				if (response.JobId > 0) {
					$scope.$emit('models.job.posted', response);
					$scope.$broadcast('models.job.posted', response);
				} else {
					if (angular.isArray(response.error)) {
						$scope.error = response.error.join('\n');
					} else {
						$scope.error = response;
					}
				}
			}
			, function(error) {
				$scope.error = error;
			}
		);
	}
}