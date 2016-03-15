module.exports = function() {
	var controller = require('./postjob.controller');

	return {
		templateUrl: 'postjob/postjob.form.html'

		, link: function($scope, $element, $attrs) {
			$element.find('.modal').modal('hide');

			$scope.$watch('model', function(newValue, oldValue) {
				var modal = $element.find('.modal');
				if (newValue.show) {
					modal.modal('show');
				} else {
					modal.modal('hide');
				}
			}, true);

			modal.on('hidden.bs.modal', function() {
				$scope.model.show = false;
				$scope.$apply();
			});
		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}