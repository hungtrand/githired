module.exports = function ($scope, messenger) {
	$scope.sidebarModel = messenger.getSidebar();

	$scope.signinModalControl = {}; // to be assigned by the signinModal directive
	$scope.$on('navbar.buttonSignin.clicked', function() {
		$scope.signinModalControl.show();
	});
}