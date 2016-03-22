module.exports = function() {
	var controller = require('./postjob.controller');

	return {
		templateUrl: 'postjob/postjob.form.html'

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			
			$scope.show = function() {
				modal.modal('show');
			};

			$scope.hide = function() {
				modal.modal('hide');
			};

			modal.on('shown.bs.modal', function() {
				setTimeout(function() { $scope.$apply() }, 500);
			});

			modal.on('hidden.bs.modal', function() {
				$scope.model.newJob = null;
				setTimeout(function() { $scope.$apply(); }, 100);
			});
		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}