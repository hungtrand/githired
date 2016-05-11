module.exports =function(messenger) {
    var controller = function($scope, messenger) {
        $scope.control = {};
        messenger.sidebar.control = $scope.control;
        $scope.userBids = messenger.user.bids;
        $scope.maxRating = 5;
    }
    return {
        templateUrl: 'sidebar/sidebar.template.html'
            , scope: {

            }

        , link: function($scope, $element, $attrs) {
            $scope.control.show = function() {
                $scope.userBids = messenger.user.bids;
                $scope.userJobs = messenger.user.jobs;
                $element.toggleClass("toggled", true);
            }
            $scope.control.hide = function() {
                $element.toggleClass("toggled", false);
            }

            $(document).on('dblclick', function() {
                console.log($scope.userBids);
                debugger
            })
        }

        , controller: ['$scope', 'messenger_service', controller]
    }
}
