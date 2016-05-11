module.exports = function($resource, $rootScope, bidlist_factory) {
    // define the class
    var resJob = $resource(
            '/api/jobs/:jobId/:request',
            {
                request: "@createJob",
                jobId: "@jobId"
            },
            {
                createJob: { method: 'POST', params: { request: 'createJob' } },
                update: { method: 'PUT' }
            }
            );	

    resJob.prototype.fetchBids = function() {
        var self = this;
        console.log(self.jobId);
        self.bids = bidlist_factory.query( 
            { 
                requestParam1: 'jobs', 
                requestParam2: 'currentbids',
                jobId: self.jobId 
            }, function(response) {
                console.log("successfully retrieved bids for this job");
            }, function(failure) {
                console.log("Failure: " + failure);
            }
        );
    }

    return resJob;
}
