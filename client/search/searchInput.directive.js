module.exports = function() {

    return {
        templateUrl: 'search/searchBar.template.html',
        link: function($scope, $element, $attrs) {
            $element.find('form').on('submit', function(e) {
                $scope.sendQuery($scope.searchInput);
            });

        },

        controller: ['$scope', function($scope) {
            $scope.waiting = false;
            $scope.searchLog = {};
            $scope.clear = function() {
                $scope.searchLog = {};
                $scope.$emit('searchInput.cleared');
                $scope.searchInput = '';
                setTimeout(function() { $scope.$apply(); }, 10);
            }

            $scope.sendQuery = function(query) {

            }
        }]
    }
}
