module.exports = function($scope, messenger) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;

    $scope.showBids = function(job, user) {
        messenger.bidsModal.control.show();
    }
}