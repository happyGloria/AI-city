/**
 * 一标六实主面板
 * 2018/05/08
 */
define(
    ['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function(app, controllers, $, configFile, notify, dark, dMapCtrl, common) {
		var communityPanelCtrl = [
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
                
                // WeekAnalysis 一周感知数据量统计
                // 由于三维柱状图使用echarts不好实现，所以自己模拟!
                // x轴，配置：[{ type: 'MAC', 'label': 'MAC感知', 'value': '1000'}]
            }
        ]
		return communityPanelCtrl;
    }
);