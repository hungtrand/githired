module.exports = function($scope, messenger) {
	$scope.control = {};
	messenger.gmap.control = $scope.control;
	
	$scope.requestPostJob = function(objAddress) {
		messenger.jobPostingForm.show(objAddress);
	}
}