module.exports = function ($scope, messenger) {
    if (sessionStorage.getItem("__githired.user.credentials__")) {
        var strCredentials = sessionStorage.getItem("__githired.user.credentials__");
        var email = strCredentials.split(":")[0];
        var pass = strCredentials.split(":")[1];
        messenger
            .signin({ email: email, password: pass})
            .then(
                function(response) {
                    messenger.user.fetchSkills();
                    messenger.user.fetchBids();
                    messenger.user.fetchJobs();
                },
                function(failure) {
                    console.log("Failed to load user. Error: " + failure);
                }
            );
    }

    $scope.$on('gmap.home.set', function() {
        $scope.editHome = false;
    });

    messenger.fetchJobs();
}
