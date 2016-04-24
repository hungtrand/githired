module.exports = function($rootScope, user_factory, joblist_factory) {

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

		, joblist: []

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
		, fetchJobs: function() {
			var self = this;
			joblist_factory.query({}, function(response) {
				// success
				console.log("i'm in success");
				console.log("Response:" + response);

				// self.joblist.splice(0, self.joblist.length);
				angular.copy(response, self.joblist); // use angular copy to save reference
			}, function(failure) {
				// failure
				console.log("Failure:" + failure);
			});

			//console.log(self.joblist);
		}
	}
	$(document).on('dblclick', function() {
		service.fetchJobs();
	});

	return service;
}