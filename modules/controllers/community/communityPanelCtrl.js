/**
 * 一标六实主面板
 * 2018/05/08
 */

define([
    'app', 
    'controllers/controllers', 
    'jquery', 
    '/modules/config/configFile.js', 
    '/modules/config/basicConfig.js', 
    '/modules/config/echartsConfig.js', 
    '/modules/common/tools.js', 
    'notify', 
    'echarts-dark', 
    'controllers/community/2dMapNewCtrl',
    'controllers/common/layerSelectCtrl',
    'controllers/community/communityBottomModuleCtrl',
    'controllers/common/ocxCtrl', 
    'controllers/user/userCtrl',
    'controllers/common/zTreeSearchCtrl',
    'config/common',
    'yituFace'
], function (app, controllers, $, configFile, basicConfig, echartsConfig, tools, notify, dark, dMapCtrl, layerSelectCtrl, communityBottomModuleCtrl, OCXCtrl, userCtrl, zTreeSearchCtrl, common, yituFace) {
    var communityPanelCtrl = [
        '$scope', 
        '$rootScope',
        '$state', 
        '$stateParams', 
        'communityAllService', 
        'mapService', 
        '$compile', 
        'communityRightModuleService', 
        'moreService', 
        '$interval',
        function($scope, $rootScope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {
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
            // villageCode
            $scope.villageCode = '';
            var villageCode =  $scope.villageCode||'';
            $scope.$on('setCurVillageAllInfo', function(e, data){
                $scope.villageCode = data.villageCode;
                villageCode= $scope.villageCode||''
                $scope.$broadcast('changeCurVillageInfo', data)
                init()
            })

            // 
            $scope.$on('mapLoadSuccess', function(e, data){
                $scope.$broadcast('mapLoadSuccessd', data)
            })

            // 初始化函数
            function init(){
                querySixEntityCount();
                WeekAnalysisServer();
                queryRealPower();
                initiInside();
            }
            init()

            function registerTpl(){
                register2dMapTemplate()
                registerUserTemplate()
                registerZTreeSearchTemplate()
                registerOcxModuleTemplate()
                registerBottomTemplate()
                registerLayerSelectTemplate();
            }
            registerTpl()

            $scope.curVillageAllInfo = function(){
                console.log('$scope.villageCode', 53);
            }

            /* 实时时间 */
            $scope.nowTimeInt = $interval(function () {
                var d2 = new Date();
                var day = d2.getDay();
                var weekArr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                $scope.nowTime = d2.format('yyyy年MM月dd日 hh:mm:ss')+" "+weekArr[day]
            },500)

            /* 引入 二维地图 */
            function register2dMapTemplate() {
                $scope.template2dMapUrl = 'template/html/modules/community/2dMapPanel.html';
                app.register.controller('templateControllerMap', dMapCtrl);
            }
            /* 引入底部栏 */
            function registerBottomTemplate() {
                $scope.templateBottomPanelUrl = 'template/html/modules/community/communityBottomModule.html';
                app.register.controller('templateBottomController', communityBottomModuleCtrl);
            }
            /* 顶部左侧用户信息 */
            function registerUserTemplate() {
                $scope.userTplUrl = 'template/html/modules/component/user.tpl.html';
                app.register.controller('userTplController', userCtrl);
            }
            /* 左上角 村庄树结构 */
            function registerZTreeSearchTemplate(){
                $scope.zTreeSearchTpl = 'template/html/modules/component/zTreeSearch.html';
                app.register.controller('zTreeSearchController', zTreeSearchCtrl)
            }
            /* 地图布局显示 */
            function registerLayerSelectTemplate(){
                $scope.layerSelectTpl = 'template/html/modules/component/layerSelect.html';
                app.register.controller('layerSelectController', layerSelectCtrl)
            }

            /* OCX 视频播放器 */
            function registerOcxModuleTemplate(){
                $scope.ocxModelTpl = 'template/html/modules/component/ocxModel.html';
                app.register.controller('ocxModelController', OCXCtrl)
            }

            //查询摄像机列表start
            function queryCameraList(text,type) {
                $scope.queryMapInfoData = function(id) {
                    var req = {
                        villageCode: $scope.villageCode,
                        cameraType: type || "1,2",
                        cameraName: text || "",
                        pageNumber: 1,
                        pageSize: 999,
                    }
                    communityAllService.queryMapInfo(id, req).then(function(data) {
                        if(data.resultCode == '200') {
                            var list = data.data.list;
                            $scope.cameraList = list;  
                            $scope.villageName = data.villageName;
                        } else {
                            notify.warn('无法获取摄像机列表');
                        }
                    });
                }
                $scope.queryMapInfoData('camera');
            };
            //搜索摄像机
            $scope.searchText = function(text){
                queryCameraList(text,$scope.nowType);
            };
            //清空搜索摄像机
            $scope.clearSearchText = function(){
                $scope.text.selectCamera = "";
                queryCameraList();
            };
            queryCameraList();

            //根据id查询当前摄像头视频
            $scope.queryVideoById = function(item) {
                var obj={
                    cameraIp: item.cameraIp,
                    cameraPort: item.cameraPort,
                    login: item.login,
                    password: item.password,
                    name: item.name,
                    pvgChannelID: item.pvgChannelID
                }
                localStorage.setItem("ocxVideoSrc",JSON.stringify(obj));
                cameraId = layer.open({
                    type: 2,
                    title: "视频播放",
                    skin: 'dark-layer',
                    area: ['8.6rem', '6.8rem'],
                    shade: 0.8,
                    closeBtn: 1,
                    shadeClose: true,
                    content: ['../../../lib/video/ocx_video.html', 'no'],
                    end: function(index, layero) {
                        cameraId = null;
                    },
                    success: function(layero) {
                        $(layero).find("iframe").contents().find("html").css('font-size', $("html").css('font-size'))
                        $(layero).append(iframe);
                    }
                });
            }
            // 点击摄像头
            var cameraId;
            $scope.clickCamera = function(obj) {
                $scope.queryVideoById(obj);
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
                    $('body').css({ 'overflowX': 'hidden'})
                } else {
                    $scope.isBottomClosed = true;
                    $('body').css({'overflow': 'hidden'})
                    bottomPanel.animate({ bottom: '-3.3rem' }, togglePanelTime);
                }
            }
            
            /*
             * 一标六实统计页
             **/
            var region_ids=[]
            function querySixEntityCount() {
                communityAllService.sixEntityCount({ villageCode: $scope.villageCode }).then(function(res) {
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
            // 1. 发送请求
            function WeekAnalysisServer(type){
                var requestType = type ? type : 'type';
                communityAllService.weekSense(requestType).then(function(res) {
                    if(res.resultCode == '200') {
                        drawWeekAnalysisECharts(tools.jsonToBarEChartsData(res.data))
                    }
                }).catch(function() {}).finally(function() {});
            }
            // 2. 接收到请求后，渲染图表
            function drawWeekAnalysisECharts(options){
                var echartsOption = echartsConfig.BarEcharts(options.xAxisData, options.seriesData)
                echarts.dispose(document.getElementById("WeekAnalysis"));
                WeekAnalysisECharts = echarts.init(document.getElementById('WeekAnalysis'));
                WeekAnalysisECharts.setOption(echartsOption);
                drawRealtimeAnalysisECharts();

                WeekAnalysisECharts.on('click', function(params){
                    drawRealtimeAnalysisECharts(params.name)
                })
            }
            
            // WeekAnalysis - realtimeAnalysis 实时统计
            var realtimeAnalysisECharts = null;
            var realtimeAnalysisOption = null;
            var realtimeAnalysisTimer = null;
            $scope.realtimeAnalysisType = null;

            echarts.dispose(document.getElementById("realtimeAnalysis"));
            realtimeAnalysisECharts = echarts.init(document.getElementById('realtimeAnalysis'));

            function RealtimeAnalysisServer(type){
                var requestType = basicConfig.WeekAnalysisType;
                var currentData = new Date();
                realtimeAnalysisOption.xAxis.data.shift();
                realtimeAnalysisOption.xAxis.data.push(common.formatDate(currentData).CurrentHms);

                var requestParams = {
                    startTime: common.changeDateToString(common.addSeconds(new Date(),-5)),
                    endTime: common.changeDateToString(new Date()),
                    type: requestType[type]
                }
                communityAllService.daySenseType(requestParams).then(function(res) {
                    if(res.resultCode == '200') {
                        realtimeAnalysisOption.series[0].data.shift();
                        realtimeAnalysisOption.series[0].data.push(res.data);
                        realtimeAnalysisECharts.setOption(realtimeAnalysisOption);
                    }else{
                        $interval.cancel(realtimeAnalysisTimer);
                    }
                }).catch(function() {}).finally(function() {});
            }

            function drawRealtimeAnalysisECharts(type){
                var triggerType = type ? type : 'MAC感知';
                if(triggerType === $scope.realtimeAnalysisType){
                  return;
                }
                $scope.realtimeAnalysisType = triggerType;
                if(realtimeAnalysisTimer) {
                    $interval.cancel(realtimeAnalysisTimer);
                }

                realtimeAnalysisOption = echartsConfig.LineEcharts()

                // 实时感知 - 5s
                realtimeAnalysisOption.xAxis.data = [];
                for(var i = 0; i < 8; i++) {
                    realtimeAnalysisOption.xAxis.data.push(common.formatDate(common.addSeconds(new Date(), -5 * (7 - i))).CurrentHms);
                }

                RealtimeAnalysisServer(triggerType)
                realtimeAnalysisTimer = $interval(function() {
                    RealtimeAnalysisServer(triggerType);
                }, 5000);
            }

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
                return ECharts
            }
            // 1. 一标六实数据

            function openDataList(title, url) {
                var newurl = window.location.href.split("/#")[0] + url;
                window.open(newurl);
            }

            // 2.1 年龄分布
            /* 实有力量~~~~~~~~~~~· */
            //1)实有力量在线统计
            queryRealPower()
            function queryRealPower() {
                communityAllService.realPower(villageCode).then(function (resp) {
                    if (resp.resultCode == '200') {
                        var powerData = resp.data
                        var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长', '志愿者', '保安', '保洁', '保绿', '快递人员'], [powerData.jy||0, powerData.jwgb||0, powerData.lzz||0, powerData.zyz||0, powerData.ba||0, powerData.bj||0, powerData.bl||0, powerData.kd||0])
                        setEchart("PowerAnalysis", powerOption ,function (params) {
                            //点击实有力量图标跳转页面
                            var key = "resident_" + villageCode;
                            localStorage.setItem(key, JSON.stringify(params.dataIndex + 1 + ""));
                            var newurl = window.location.href.split("/#")[0] + "#/index/factPower/"+villageCode;
                            window.open(newurl);
                        })
                    }
                }).catch(function () { }).finally(function () { });
            }

            /* 实有人员分析 */
            $scope.peopleTabAction = 'age';
            $scope.changePeopleTab = function (val) {
                $scope.peopleTabAction = val;
            }
            function initiInside() {
                //实有安防设施分析
                var securityFacilityObj = {
                    // "摄像机": "/#/index/camera/" + villageCode, //cameraType为空
                    "门禁": "/#/index/doorrecord/" + villageCode,
                    "WiFi\n探针": "/#/index/communityMac/" + villageCode,
                    // "人脸卡口": "/#/index/camera/" + villageCode,//cameraType 传2
                    // "车辆卡口": "/#/index/communityCar/" + villageCode, //单独的车辆列表
                    "烟感": "/#/index/smoke/" + villageCode,
                    "电表": "/#/index/smoke/" + villageCode,
                    "电弧": "/#/index/smoke/" + villageCode,
                    // "消防栓": "",
                    // "微型消防站": "",
                    // "窨井盖": ""
                }
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
                $scope.ageData=[]
                $scope.ageAll=0
                ageCon.forEach(function (v,k) {
                    ageData.push(data.data.ageRecord[v])
                    if(data.data.ageRecord[v]==0){
                        ageIndex.push('')
                    }else{
                        ageIndex.push(k+1)
                    }
                    $scope.ageAll+=data.data.ageRecord[v]
                    ageName.push(ageConfig[v])
                    $scope.ageData.push({
                        name: ageConfig[v],
                        data: data.data.ageRecord[v]
                    })
                })
                if(ageIndex.filter(function(v){ return v===''}).length===5){
                    ageIndex=['1','2','3','4','5']
                }
                //年龄分布
                var ageOption = echartsConfig.pieEcharts(ageIndex, ageName, ageData)
                var sexEchart = setEchart("ageAnalysis", ageOption, function (params) {
                    //点击年龄分布图跳转页面
                    urlParam.type ='ageType'
                    urlParam.data = params.data
                    if(ageConfig[ageCon[urlParam.data.name-1]]){
                        urlParam.data.name = ageConfig[ageCon[urlParam.data.name-1]]
                    }
                    var key = "factpeopleUrlParam_";
                    localStorage.setItem(key, JSON.stringify(urlParam));
                    var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/"+villageCode;
                    window.open(newurl);
                })
                sexEchart.on('mouseover', function (params) {
                    $scope.ageDataActive=params.dataIndex
                });
                sexEchart.on('mouseout', function (params) {
                    $scope.ageDataActive=-1
                });
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
                SexOption.series[0].label.normal.formatter = "{b}\n{c} ({d}%)"
                setEchart("sexAnalysis", SexOption, function (params) {
                    //点击性别图跳转页面
                    urlParam.type ='sexType'
                    urlParam.data = params.data
                    var key = "factpeopleUrlParam_";
                    if(sexName[urlParam.data.name-1]){
                        urlParam.data.name=sexName[urlParam.data.name-1]
                    }
                    localStorage.setItem(key, JSON.stringify(urlParam));
                    var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/"+villageCode;
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
                var HujiOption = echartsConfig.pieEcharts(peopleTypeName, peopleTypeIndex, peopleTypeData)
                HujiOption.title.text = '户籍\n比例'
                HujiOption.series[0].label.normal.formatter = "{b}\n{c} ({d}%)"
                setEchart("hujiAnalysis", HujiOption, function (params) {
                    //点击户籍分布图跳转页面
                    urlParam.type ='fromType'
                    urlParam.data = params.data
                    if(peopleTypeName[urlParam.data.name-1]){
                        urlParam.data.name=peopleTypeName[urlParam.data.name-1]
                    }
                    var key = "factpeopleUrlParam_";
                    localStorage.setItem(key, JSON.stringify(urlParam));
                    var newurl = window.location.href.split("/#")[0] + "#/index/factpeople/"+villageCode;
                    window.open(newurl);
                })
                //人员性质
                var peopleRecord=data.data.peopleRecord
                var peopleData = [peopleRecord.peopleCount,peopleRecord.peopleDiscoveryCount+peopleRecord.peopleLeaveCount];
                var peopleName = ['登记人口','流动人口'];
                var peopleIndex = ['1','2'];
                var peopleOption = echartsConfig.pieEcharts(peopleName, peopleIndex, peopleData)
                peopleOption.title.text = '人员\n性质'
                peopleOption.series[0].label.normal.formatter = "{b}\n{c} ({d}%)"
                setEchart("personnelAnalysis", peopleOption, function (params) {
                    
                })
            }
        }
    ]
    return communityPanelCtrl;
}
);