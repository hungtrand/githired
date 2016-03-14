module.exports = function($scope, postjob_service, messenger) {
	$scope.messenger = messenger;
	$scope.model = messenger.getJobPost();
	$scope.error = '';
	$scope.status = 'standby';

	$scope.submit = function() {
		$scope.status = 'waiting';


		postjob_service.signup(
			$scope.model,
			function(response) {

			},
			function(error) {
				$scope.error = error;
				$scope.status = 'standy';
			}
		);
	}
}