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
                var WeekAnalysisECharts = null;
                var weekAnalysisOption = {
                    xAxis: {
                        type: 'category',
                        data: ['MAC感知', '开门记录', '事件感知', '人脸抓拍', '过车感知'],
                        axisTick: {show: false},
                        axisLine: {show: false},
                        axisLabel: {
                            color: '#5dbef6',
                            interval: 0,
                            rotate: 20,
                            textStyle: {
                                "fontFamily": "微软雅黑", 
                                "fontSize": 10
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle:{
                                color:'#0c3b71',
                            }
                        },
                        axisTick: {show: false},
                        axisLine: {show: false},
                        axisLabel: {
                            fontSize: 10,
                            color: '#5dbef6'
                        }
                    },
                    grid: {
                        left: '0',
                        top:'18%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70],
                        type: 'bar',
                        barWidth: 26,
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                textStyle:{
                                    fontSize: 12,
                                    color:'#5dbef6'
                                }

                            },
                            emphasis: {
                                textStyle:{
                                    color:'#ffcb54'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                              color: new echarts.graphic.LinearGradient( 0, 1, 1, 1,
                                [{offset: 0, color: 'rgba(0, 99, 201, 0.4)'}, {offset: 0.7, color: 'rgba(0, 48, 120, 0.6)'}, {offset: 1, color: 'rgba(0, 89, 165, 0.5)'}]
                              )
                            },
                            emphasis: {
                              color: new echarts.graphic.LinearGradient( 0, 1, 1, 1,
                                [{offset: 0, color: 'rgba(232, 30, 109, 0.4)'}, {offset: 0.7, color: 'rgba(175, 0, 68, 0.6)'}, {offset: 1, color: 'rgba(210, 44, 0, 0.5)'}]
                              )
                            }
                        }
                    }]
                };
                echarts.dispose(document.getElementById("WeekAnalysis"));
                WeekAnalysisECharts = echarts.init(document.getElementById('WeekAnalysis'));
                WeekAnalysisECharts.setOption(weekAnalysisOption);

                WeekAnalysisECharts.on('click', function(params){
                    console.log(params, 113)
                })

                // WeekAnalysis - realtimeAnalysis 实时统计
                var realtimeAnalysisECharts = null;
                var realtimeAnalysisOption = {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: '#091f3c',
                        padding: [5, 10],
                        textStyle: {
                            color: '#5dbef6',
                        },
                        axisPointer: {
                            lineStyle: {
                                color: '#1884b7'
                            }
                        },
                        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                    },
                    grid: {
                        left: '0',
                        top:'8%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [0,0,0,0,0,0,0,0],
                        boundaryGap: false,
                        axisLabel: {
                            interval: 0,
                            rotate: 20,
                            textStyle: {
                                fontSize: '10',
                                color: '#5dbef6'
                            }
                        },
                        splitLine: {
                            show: true,
                            interval: 'auto',
                            lineStyle: {
                                color: ['#0c3b71']
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0c3b71'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: { lineStyle: { color: ['#0c3b71'] } },
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { textStyle: { fontSize: 10, color: '#5dbef6' } },
                        gridIndex: 0,
                        splitArea: { show: true, areaStyle: { color: ['#0c2746', '#09233f'] }}
                    },
                    series: [{
                        name: '次数',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbol: 'circle',
                        symbolSize: 5,
                        data: ['1200', '1400', '1008', '1411', '626', '588', '300', '100'],
                        itemStyle : {
                            normal : {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: '#e9216b' // 0% 处的颜色
                                }, {
                                    offset: 0,
                                    color: '#ff6a31' // 100% 处的颜色
                                }], false)
                            }
                        }
                        
                    }]
                };

                realtimeAnalysisOption.xAxis.data = [];
                for(var i = 0; i < 8; i++) {
                    realtimeAnalysisOption.xAxis.data.push(common.formatDate(common.addSeconds(new Date(), -5 * (7 - i))).CurrentHms);
                }

                echarts.dispose(document.getElementById("realtimeAnalysis"));
                realtimeAnalysisECharts = echarts.init(document.getElementById('realtimeAnalysis'));
                realtimeAnalysisECharts.setOption(realtimeAnalysisOption);
            }
        ]
		return communityPanelCtrl;
    }
);