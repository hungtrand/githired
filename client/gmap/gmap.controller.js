module.exports = function($scope, messenger) {
	$scope.control = {};
	$scope.jobs = messenger.joblist;
	messenger.gmap.control = $scope.control;
	
	$scope.requestPostJob = function(objAddress) {
		messenger.jobPostingForm.control.show(objAddress);
	}
}