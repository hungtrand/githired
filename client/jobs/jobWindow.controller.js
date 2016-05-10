module.exports = function($scope, messenger) {
    $scope.jobs = messenger.joblist;
    $scope.user = messenger.user;
}