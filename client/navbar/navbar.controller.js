module.exports = function($scope, messenger) {
	// models
	$scope.user = messenger.getUser();
	$scope.sidebar = messenger.getSidebar();
	$scope.signup = messenger.getSignup();
	$scope.postjob = messenger.getPostJob();

	// events handlers
	$scope.$on('searchBar.input.submit', function(evt, keywords) {
		$scope.$broadcast("status.waiting");
	});

	$scope.$on('models.user.updated', function(evt, user) {
		$scope.user = messenger.getUser();
	});

	// helpers
	$scope.vEllipsisToggle = function() {
		$scope.sidebar.show = !$scope.sidebar.show;
		$scope.vEllipsis = $scope.sidebar.show;
	}

	$scope.triggerSignup = function() {
		$scope.signup.show = true;
	}

	$scope.showPostJob = function() {
		$scope.postjob.show = true;
	}
	
}