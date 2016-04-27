module.exports = function() {
    var controller = function($scope, messenger, trendySkills_service) {
        $scope.control = {};
        $scope.skills = messenger.mySkills.skills;
        messenger.mySkills.control = $scope.control;
        
        $scope.selected = null;
        $scope.selectSkill = function($item, $model, $label, $event) {
            $scope.selected = "";
            $scope.skills.push($model);
        }

        $scope.removeSkill = function($index) {
            $scope.skills.splice($index, 1);
        }

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
    }

    return {
        templateUrl: "skills/mySkills.template.html",
        scope: {

        },
        link: function($scope, $element, $attrs) {
            var modal = $element.find('.modal');
            
            $scope.control.show = function() {
                modal.modal('show');
            }
            $scope.control.hide = function() {
                modal.modal('hide');
            }

        },
        
        controller: ['$scope','messenger_service', 'trendySkills_service', controller]
    }
}
