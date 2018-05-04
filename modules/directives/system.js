define(['./directives'],
    function (directives) {
        directives.directive('sysChart', function () {
            return {
                restrict: 'A',
                replace: false,
                template: '',
                link: function (scope, element, attrs) {
                    //console.log(parseInt(attrs['sysChart'] || 0), element.get(0));
                    //scope.getCharts(parseInt(attrs['sysChart'] || 0), element.get(0));
                    scope.$watch(function() {
                        scope.getCharts(parseInt(attrs['sysChart'] || 0), element.get(0));
                    }, function() {

                    });
                }
            }
        });

        directives.directive('onFinishRenderFilters', function ($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    debugger;
                    if (scope.$last === true) {
                        $timeout(function() {
                            alert(444);
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            };
        });

    });
