module.exports = function ($scope, messenger) {
	$scope.sidebarModel = messenger.getSidebar();
}