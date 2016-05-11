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

            $scope.addBid = function(job) {
                console.log("you clicked on the bid button");
                var bidAmount = $element.find(".bidAmount").val() || job.setWage;
                $scope.user.createBid(job.jobId, bidAmount);
            } 
        },
        controller: ['$scope', 'messenger_service', controller]
    }
}
