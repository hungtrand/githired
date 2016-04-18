module.exports = function($rootScope, user_factory) {

	var service = {
		sidebar: {}

		, navbar: {}

		, signup: {
			submit: function(signupForm) {
				user = user_factory.signup(signupForm);
				user.$promise
					.then(
						function(newUser) {
							if (newUser.userId) {
								service.setUser(newUser);
							}
						}
						,
						function(error) {
							$rootScope.$broadcast('error', error);
						});

				return user.$promise;
			}
		}

		, signin: {
			submit: function(signinForm) {
				var user = user_factory.signin({}, signinForm);
				user.$promise.then(
					function(response) {
						if (response.userId) {
							service.setUser(user);
						}
					}
					,
					function(response) {
						$rootScope.$broadcast('error', response);
					}
				);

				return user.$promise;
			}
		}

		, jobPostingForm: {}

		, jobs: []

		, user: {}

		, gmap: {}

		, setUser: function(user) {
			var self = this;
			angular.copy(user, self.user);
		}
		, addJob: function(jobForm) {
			var self = this;
			// TODO job_factory
		}
	}

	return service;
}