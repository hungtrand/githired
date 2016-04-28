module.exports = function($scope, messenger) {
    $scope.control = {};
    messenger.signup.control = $scope.control;
    $scope.formError = '';
    $scope.error = '';
    $scope.status = 'standby';
    $scope.model = {};

    var validate = function() {
        if ($scope.model.password !== $scope.model.confPassword) {
            $scope.formError = "password";
            return false;
        }

        if (!$scope.model.isEmployer && !$scope.model.isEmployee) {
            $scope.formError = 'employment';
            return false;
        }

        return true;
    }

    $scope.submit = function() {
        $scope.error = '';
        $scope.formError = '';
        $scope.status = 'waiting';

        if (!validate()) return false;

        $scope.model.company = $scope.model.isEmployer ? $scope.model.company : '';
        $scope.model.firstName = $scope.model.isEmployee ? $scope.model.firstName : '';
        $scope.model.lastName = $scope.model.isEmployee ? $scope.model.lastName : '';

        messenger.signup($scope.model)
            .then(
                    function(response) {
                        if (response.userId > 0) {
                            $scope.status = 'success';
                            setTimeout(function() {
                                $scope.control.hide();
                            }, 1500);
                        } else {
                            $scope.error = response;
                            $scope.status = 'standby';
                        }
                    },
                    function(error) {
                        $scope.error = error;
                        $scope.status = 'standby';
                    });
    }
}
