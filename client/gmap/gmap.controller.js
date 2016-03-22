module.exports = function($scope, messenger) {
	if (messenger) {
		$scope.jobs = messenger.getJobs();
	}
	
	$scope.requestPostJob = function(objAddress) {
		messenger.setNewJobAtAddress(objAddress);
	}

	$scope.$on('models.jobs', function(evt, eventType) {
		if (eventType == 'updated') {
			$scope.jobs = messenger.getJobs();
		}
	});
}