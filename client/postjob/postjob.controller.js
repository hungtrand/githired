module.exports = function($scope, messenger, trendySkills_service) {
    $scope.control = {};
    messenger.jobPostingForm.control = $scope.control;
    $scope.model = {};
    $scope.model.skills = [];


    $scope.submitPostJob = function() {
        $scope.loading = true;
        if ($scope.model.jobId) {
           messenger
               .updateJob($scope.model) 
               .then(function() { 
                   $scope.control.hide();
                   $scope.loading = false;
               }, function() {
                    $scope.loading = false;
               });
        } else {
            messenger
                .addJob($scope.model)
                .then(function() { 
                    $scope.control.hide();
                    $scope.loading = false;
                },
                function() {
                    $scope.loading = false;
                });
        }
       
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
        if ($scope.model.jobId) {
            $scope.model.skills[$index].delete = true;
        } else {
            $scope.model.skills.splice($index, 1);
        }
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
