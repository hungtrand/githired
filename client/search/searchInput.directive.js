module.exports = function() {

    return {
        templateUrl: 'search/searchBar.template.html',
        link: function($scope, $element, $attrs) {
            $element.find('form').on('submit', function(e) {
                $scope.sendQuery($scope.searchInput);
            });

        },

        controller: ['$scope', 'trendySkills_service', 'messenger_service', function($scope, trendySkills_service, messenger) {
            $scope.waiting = false;
            $scope.searchLog = {};
            $scope.clear = function() {
                $scope.searchLog = {};
                $scope.$emit('searchInput.cleared');
                $scope.searchInput = '';
                setTimeout(function() { $scope.$apply(); }, 10);
            }
            $scope.numberOfFilters = 0;

            $scope.selected = null;
            $scope.selectSkill = function($item, $model, $label, $event) {
                $scope.selected = "";
                $scope.searchLog[$model] = true;
                $scope.sendQuery();
            } 

            $scope.$watch('searchLog', function() {
                $scope.numberOfFilters = Object.keys($scope.searchLog).length;
            });

            $scope.getSkillSuggestions = function(query) {
                var http = trendySkills_service.getSkills({ like: query});

                return http.$promise.then(
                        function(response) {
                            if (response.success) {
                                return response.keywords;
                            } else {
                                return [];
                            }        
                        }, 
                        function(failure) {
                            console.log(failure);
                        }
                        );
            }

            $scope.sendQuery = function() {
                messenger.fetchJobs(Object.keys($scope.searchLog));
            }
        }]
    }
}
