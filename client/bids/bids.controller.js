module.exports = function($scope, messenger, $sce) {
    $scope.control = {};
    messenger.bidsModal.control = $scope.control;

    $scope.getSource = function(linkedin) {
        return "bids/linkedin-widget.html#/?profile=" + encodeURIComponent(linkedin);
    }

    $scope.acceptBid = function(bid) {
        bid.accepted = true;
    }

    $scope.declineBid = function(bid) {
        bid.declined = true;
    }
}
