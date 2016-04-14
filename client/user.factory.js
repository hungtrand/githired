module.exports = function($resource, $rootScope) {
	// define the class
	var resUser = $resource(
		'/api/user/:request'
		, 
		{
			request: "@signinORsignout"
		}
		, 
		{
			signin: { method: 'POST', params: { request: 'signin' } }
		});

	return resUser;
}