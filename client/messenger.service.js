module.exports = function() {
	var models = {
		sidebar: {
			show: false
		}

		, signup: {
			show: false
		}

		, postJob: {
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

		, setPostJob: function() {
			// do something...
		}

		, getPostJob: function() {
			return models.postJob;
		}
	}

	return service;
}