module.exports = function($scope, messenger, $sce) {
    $scope.control = {};
    messenger.bidsModal.control = $scope.control;

    $scope.getSource = function(linkedin) {
        return "bids/linkedin-widget.html#/?profile=" + encodeURIComponent(linkedin);
    }

    $scope.acceptBid = function(bid, index) {
        bid.accepted = true;
        setTimeout(function() {
            bid.deleted = true;
            $scope.$apply();
        },3000);
    }

    $scope.declineBid = function(bid, index) {
        bid.declined = true;
        setTimeout(function() {
            bid.deleted = true;
            $scope.$apply();
        },3000);
    }
}
