module.exports = function($scope, messenger) {
	$scope.control = {};
	messenger.jobPostingForm.control = $scope.control;
	$scope.model = {};

	$scope.submitPostJob = function() {
		messenger
			.addJob($scope.model)
			.then(function() { $scope.control.hide() });
	}
}