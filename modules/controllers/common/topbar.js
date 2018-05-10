/**
 * Created by chenhao on 2018/5/10.
 */
define(['controllers/controllers', 'jquery', 'config/configFile', 'layer', 'notify', 'moment'],
	function(controllers, $, configFile, layer, notify, moment) {
        var navigationCtrl = ['$scope', '$location','$http','$rootScope', '$state', '$stateParams','$compile', '$interval', '$timeout',
            function ($scope, $location, $http,$rootScope, $state, $stateParams,  $compile,
				$interval, $timeout) {
                // location.href = '/#/index/communityChen/';
                $scope.initNav = function () {
                    $scope.activeNav = $location.$$path
                }
                $scope.initNav()
                $scope.showSecondMenus=function(val){
                    $scope.showSecondMenusHover=val
                }
                $scope.hideSecondMenus=function () {
                    $scope.showSecondMenusHover = false
                }

			}
		];
		return navigationCtrl;
	});