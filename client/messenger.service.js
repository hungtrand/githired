module.exports = function() {
	var models = {
		sidebar: {
			show: false
		}
		, signup: {
			show: false
		}

		, user: null
	}

	var service = {

		getSidebar: function() {
			return models.sidebar;
		}
		
		, getSignup: function() {
			return models.signup;
		}

		, getUser: function() {
			return models.user;
		}

		, setUser: function(user) {
			var self = this;
			models.user = angular.extend({}, user);
		}

		, setJobPost: function() {
			// do something...
		}

		, getJobPost: function() {
			// do something...
		}
	}

	return service;
}