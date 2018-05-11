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
            'moreService',
            function ($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval, moreService) {
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

                /* 时间 */
                Date.prototype.format = function (format) {
                    var o = {
                        "M+": this.getMonth() + 1, //month
                        "d+": this.getDate(),    //day
                        "h+": this.getHours(),   //hour
                        "m+": this.getMinutes(), //minute
                        "s+": this.getSeconds(), //second
                        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                        "S": this.getMilliseconds() //millisecond
                    }
                    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o) if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] :
                                ("00" + o[k]).substr(("" + o[k]).length));
                    return format;
                }
                $scope.nowTimeInt = $interval(function () {
                    var d2 = new Date();
                    var day = d2.getDay();
                    var x='星期天'
                    switch (day) {
                        case 0:
                            x = "星期天";
                            break;
                        case 1:
                            x = "星期一";
                            break;
                        case 2:
                            x = "星期二";
                            break;
                        case 3:
                            x = "星期三";
                            break;
                        case 4:
                            x = "星期四";
                            break;
                        case 5:
                            x = "星期五";
                            break;
                        case 6:
                            x = "星期六";
                            break;
                    }
                    $scope.nowTime = d2.format('yyyy年MM月dd日 hh:mm:ss')+" "+x
                },500)
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

                /* 引入 二维地图 */
                function registerTemplate() {
					$scope.templateUrl = 'template/html/modules/community/2dMapPanel.html';
					app.register.controller('templateControllerMap', dMapCtrl);
                }
                registerTemplate()

                /*
                 * 左、右、下面板，打开/关闭
                 **/
                var leftPanel = $(".PanelLeft"),
                    rightPanel = $(".PanelRight"),
                    bottomPanel =  $(".PanelBottom"),
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
                $scope.isBottomClosed = false;
				$scope.togglePanelBottomMethod = function() {
					if($scope.isBottomClosed) {
						$scope.isBottomClosed = false;
						bottomPanel.animate({ bottom: openPosition }, togglePanelTime);
					} else {
						$scope.isBottomClosed = true;
                        bottomPanel.animate({ bottom: '-3.5rem' }, togglePanelTime);
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

                setEchart = function (id, option, cb) {
                    echarts.dispose(document.getElementById(id));
                    var ECharts = echarts.init(document.getElementById(id));
                    ECharts.on('click', function (params) {
                        cb(params)
                    });
                    ECharts.setOption(option);
                }
                // 1. 一标六实数据
                // 2.1 年龄分布
                /* 实有力量~~~~~~~~~~~· */
                //1)实有力量在线统计
                queryRealPower()
                function queryRealPower() {
                    communityAllService.realPower().then(function (resp) {
                        if (resp.resultCode == '200') {
                            var powerData = resp.data
                            var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长', '志愿者', '保安', '保洁', '保绿', '快递人员'], [powerData.jy, powerData.jwgb, powerData.lzz, powerData.zyz, powerData.ba, powerData.bj, powerData.bl, powerData.kd])
                            setEchart("PowerAnalysis", powerOption)
                        }
                    }).catch(function () { }).finally(function () { });
                }
                var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长', '志愿者', '保安', '保洁', '保绿', '快递人员'], [1, 2, 3, 4, 5, 6, 7, 8])
                setEchart("PowerAnalysis", powerOption, function (params) {
                    //点击图标跳转页面
                    var key = "resident_";
                    localStorage.setItem(key, JSON.stringify(params.dataIndex + 1 + ""));
                    var newurl = window.location.href.split("/#")[0] + "#/index/factPower/";
                    window.open(newurl);
                })
                //实有安防设施分析
                moreService.queryFacilityList({ villageCode: '' }).then(function (resp) {
                    console.log(resp.data)
                    var dataArr = []
                    var nameArr = []
                    resp.data.forEach(function (v, k) {
                        dataArr.push(v.num)
                        if (v.name === 'WiFi探针') {
                            v.name = 'WiFi\n探针'
                        } else if (v.name.length > 2) {
                            v.name = v.name.substr(0, 2) + '\n' + v.name.substr(2, a.length - 2)
                        }
                        dataArr.push(v.name)
                    })
                })
                var SafeOption = echartsConfig.triangleEcharts(['窖井盖', '微型\n消防站', '消防栓', '电壶', '烟感', '车辆\n卡口', '人脸\n卡口', 'WIFI\n探针', '门禁', '摄像机'], ['170', '40', '178', '98', '74', '111', '100', '28', '144', '56'])
                setEchart("SafeAnalysis", SafeOption)
				/* 实有人员分析 */,
                    $scope.peopleTabAction = 'age';
                $scope.changePeopleTab = function (val) {
                    $scope.peopleTabAction = val;
                }
                //年龄分布
                var PeopleOption = echartsConfig.pieEcharts(['1', '2', '3', '4', '5'], ['1-16岁', '17-40岁', '41-60岁', '61-80岁', '80岁以上'], [0, 0, 0, 0, 0])
                setEchart("ageAnalysis", PeopleOption)
                //性别与户籍
                /* 性别 */
                var SexOption = echartsConfig.pieEcharts(['男', '女'], ['1', '2'], [45000, 55000])
                SexOption.title.text = '性别\n比例',
                    setEchart("sexAnalysis", SexOption)
                /* 户籍 */
                var HujiOption = echartsConfig.pieEcharts(['来沪人员', '户籍人员', '外籍人员'], ['1', '2', '3'], [18000, 73000, 9000])
                HujiOption.title.text = '户籍\n比例',
                    setEchart("hujiAnalysis", HujiOption)
                // 人员性质
                PeopleOption.title.text = '人员\n性质',
                    setEchart("personnelAnalysis", PeopleOption)

                //底部面板切换
                $scope.bottomTabAction = 'face';
                $scope.changeBottomTab = function (val) {
                    $scope.bottomTabAction = val;
                }
                //人脸面板切换
                $scope.faceTabAction = 'all';
                $scope.changeFaceTab = function (val) {
                    $scope.faceTabAction = val;
                }
                //过车面板切换
                $scope.carsTabAction = 'iscar';
                $scope.changeCarsTab = function (val) {
                    $scope.carsTabAction = val;
                }
            }
        ]
		return communityPanelCtrl;
    }
);