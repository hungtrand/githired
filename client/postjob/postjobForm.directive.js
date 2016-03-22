module.exports = function() {
	var controller = require('./postjob.controller');

	return {
		templateUrl: 'postjob/postjob.form.html'

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			
			$scope.$watch('model', function(newValue, oldValue) {
				if (newValue.show) {
					modal.modal('show');
				} else {
					modal.modal('hide');
				}
			}, true);

			modal.on('hidden.bs.modal', function() {
				$scope.model.show = false;
				setTimeout(function() { $scope.$apply(); }, 100);
			});
		}

		, controller: ['$scope', 'postjob_service', 'messenger_service', controller]
	}
}