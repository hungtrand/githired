module.exports = function($scope, messenger) {
    $scope.control = {};
    messenger.signin.control = $scope.control;
    $scope.form = {
        email: null,
        password: null
    };

    $scope.status = "standby";

    $scope.submit = function() {
        $scope.status = "waiting";
        $scope.error = "";
        messenger
            .signin($scope.form)
            .then(
                    function(response) {
                        $scope.status = "success";
                        $scope.form.email = null;
                        $scope.form.password = null;
                        setTimeout(function() {
                            $scope.control.hide();
                            $scope.status = "standby";

                            window.location.reload();
                        }, 1000);
                    }
                    , function(failure) {
                        $scope.error = failure.data;
                        $scope.status = "standby";
                    }
                 );
    }
}
