module.exports = function($resource, $rootScope) {
	// define the class
	var resJob = $resource(
		'/api/jobs/:request',
		{
			request: "@createJob"
		},
		{
			createJob: { method: 'POST', params: { request: 'createJob' } }
		}
	);	

	return resJob;
}