module.exports = function($resource, $rootScope) {
	// define the class
	var resUser = $resource(
		'/api/user/:request'
		, 
		{
			request: "@signinORsignoutORsignup"
		}
		, 
		{
			signup: { method: 'POST', params: { request: 'signup' } }
			,
			signin: { method: 'POST', params: { request: 'signin' } }
			,
			signout: { method: 'POST', params: { request: 'signout' } }
			
		});

	return resUser;
}