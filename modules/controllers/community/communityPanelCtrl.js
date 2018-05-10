/**
 * 一标六实主面板
 * 2018/05/08
 */
define(
    ['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', '/modules/config/basicConfig.js','/modules/config/echartsConfig.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function(app, controllers, $, configFile, basicConfig, echartsConfig, notify, dark, dMapCtrl, common) {
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

                /*
                 * zTree 顶部树状结构
                 **/
                $scope.initzTree = function(){
                    var zTreeSetting = {
                        view: {
                            selectedMulti: true, //设置是否能够同时选中多个节点
                            showIcon: true,      //设置是否显示节点图标
                            showLine: true,      //设置是否显示节点与节点之间的连线
                            showTitle: true,     //设置是否显示节点的title提示信息
                        },
                        data: {
                            simpleData: {
                                enable: true,   //设置是否启用简单数据格式（zTree支持标准数据格式跟简单数据格式，上面例子中是标准数据格式）
                                idKey: "id",     //设置启用简单数据格式时id对应的属性名称
                                pidKey: "pId",    //设置启用简单数据格式时parentId对应的属性名称,ztree根据id及pid层级关系构建树结构
                                rootPId: 0
                            }
                        },
                        callback: {
                            onClick: zTreeOnCheck //点击节点时 回调
                        }
                    };
                    var zTree = $.fn.zTree.init($("#zTreeVillage"), zTreeSetting, basicConfig.villageNameMap);//初始化
                    var zTreeVillageList = $.fn.zTree.getZTreeObj("zTreeVillage");
                    zTreeVillageList.expandAll(true); //默认展开所有
                }
                $scope.initzTree()

                function zTreeOnCheck(){
                    $scope.getNodeDetail();
                };

                $scope.getNodeDetail = function(){
                    var treeObj = $.fn.zTree.getZTreeObj("zTreeVillage");
                    var node = treeObj.getSelectedNodes();//点击节点后 获取节点数据
                    $scope.id = node[0].id;
                };

                /*
                 * 左、右、下面板，打开/关闭
                 **/
                var leftPanel = $(".PanelLeft"),
                    rightPanel = $(".PanelRight"),
                    togglePanelTime = 1000,
                    closePosition = '-4.19rem',
                    openPosition = '.08rem';
                $scope.isLeftClosed = false;
				$scope.togglePanelLeftMethod = function() {
					if($scope.isLeftClosed) {
						$scope.isLeftClosed = false;
						leftPanel.animate({ left: openPosition }, togglePanelTime);
					} else {
						$scope.isLeftClosed = true;
						leftPanel.animate({ left: closePosition }, togglePanelTime);
					}
                }
                $scope.isRightClosed = false;
				$scope.togglePanelRightMethod = function() {
					if($scope.isRightClosed) {
						$scope.isRightClosed = false;
						rightPanel.animate({ right: openPosition }, togglePanelTime);
					} else {
						$scope.isRightClosed = true;
						rightPanel.animate({ right: closePosition }, togglePanelTime);
					}
				}
                
                // WeekAnalysis 一周感知数据量统计
                var WeekAnalysisECharts = null;
                var weekAnalysisOption = echartsConfig.BarEcharts(
                    ['MAC感知', '开门记录', '事件感知', '人脸抓拍', '过车感知'],
                    [120, 200, 150, 80, 70]
                );

                echarts.dispose(document.getElementById("WeekAnalysis"));
                WeekAnalysisECharts = echarts.init(document.getElementById('WeekAnalysis'));
                WeekAnalysisECharts.setOption(weekAnalysisOption);

                WeekAnalysisECharts.on('click', function(params){
                    console.log(params, 113)
                })

                // WeekAnalysis - realtimeAnalysis 实时统计
                var realtimeAnalysisECharts = null;
                var realtimeAnalysisOption = echartsConfig.LineEcharts(['1200', '1400', '1008', '1411', '626', '588', '300', '100'])

                realtimeAnalysisOption.xAxis.data = [];
                for(var i = 0; i < 8; i++) {
                    realtimeAnalysisOption.xAxis.data.push(common.formatDate(common.addSeconds(new Date(), -5 * (7 - i))).CurrentHms);
                }

                echarts.dispose(document.getElementById("realtimeAnalysis"));
                realtimeAnalysisECharts = echarts.init(document.getElementById('realtimeAnalysis'));
                realtimeAnalysisECharts.setOption(realtimeAnalysisOption);

                // TodayAnalysis - 今日实有警情分析
                var TodayAnalysisECharts = null;
                var TodayAnalysisOption = echartsConfig.RadarEcharts()
                TodayAnalysisECharts = echarts.init(document.getElementById('TodayAnalysis'));
                TodayAnalysisECharts.setOption(TodayAnalysisOption);

                // resize echarts
                $(window).resize(function() {
                    WeekAnalysisECharts.resize();
                    realtimeAnalysisECharts.resize();
                    TodayAnalysisECharts.resize();
                })
            }
        ]
		return communityPanelCtrl;
    }
);