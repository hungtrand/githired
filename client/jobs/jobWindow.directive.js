module.exports = function() {
    var controller = function($scope, messenger) {
        $scope.jobs = messenger.joblist;
        $scope.user = messenger.user;
    }

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
        },
        controller: ['$scope', 'messenger_service', controller]
    }
}
