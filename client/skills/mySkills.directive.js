module.exports = function() {
    var controller = function($scope, messenger, trendySkills_service) {
        $scope.control = {};
        $scope.waiting = false;
        $scope.user = messenger.user;

        $scope.status = "";

        $scope.skills = $scope.user.skills;
        messenger.mySkillsModal.control = $scope.control;
        
        $scope.selected = null;
        $scope.selectSkill = function($item, $model, $label, $event) {
            $scope.selected = "";
            $scope.user.skills.push($model);
        }

        $scope.removeSkill = function($index) {
            $scope.user.skills.splice($index, 1);
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

        $scope.save = function() {
            $scope.waiting = true;
            $scope.user
                .saveSkills()
                .then(
                    function(response) {
                        console.log("Saved skills successfully");
                        $scope.waiting = false;
                        $sccope.status = "saved";

                        setTimeout(function() {
                            $scope.status = "";
                            $scope.$apply();
                        }, 3000);
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
