module.exports = function($scope, messenger, job_factory) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;
    $scope.bidding = false;
    $scope.startEdit = function() {
        messenger.jobPostingForm.control.edit($scope.job);
    }

    $scope.showBids = function(job, user) {
    	// since job may be raw data from database, it might not have functions defined in job.factory.js
    	// create a new job with values from job
    	var objjob = new job_factory();
    	angular.extend(objjob, job);

    	// now fetch the jobs
    	objjob.fetchBids();

        messenger.bidsModal.control.show(objjob);
    }
}
