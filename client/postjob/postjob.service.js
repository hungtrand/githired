module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/postjob/'
		, {}
		, {
			postjob: { method: 'POST' }
		});
	
	return client;
}