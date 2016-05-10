module.exports = function() {
    var controller = require("./navbar.controller");

    return {
        templateUrl: 'navbar/navbar.template.html'
            , link: function($scope, $element, $http) {
                $element.find('.menuLinkedInItem').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); 
                });

                $scope.reloadLinkedInScript = function() {
                    var srcScript = $element.find('.linkedinScript').attr('src');
                    $element.find('.linkedinWidgetBlock').find(':not(.profileScript)').remove();
                    $element.find('.linkedinWidgetBlock').append('<script class="linkedinScript" src="' + srcScript + '"></script>');
                }
            }
        , controller: ['$scope', 'messenger_service', controller]
    }
}
