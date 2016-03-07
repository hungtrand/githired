module.exports = function() {
	var service = {
		sidebar: {
			show: false
		}
		, signup: {
			show: false
		}

		, getSignupModel: function() {
			return this.signup;
		}
	}

	return service;
}