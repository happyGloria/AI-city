/**
 * 一标六实主面板
 * 2018/05/08
 */
define(
    ['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', '/modules/config/basicConfig.js', '/modules/config/echartsConfig.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common','yituFace'],
    function (app, controllers, $, configFile, basicConfig, echartsConfig, notify, dark, dMapCtrl, common, yituFace) {
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
                /* 实时时间 */
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

                /*
                 * 一标六实统计页
                 **/
                querySixEntityCount();
                var region_ids=[]
				function querySixEntityCount() {
					communityAllService.sixEntityCount({ villageCode: '' }).then(function(res) {
                        if(res.resultCode === 200){
                            var data = res.data;
                            $scope.sixEntityCountData = data;
                            $scope.sixEntityCountData.realPowerEquipmentCount = (data.realPowerCount ? data.realPowerCount : 0 ) + '/' + (data.realEquipmentCount ? data.realEquipmentCount : 0);
                        }
						// if(resp.resultCode == '200') {
                        //     $scope.sixEntityCountData = resp.data;
                        //     $scope.sixEntityCountData.realPowerEquipmentCount = (resp.data.realPowerCount?resp.data.realPowerCount:0) + '/' + (resp.data.realEquipmentCount?resp.data.realEquipmentCount:0);
                        //     region_ids=[];
                        //     $.each(configFile.villageNameMap,function(i,v){
                        //             region_ids.push(v.code);
                        //     });
                        //     yituFace.yitu_incomingAndLeaving(region_ids,function(data){
                        //         var incoming_dossier=0;
                        //         var leaving_dossier=0;
                        //         $.each(data.incoming_dossier,function(i,v){
                        //             incoming_dossier+=Number(v);
                        //         });
                        //         $.each(data.leaving_dossier,function(i,v){
                        //             leaving_dossier+=Number(v);
                        //         });
                        //         $scope.sixEntityCountData.peopleCount=$scope.sixEntityCountData.peopleCount+incoming_dossier-leaving_dossier;
                        //     })
                        // }
					}).catch(function() {}).finally(function() {});
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
                var villageCode = $stateParams.villageCode || '';
                function openDataList(title, url) {
                    var newurl = window.location.href.split("/#")[0] + url;
                    window.open(newurl);
                }
                var securityFacilityObj = {
                    // "摄像机": "/#/index/camera/" + villageCode, //cameraType为空
                    "门禁": "/#/index/doorrecord/" + villageCode,
                    "WiFi探针": "/#/index/communityMac/" + villageCode,
                    // "人脸卡口": "/#/index/camera/" + villageCode,//cameraType 传2
                    // "车辆卡口": "/#/index/communityCar/" + villageCode, //单独的车辆列表
                    "烟感": "/#/index/smoke/" + villageCode,
                    "电表": "/#/index/smoke/" + villageCode,
                    "电弧": "/#/index/smoke/" + villageCode,
                    // "消防栓": "",
                    // "微型消防站": "",
                    // "窨井盖": ""
                }
                // 2.1 年龄分布
                /* 实有力量~~~~~~~~~~~· */
                //1)实有力量在线统计
                queryRealPower()
                function queryRealPower() {
                    communityAllService.realPower().then(function (resp) {
                        if (resp.resultCode == '200') {
                            var powerData = resp.data
                            var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长', '志愿者', '保安', '保洁', '保绿', '快递人员'], [powerData.jy||0, powerData.jwgb||0, powerData.lzz||0, powerData.zyz||0, powerData.ba||0, powerData.bj||0, powerData.bl||0, powerData.kd||0])
                            setEchart("PowerAnalysis", powerOption ,function (params) {
                                //点击实有力量图标跳转页面
                                var key = "resident_";
                                localStorage.setItem(key, JSON.stringify(params.dataIndex + 1 + ""));
                                var newurl = window.location.href.split("/#")[0] + "#/index/factPower/";
                                window.open(newurl);
                            })
                        }
                    }).catch(function () { }).finally(function () { });
                }
                //实有安防设施分析
                moreService.queryFacilityList({ villageCode: villageCode }).then(function (resp) {
                    var dataArr = []
                    var nameArr = []
                     resp.data&&resp.data.forEach(function (v, k) {
                        dataArr.push(v.num)
                        if (v.name === 'WiFi探针') {
                            v.name = 'WiFi\n探针'
                        } else if (v.name.length > 3) {
                            v.name = v.name.substr(0, 2) + '\n' + v.name.substr(2, v.name.length - 2)
                        }
                        nameArr.push(v.name)
                    })
                    var SafeOption = echartsConfig.triangleEcharts(nameArr, dataArr)
                    setEchart("SafeAnalysis", SafeOption, function (params) {
                        console.log(params)
                        var urlParam = {
							name: params.name,
                            value: params.value
                        };
                        if (urlParam.name == "门禁" || urlParam.name == "WiFi\n探针" || urlParam.name == "烟感" || urlParam.name == "电表" || urlParam.name == "电弧") {
                            urlParam.type = "toDevicePage";
                            var key = "facility_" + villageCode;
                            localStorage.setItem(key, JSON.stringify(urlParam));

                            openDataList(urlParam.name, securityFacilityObj[urlParam.name]);
                        } else {
                            return
                        }
                    })
                })
                /* 实有人员分析 */
                $scope.peopleTabAction = 'age';
                $scope.changePeopleTab = function (val) {
                    $scope.peopleTabAction = val;
                }
                function initiInside() {
                    //查询实有人口类别接口
                    var req = {
                        "villageCode": villageCode
                    }
                    var resultData;
                    moreService.queryRealPeopleNum(req).then(function (resp) {
                        resultData = resp;
                        yituFace.yitu_dossier("incoming_dossier", [villageCode], function (data) {
                            if (data.statistic_info.length > 0) {
                                resultData.data.peopleRecord.peopleDiscoveryCount = data.statistic_info[0].delta_num || 0;
                            }
                            yituFace.yitu_dossier("leaving_dossier", [villageCode], function (data) {
                                if (data.statistic_info.length > 0) {
                                    resultData.data.peopleRecord.peopleLeaveCount = data.statistic_info[0].delta_num || 0;
                                }
                                afterGetData(resp);
                            });
                        });
                    }).catch(function () { }).finally(function () {
                        afterGetData(resultData);
                    });

                };
                initiInside()

                function afterGetData(data) {
                    var urlParam={}
                    //年龄
                    var ageCon = ["age1", "age2", "age3","age4","age5"]
                    var ageConfig = {
                        "age1": "1-16岁",
                        "age2": "17-40岁",
                        "age3": "41-60岁",
                        "age4": "61-79岁",
                        "age5": "80以上"
                    };
                    var ageData = [];
                    var ageName = [];
                    var ageIndex=[]
                    ageCon.forEach(function (v,k) {
                        ageData.push(data.data.ageRecord[v])
                        ageName.push(ageConfig[v])
                        ageIndex.push(k+1)
                    })
                    //年龄分布
                    var ageOption = echartsConfig.pieEcharts(ageIndex, ageName, ageData)
                    setEchart("ageAnalysis", ageOption, function (params) {
                        //点击年龄分布图跳转页面
                        urlParam.type ='ageType'
                        urlParam.data = params.data
                        urlParam.data.name = ageConfig[ageCon[urlParam.data.name-1]]
                        var key = "factpeopleUrlParam_";
                        localStorage.setItem(key, JSON.stringify(urlParam));
                        var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/";
                        window.open(newurl);
                    })
                    /* 性别与户籍 */
                    //性别 
                    var sexData = [];
                    var sexName = [];
                    var sexIndex = [];
                    data.data.genderRecord.filter(function (v) {
                        return v.name!=="未知"
                    }).forEach(function (v,k) {
                        sexData.push(v.num)
                        sexName.push(v.name)
                        sexIndex.push(k+1)
                    })
                    var SexOption = echartsConfig.pieEcharts(sexName, sexIndex, sexData)
                    SexOption.title.text = '性别\n比例'
                    SexOption.series[0].label.normal.formatter = "{b}: \n{c} ({d}%)"
                    setEchart("sexAnalysis", SexOption, function (params) {
                        //点击性别图跳转页面
                        urlParam.type ='sexType'
                        urlParam.data = params.data
                        urlParam.data.name = ageConfig[ageCon[urlParam.data.name-1]]
                        var key = "factpeopleUrlParam_";
                        localStorage.setItem(key, JSON.stringify(urlParam));
                        var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/";
                        window.open(newurl);
                    })
                    //户籍
                    var peopleTypeData = [];
                    var peopleTypeName = [];
                    var peopleTypeIndex = [];
                    data.data.peopleTypeRecord.forEach(function (v, k) {
                        peopleTypeData.push(v.num)
                        peopleTypeName.push(v.name)
                        peopleTypeIndex.push(k + 1)
                    })
                    // 户籍
                    var HujiOption = echartsConfig.pieEcharts(peopleTypeName, peopleTypeIndex, peopleTypeData)
                    HujiOption.title.text = '户籍\n比例'
                    HujiOption.series[0].label.normal.formatter = "{b}: \n{c} ({d}%)"
                    setEchart("hujiAnalysis", HujiOption, function (params) {
                        //点击户籍分布图跳转页面
                        urlParam.type ='fromType'
                        urlParam.data = params.data
                        urlParam.data.name = ageConfig[ageCon[urlParam.data.name-1]]
                        var key = "factpeopleUrlParam_";
                        localStorage.setItem(key, JSON.stringify(urlParam));
                        var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/";
                        window.open(newurl);
                    })
                }

                // 人员性质
                // PeopleOption.title.text = '人员\n性质',
                //     setEchart("personnelAnalysis", PeopleOption)
                



                //底部面板切换
                $scope.bottomTabAction = 'move';
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
                //消防面板切换
                $scope.fireTabAction = 'smoke';
                $scope.changeFireTab = function (val) {
                    $scope.fireTabAction = val;
                } 
                //位移面板切换
                $scope.moveTabAction = 'jinggai';
                $scope.changeMoveTab = function (val) {
                    $scope.moveTabAction = val;
                }

                registerTemplate()
            }
        ]
		return communityPanelCtrl;
    }
);