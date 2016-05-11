module.exports = function($resource, $rootScope, mySkills_factory, bid_factory) {
    // define the class
    var resUser = $resource(
            '/api/user/:userId/:request', 
            {
                userId: "@id",
                request: "@signinORsignoutORsignup"
            }, 
            {
                signup: { method: 'POST', params: { request: 'signup' } },
                signin: { method: 'POST', params: { request: 'signin' } },
                signout: { method: 'POST', params: { request: 'signout' }}

            }
    );

    resUser.prototype.saveSkills = function() {
        var self = this;
        var results = mySkills_factory.save(
            { userId: self.userId },
            self.skills
        );

        return results.$promise;
    }

    resUser.prototype.fetchSkills = function() {
        var self = this;
        self.skills = mySkills_factory.query({ userId: self.userId });
    };

    resUser.prototype.fetchJobs = function() {
        var self = this;
        var jobsUrl = '/api/user/:userId/userJobs';
        var res = $resource(jobsUrl, {
            userId: self.userId
        });

        self.jobs = res.query();
    }

    resUser.prototype.fetchBids = function() {
        var self = this;
        var bidUrl = '/api/user/:userId/bids/:bidId';
        var res = $resource(bidUrl, {
            userId: self.userId,
            bidId: '@bidId'
        });

        self.bids = res.query();
    }

    resUser.prototype.createBid = function(jobId, bidAmount) {
        var self = this;
        var userData = {
            userId: self.userId
        }
        var bid = bid_factory.create(userData, { jobId: jobId, bidAmount: bidAmount });
        bid.$promise.then(function() {
            if (!angular.isArray(self.bids)) {
                self.bids = [];
            }
            self.bids.push(bid);
        })
       
        return bid.$promise;
    }

    return resUser;
}
