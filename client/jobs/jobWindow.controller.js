module.exports = function($scope, messenger) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;
    $scope.bidding = false;
    $scope.startEdit = function() {
        messenger.jobPostingForm.control.edit($scope.job);
    }

    $scope.addBid = function(job) {
        $scope.bidding = true;
        var bidAmount = $scope.bidAmount || job.setWage;
        $scope.user
            .createBid(job.jobId, bidAmount)
            .then(function(response) {
                $scope.job.userBid = response;
                $scope.bidding = false;
            });
    }

    $scope.showBids = function(job, user) {
        messenger.bidsModal.control.show();
    }
}
