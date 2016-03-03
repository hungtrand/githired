module.exports = function($scope) {
	$scope.$on('searchBar.input.submit', function(evt, keywords) {
		$scope.$broadcast("status.waiting");
	});
}