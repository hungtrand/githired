module.exports = function() {
	var controller = require('./signup.controller');

	return {
		templateUrl: 'signup/signup.form.html'
		, scope: {

		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			$scope.control.show = function() { modal.modal('show'); }
			$scope.control.hide = function() {modal.modal('hide'); }

		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}