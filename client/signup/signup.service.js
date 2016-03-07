module.exports = function($resource, $rootScope) {
	var client = $resource(
		'/api/signup/'
		, {}
		, {
			signup: { method: 'POST' }
		});

	return client;
}