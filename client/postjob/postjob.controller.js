module.exports = function($scope, messenger, trendySkills_service) {
    $scope.control = {};
    messenger.jobPostingForm.control = $scope.control;
    $scope.model = {};
    $scope.model.skills = [];


    $scope.submitPostJob = function() {
        messenger
            .addJob($scope.model)
            .then(function() { $scope.control.hide() });
    }

    $scope.selected = null;
    $scope.selectRequiredSkill = function($item, $model, $label, $event) {
        $scope.selected = "";
        console.log($model);
        $scope.model.skills.push({
            name: $model
        });
    }

    $scope.removeSkill = function($index) {
        $scope.model.skills.splice($index, 1);
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
