module.exports = function($rootScope) {
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