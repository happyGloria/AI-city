/**
 * 一标六实主面板
 * 2018/05/04
 */
define(
    ['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function(app, controllers, $, configFile, notify, dark, dMapCtrl, common) {
		var communityAllCtrl = [
            '$scope',
            '$state',
            '$stateParams',
            'communityAllService',
            'mapService',
            '$compile',
            'communityRightModuleService',
            'moreService',
            '$interval',
            function($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {
                // 设置样式
                window.onResize = function() {
                    var baseWidth = 1920;
                    var screenWidth = document.body.clientWidth;
                    windowHtmlSize = screenWidth / baseWidth * 100;
                    var defSize = screenWidth / baseWidth;
                    var axisFontSize = defSize * 24;
                    $("html").css({
                        fontSize: windowHtmlSize + 'px'
                    });
                }
                onResize();
                $(".layout").find("div").eq(0).css({
                    "padding-top": "0px"
                });
                
                // 1. 一标六实数据

                // 2. 实有人员分析
                // 2.1 年龄分布
                
            }
        ]
		return communityAllCtrl;
    }
);