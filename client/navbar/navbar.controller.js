module.exports = function($scope, messenger) {
    $scope.user = messenger.user;

    $scope.$on("user.signin.success", function(evt, data) {
        $scope.user = messenger.user;
    });

    $(document).on('dblclick', function() { console.log($scope.user) });
    $scope.vEllipsisToggle = function() {
        messenger.sidebar.control.show();
    }

    $scope.onSignupClicked = function() {
        messenger.signup.control.show();
    }

    $scope.onSigninClicked = function() {
        messenger.signin.control.show();
    }

    $scope.onSignoutClicked = function() {
        messenger.signout();
    }

    $scope.openMySkillsModal = function() {
        messenger.mySkillsModal.control.show();
    }

    $scope.onSidebarToggleClicked = function() {
        // TODO
        $scope.vEllipsis = !$scope.vEllipsis;
        if ($scope.vEllipsis) {
            messenger.sidebar.control.show();
        } else {
            messenger.sidebar.control.hide();
        }

    }

    $scope.updateUser = function() {
        $scope.user.loading = true;
        $scope.user
            .$save({ userId: $scope.user.userId })
            .then(
                function(response) {
                    $scope.user.loading = false;
                    $scope.editLinkedIn = false;
                    $scope.reloadLinkedInScript();
                },
                function(err) {
                    $scope.user.loading = false;
                });
    }

}
