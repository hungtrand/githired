module.exports = function($scope, messenger) {
	$scope.model = messenger.getPostJob();
	$scope.show = false;

	$scope.$on('models.postJob.newJob', function(evt, eventType) {
		if (eventType == 'updated') {
			$scope.show();
		}
	});

	$scope.submitPostJob = function() {
		console.log('submitted');
		messenger.addJob($scope.model.newJob);
		$scope.hide();
	}
}