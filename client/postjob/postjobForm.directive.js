module.exports = function() {
    var controller = require('./postjob.controller');

    return {
        templateUrl: 'postjob/postjob.form.html',
            control: "=",
            link: function($scope, $element, $attrs) {
                var modal = $element.find('.modal');

                $scope.control.show = function(objAddress) {
                    $scope.model = {
                        jobTitle: '',
                        jobDescription: '',
                        jobAddress: objAddress,
                        jobWageType: null,
                        jobMinWage: '',
                        jobMaxWage: '',
                        jobSetWage: '',
                        skills: []
                    }

                    setTimeout(function() { $scope.$apply(); }, 200);

                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                    $scope.model = null;
                }

                modal.on('hidden.bs.modal', function() {
                    $scope.model = null;
                });
            },
            controller: ['$scope', 'messenger_service', 'trendySkills_service', controller]
    }
}
