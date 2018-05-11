/**
 * 一标六实主面板
 * 2018/05/04
 */
define(
	['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', '/modules/config/echartsConfig.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function (app, controllers, $, configFile, echartsConfig,notify, dark, dMapCtrl, common) {
		var communityChenCtrl = [
			'$scope',
			'$state',
			'$stateParams',
			'communityAllService',
			'mapService',
			'$compile',
			'communityRightModuleService',
			'moreService',
			'$interval',
			'moreService',
			function ($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval, moreService) {
				
			}
		]
		return communityChenCtrl;
	}
);