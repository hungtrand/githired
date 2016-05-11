module.exports = function(messenger) {
    var controller = require('./jobWindow.controller.js');

    return {
        templateUrl: 'jobs/jobWindow.template.html',
        scope: {
            jobId: "="
        },
        link: function($scope, $element, $attrs) {
            angular.forEach($scope.jobs, function(j, i) {
                if (j.jobId == $scope.jobId) {
                    $scope.job = j;
                }
            });

            angular.forEach(messenger.user.bids, function(b, i) {
                if (b.jobId == $scope.jobId) {
                    $scope.job.userBid = b;
                }
            });
        },
        controller: ['$scope', 'messenger_service', controller]
    }
}
