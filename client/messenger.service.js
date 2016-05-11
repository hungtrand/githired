module.exports = function($rootScope, user_factory, joblist_factory, job_factory) {

    var service = {
        sidebar: {}, 
        navbar: {}, 
        signup: function(signupForm) {
            var self = this;
            self.user = user_factory.signup(signupForm);
            self.user.$promise
                .then(
                        function(newUser) {
                            self.setSession(signupForm);
                        }
                        ,
                        function(error) {
                            $rootScope.$broadcast('error', error);
                        });

            return self.user.$promise;
        },
        signin: function(signinForm) {
            var self = this;
            self.user = user_factory.signin({}, signinForm);
            self.user.$promise.then(
                    function(response) {
                        if (response.userId) {
                            $rootScope.$broadcast("user.signin.success");
                            self.setSession(signinForm);
                        }
                    },
                    function(response) {
                        $rootScope.$broadcast('error', response);
                    }
                    );
            return self.user.$promise;
        },
        signout: function() {
            sessionStorage.removeItem("__githired.user.credentials__");
            window.location.reload();
        },
        jobPostingForm: {}, 
        joblist: [],
        user: null, 
        gmap: {},
        mySkillsModal: {},
        setSession: function(credentials) {
            var self = this;

            strCredentials = credentials.email + ":" + credentials.password;
            sessionStorage.setItem("__githired.user.credentials__", strCredentials);
        }, 
        addJob: function(jobForm) {
            var self = this;
            // TODO job_factory
            var job = job_factory.createJob({userId: this.user.userId}, jobForm);
            job.$promise
                .then(
                        function(newJob) {
                            self.jobs.push(job);
                        }
                        ,
                        function(error) {
                            $rootScope.$broadcast('error', error);
                        });

            return self.job.$promise;
        }, 
        fetchJobs: function(arrSkills) {
            var self = this;
            var searchParams = { skills: arrSkills || [] };
            var promise = null; 
            if (arrSkills) {
                promise = joblist_factory.search({}, searchParams, function(response) {
                    angular.copy(response, self.joblist);
                }, function(failure) {
                    console.log(failure);
                });
            } else {
                promise = joblist_factory.query({}, function(response) {
                    angular.copy(response, self.joblist); // use angular copy to save reference
                }, function(failure) {
                    // failure
                    console.log("Failure:" + failure);
                });

            }

            return promise.$promise;
        }
    }

    return service;
}
