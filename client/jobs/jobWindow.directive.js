module.exports = function(messenger, job_factory) {
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

            $scope.addBid = function(job) {
                $scope.bidding = true;
                var bidAmount = $element.find('.bidAmount').val() || job.setWage;
                $scope.user
                    .createBid(job.jobId, bidAmount)
                    .then(function(response) {
                        $scope.job.userBid = response;
                        $scope.bidding = false;
                    });
            }
        },
        controller: ['$scope', 'messenger_service', 'job_factory', controller]
    }
}
