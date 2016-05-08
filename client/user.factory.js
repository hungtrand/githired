module.exports = function($resource, $rootScope, mySkills_factory) {
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
                signout: { method: 'POST', params: { request: 'signout' } }

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

    return resUser;
}
