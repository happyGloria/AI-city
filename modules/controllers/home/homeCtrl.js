/**
 * Created by lihouhua on 2016/4/25.
 */
define(['controllers/controllers', 'notify', 'layer', 'config/common', 'config/configFile'],
    function (controllers, notify, layer, common, configFile) {
        var homeCtrl = ['$scope', '$rootScope', '$state', '$stateParams', 'mapService', 'homeService', 'loginService', '$compile', '$timeout', '$http',
            function ($scope, $rootScope, $state, $stateParams, mapService, homeService, loginService, $compile, $timeout, $http) {


            }
        ];
        return homeCtrl;
})