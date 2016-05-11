module.exports = function($resource, $rootScope) {
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

    return resJob;
}
