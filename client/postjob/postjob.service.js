module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/postjob/'
		, {}
		, {
			signup: { method: 'POST' }
		});

	return client;
}