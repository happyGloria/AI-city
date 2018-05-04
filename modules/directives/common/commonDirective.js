/**
 * commonDirective.js
 * Created by jgx on 2016/4/12.
 */
define(['../directives'],
    function(directives){
        directives.directive('resourceodometer',function(){
            return {
                restrict:'E',
                templateUrl:'./template/html/directives/resourceOdometer.html',
                controller: 'initOdometerCtrl',
                replace: true
            }
        });
    });
