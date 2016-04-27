module.exports = function() {
    var controller = require('./postjob.controller');

    return {
        templateUrl: 'postjob/postjob.form.html',
            control: "="

                ,
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
                        jobSetWage: ''
                    }

                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                    $scope.model = null;
                }
            }

        ,
            controller: ['$scope', 'messenger_service', controller]
    }
}
