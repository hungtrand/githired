module.exports = function() {
	var controller = require('./bids.controller');

	return {
		templateUrl: 'bids/bids.modal.html'
		, scope: {
			
		}

		, link: function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			
			$scope.control.show = function(job) { 
				$scope.bids = job.bids;
				modal.modal('show'); 
			}
			$scope.control.hide = function() { modal.modal('hide'); }
		}

		, controller: ['$scope', 'messenger_service', controller]
	}
}