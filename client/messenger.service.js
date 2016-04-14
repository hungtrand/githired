module.exports = function($rootScope, user_factory) {
	var models = {
		sidebar: {
			show: false
		}

		, signup: {
			show: false
		}

		, postJob: {
			newJob: null
		}

		, jobs: []

		, user: {}
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

		, signin: function(signinForm) {
			var user = user_factory.signin({}, signinForm);
			user.$promise.then(
				function(response) {
					angular.copy(user, models.user);
				}
				,
				function(response) {
					$rootScope.$broadcast('error', response);
				}
			);

			return user.$promise;
		}

		, setUser: function(user) {
			var self = this;
			angular.copy(user, models.user);
		}

		, setNewJobAtAddress: function(objAddress) {
			var self = this;
			models.postJob.newJob = {
				jobTitle: ''
				, jobDescription: ''
				, jobAddress: objAddress
				, jobWageType: null
				, jobMinWage: ''
				, jobMaxWage: ''
				, jobSetWage: ''
			}

			$rootScope.$broadcast('models.postJob.newJob', 'updated');
		} 

		, addJob: function(newJob) {
			models.jobs.push(newJob);
			$rootScope.$broadcast('models.jobs', 'updated');
		}

		, getPostJob: function() {
			return models.postJob;
		}

		, getJobs: function() {
			return models.jobs;
		}
	}

	return service;
}