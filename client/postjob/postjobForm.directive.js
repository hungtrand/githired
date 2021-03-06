module.exports = function() {
    var controller = require('./postjob.controller');

    return {
        templateUrl: 'postjob/postjob.form.html',
            control: "=",
            link: function($scope, $element, $attrs) {
                var modal = $element.find('.modal');
                var resetModel = function() {
                    $scope.model.jobId = null;
                    $scope.model.jobTitle = '';
                    $scope.model.jobDescription = '';
                    $scope.model.jobAddress = null;
                    $scope.model.jobWageType = null;
                    $scope.model.minimumWage = '';
                    $scope.model.maximumWage = '';
                    $scope.model.setWage = '';
                    $scope.model.skills.splice(0, $scope.model.skills.length);
                }
                $scope.control.show = function(objAddress) {
                    resetModel();
                    $scope.model.jobAddress = objAddress;
                    setTimeout(function() { $scope.$apply(); }, 200);
                    
                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                }

                $scope.control.edit = function(existingJob) {
                    resetModel();
                    angular.extend($scope.model, existingJob);
                    modal.modal('show');
                }

                modal.on('hidden.bs.modal', function() {
                    resetModel();
                });
            },
            controller: ['$scope', 'messenger_service', 'trendySkills_service', controller]
    }
}
