module.exports = function($scope, messenger) {
	$scope.user = messenger.user;
$(document).on('dblclick', function() { console.log($scope.user) });
	$scope.vEllipsisToggle = function() {
		messenger.sidebar.control.show();
	}

	$scope.onSignupClicked = function() {
		messenger.signup.control.show();
	}

	$scope.onSigninClicked = function() {
		messenger.signin.control.show();
	}

	$scope.onSignoutClicked = function() {
		// TODO
	}

	$scope.onSidebarToggleClicked = function() {
		// TODO
		$scope.vEllipsis = !$scope.vEllipsis;
		if ($scope.vEllipsis) {
			messenger.sidebar.control.show();
		} else {
			messenger.sidebar.control.hide();
		}
		
	}
	
}