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

                /* 树状搜索 */
                $scope.zTreeSearch = {
                    communityAllInfo:[
                        {
                            name:'奉贤区',
                            open:true,
                            id:'1',
                            children:[                   
                                {
                                    name:'南桥镇',
                                    open:true,
                                    // children: basicConfig.villageAllInfo
                                    children: [
                                        { name: '杨王村', open: true },
                                        { name: '江海村', open: true }
                                    ]
                                },
                                {
                                    name:'金汇镇',
                                    open:true,
                                    children: [
                                        { name: '金星村', open: true },
                                        { name: '金碧汇虹苑小区', open: true }
                                    ]
                                },
                            ]
                        }
                    ],
                    open: function(item){
						item.open = !item.open;
						$scope.$apply();
                    },
                    blur: function(){
                        console.log('trigger blur')
                        if($("#zTreeVillage").is(":visible")){
                            $("#zTreeVillage").css("display","none");
                        }
                    },
                    focus: function(){
                        console.log('trigger focus')
						$("#zTreeVillage").css("display","block");
                        // $(".slimScrollDiv").css("display","block");
                        // 添加滚动条
                        // var slimScrollDivW = $('.slimScrollDiv').width();
                        // slimScrollDivW = $('.slimScrollDiv').children().first().width();
                        // $(".zTreeVillage").slimScroll({
                        //     width: '',
                        //     height: '2.5rem',
                        //     size: '8px', //组件宽度
                        //     color: '#7E7D7D', //滚动条颜色#0565b0
                        //     opacity: 0.1, //滚动条透明度
                        //     alwaysVisible: false, //是否 始终显示组件
                        //     railVisible: true, //是否 显示轨道
                        //     railColor: '#0565b0', //轨道颜色
                        //     railOpacity: 0.1, //轨道透明度
                        //     railClass: 'slimScrollRail', //轨道div类名 
                        //     barClass: 'slimScrollBar', //滚动条div类名
                        //     wrapperClass: 'slimScrollDiv', //外包div类名
                        //     allowPageScroll: false, //是否 使用滚轮到达顶端/底端时，滚动窗口
                        //     wheelStep: 20, //滚轮滚动量
                        //     borderRadius: '7px', //滚动条圆角
                        //     railBorderRadius: '7px' //轨道圆角
                        // });
					},
					keyup: function(){
						this.communityAllInfo = getTreeName($.extend(true,[],communityAllInfoCopy),this.communityName);						
                    },
                    communityLocation: function(){
                        console.log('trigger communityLocation')
                        $("#zTreeVillage").css("display","none");
						// $(".slimScrollDiv").css("display","none");
						// map.setZoom(18);
                        // map.setCenter(new NPMapLib.Geometry.Point(obj.map2d.center.split(',')[0], obj.map2d.center.split(',')[1]));
                        // var searchFlag = true;
						// angular.forEach(psArr, function(ps) {
                        //     if(searchFlag){
                        //         if(obj.villageCode == ps.villageCode) {
                        //             ps.setStyle({
                        //                 color: 'red', //颜色
                        //                 fillColor: '#00b99e', //填充颜色
                        //                 weight: 2, //宽度，以像素为单位
                        //                 opacity: 1, //透明度，取值范围0 - 1
                        //                 fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
                        //                 //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                        //             })
                        //         }
                        //     }
						// })
                    }
                }

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