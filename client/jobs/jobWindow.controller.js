module.exports = function($scope, messenger) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;

    $scope.startEdit = function() {
        messenger.jobPostingForm.control.edit($scope.job);
    }

    $scope.showBids = function(job, user) {
        messenger.bidsModal.control.show();
    }
}