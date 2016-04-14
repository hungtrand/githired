module.exports = function($scope, messenger) {
	$scope.control = {};
	$scope.form = { email: null, password: null };

	$scope.status = "standby";

	$scope.submit = function() {
		$scope.status = "waiting";
		messenger
			.signin($scope.form)
			.then(function(response) {
				$scope.status = "success";
				$scope.form.email = null;
				$scope.form.password = null;
				setTimeout(function() {
					$scope.control.hide();
				},2000);
			});
		;
	}
}