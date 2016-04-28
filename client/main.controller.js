module.exports = function ($scope, messenger) {
    console.log(messenger.joblist);
    if (sessionStorage.getItem("__githired.user.credentials__")) {
        var strCredentials = sessionStorage.getItem("__githired.user.credentials__");
        var email = strCredentials.split(":")[0];
        var pass = strCredentials.split(":")[1];
        messenger
            .signin({ email: email, password: pass})
            .then(
                function(response) {
                    messenger.user.fetchSkills();
                },
                function(failure) {
                    console.log("Failed to load user. Error: " + failure);
                }
            );
    }
}
