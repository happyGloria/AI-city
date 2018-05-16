/**
 * 智慧社区二维三维地图公共模块
 * Created by lzh on 2017/12/11.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','layer', '/lib/other/socket.io.js', '/modules/config/common.js', '/modules/config/basicConfig.js', 'select2', 'yituFace'],
    function(app, controllers, $,configFile,layer, io, common, basicConfig, select2, yituFace) {
        var communityRightCtrl = ['$scope', '$state', '$stateParams','moreService','communityAllService','communityRightModuleService', '$compile',
            function($scope, $state, $stateParams,moreService,communityAllService, rightService, $compile) {
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
                $(".layout").find("div").eq(0).css({ "padding-top": "0px" });
                var player, queryFaceListInteval=null;
                $scope.text={
                    selectCamera :""
                };
                $scope.isCarOrNoCar = true;
                $scope.alarmMsg = false;
                $scope.villageCode = $stateParams.id||''
                //$scope.cameraSelectList = [{ F_ID: "all", F_Name: "全部" }];
                $scope.cameraSelectList = [{ F_ID: "all", F_Name: "全部" }];
                yituFace.yitu_queryRepositoryTask();
                $scope.$on('changeCurVillageInfo', function(e, data){
                    $scope.villageCode = data.villageCode||'';
                    $scope.curVillageInfo = data;
                     init()
                })
                function init() {
                    //查询实有力量身份证对应的标签
                    // queryRealPowerLable();
                    getEventFun();
                    manholeCoverFun();
                    queryCameraList();
                    getCkAllList();
                    //获取人像库
                    $scope.getPeopleAll=[];
                    // chooseFaceCameraInit();
                    var req = {
                        villageCode:$scope.villageCode,
                        cameraName:'',
                        cameraType:'5',//TODO换成和依图对接的类型5
                        pageNumber: 1,
                        pageSize: 999,
                     }
                    //摄像机ID和摄像机name的对应关系
                    $scope.yituIdToCameraNameObj = {};
                    //摄像机id数组
                    $scope.yituIdArr = [];
                    //摄像机对象的经纬度
                    $scope.yituIdLon = {};
                    //摄像机对应的小区编号
                    $scope.yituIdToValligeCode = {};
                    communityAllService.queryMapInfo('camera',req).then(function(resp) {
                    if(resp.resultCode == '200') {
                        debugger;
                        angular.forEach(resp.data.list,function(data){
                            if(data.ytCameraId){
                                var obj={
                                    F_ID:data.ytCameraId,
                                    F_Name:data.name,
                                    lon:data.lon,
                                    lat:data.lat,
                                    villageCode:data.villageCode
                                }
                                $scope.cameraSelectList.push(obj);
                                $scope.yituIdToCameraNameObj[obj.F_ID] = obj.F_Name;
                                $scope.yituIdArr.push(obj.F_ID);
                                $scope.yituIdToValligeCode[obj.F_ID] = obj.villageCode;
                                $scope.yituIdLon[obj.F_ID] = {
                                    lon:data.lon,
                                    lat:data.lat
                                };
                            }
                        });
                        queryFaceInit();
                    }
                    }).catch(function() {}).finally(function() {});
                    queryHistoryData();
                    queryCarListFun();
                    // queryNonMotorListFun();
                    queryOpenDoorRecordFun();
                }
                $scope.faceBuKong=[];
                function getFacelibMapper(){
                    communityAllService.getFacelibMapper({
                        villageCode:$scope.villageCode
                    }).then(function(resp) {                       
                        if(resp.resultCode == '200') {
                           $scope.faceBuKong=resp.data;
                           //调用一次人脸实有力量，二维地图撒点用
                           $scope.queryCompareFaceFun("realPower");
                        }
                    }).catch(function(){}).finally(function() {});
                }
                //获取布控库
                getFacelibMapper();
                //人脸初始化查询
                function queryFaceInit() {
                    $scope.queryFaceListFun();
                    getFaceFindAndLeaveFun();
                    queryRealPowerFaceListInteval = null;
                    queryImportantPeopleListInteval = null;
                    queryFaceListInteval = setInterval(function() {
                        $scope.queryFaceListFun();
                        getFaceFindAndLeaveFun();
                    }, 5000);
                }

                //门禁图片接口
                $scope.doorImgClick = function(item) {
                    var src = common.getUrl(item.imgUrl.split(",")[0]);
                    var img = '<img src="' + src + '" style="width:100%;/>';
                    layer.open({
                        type: 1,
                        title: "门禁图片",
                        skin: 'dark-layer',
                        area: ['6rem', '3.9rem'],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: img,
                        end: function(index, layero) {
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).append(iframe);
                        }
                    })
                }

                //门禁视频接口
                var videoId;
                $scope.doorVideoClick = function(item) {
                    sessionStorage.setItem("videoSrc", JSON.stringify(item.videoUrl));
                    var url = item.videoUrl.split(",");
                    var height = "650px";
                    if(url.length == 1){
                        height = "350px";
                    }
                    videoId = layer.open({
                        type: 2,
                        title: "门禁视频",
                        skin: 'dark-layer',
                        area: ['535px', height],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: ['../../../lib/video/video.html', 'no'],
                        end: function(index, layero) {
                            videoId = null;
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).append(iframe);
                        }
                    });
                }

                //过车记录模块
                $scope.carTab = {
                    "isCar": true
                }

                //切换非机动车和机动车
                $scope.chageCarTab = function(val){
                    $scope.carTab.isCar = val;
                    val ? $scope.isCarOrNoCar = true : $scope.isCarOrNoCar = false;              
                   
                }

                function queryCarListFun() {
                    // rightService.queryCarRecords().then(function(resp) {
                    //     $scope.carList = resp.data.list;
                    // })
                    var req = {
                        villageCode:$scope.villageCode
                    };
                    rightService.queryCarStatus(req).then(function(resp) {
                        $scope.carStatus = resp.data;
                    })
                    setInterval(function() {
                        rightService.queryCarStatus(req).then(function(resp) {
                            $scope.carStatus = resp.data;
                        })
                    }, 5000)
                    $scope.toSenseCarFun = function(type) {
                        var carParam = {
                            params: type
                        }
                        localStorage.setItem("carSenseType_"+$scope.villageCode, JSON.stringify(carParam));
                        var url = window.location.href.split("/#")[0] + "#/index/senseCar/" + $scope.villageCode;
                        window.open(url)
                    }
                    $scope.toFactEventSenseCar = function(value) {

                        var carParam = null;
                        if (value == 'carSenseFind') {
                            carParam = {
                                type: value,
                                param: {
                                    pageSize: 16,
                                    pageNumber: 1
                                }
                            }
                        } else {
                            carParam = {
                                type: value,
                                param: {
                                    startTime: "",
                                    endTime: "",
                                    pageSize: 10,
                                    pageNumber: 1,
                                    PlateNumber: ""
                                }
                            }
                        }

                        localStorage.setItem("factEvent"+$scope.villageCode, JSON.stringify(carParam));
                        var url = window.location.href.split("/#")[0] + "#/index/factEvent/" + $scope.villageCode;
                        window.open(url)
                    }
                }

                //wifi模块
                function queryMacListFun() {
                    rightService.queryMacRecords().then(function(resp) {
                        $scope.macList = resp.data.list;
                    })
                };
                $scope.activeClass = true;

                /* 底部面板 - 监控Tab */
                $scope.cameraList = [];
                $scope.activeClass = true;
                $scope.villageCodeNameInfo = basicConfig.villageCodeNameInfo;
                $scope.queryCameraTab = function(val){
                    if(val === "4"){
                        $scope.activeClass = false;
                    }else{
                        $scope.activeClass = true;
                    }
                    $scope.nowType = val;
                    queryCameraList("",val);
                };

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
                            } else {
                                notify.warn('无法获取摄像机列表');
                            }
                        });
                    }
                    $scope.queryMapInfoData('camera');
                };
                $scope.getCameraList = function(data, code){
                    var res = []
                    data.forEach(function(element){
                        if(element.villageCode === code){
                            res.push(element)
                        }
                    })
                    return res;
                }
                //搜索摄像机
                $scope.searchText = function(text){
                    queryCameraList(text,$scope.nowType);
                };
                //清空搜索摄像机
                $scope.clearSearchText = function(){
                    $scope.text.selectCamera = "";
                    queryCameraList();
                };
                $scope.toggleCamera = function(index){
                     $scope.villageCodeNameInfo[index].showType = !$scope.villageCodeNameInfo[index].showType
                }

                //匹配3d地图摄像机和tsl表里的cameraid
                var cameraConfig = {};
                var cameraConfigIn = {};

                function formartMapCamera() {
                    //3D模型门外摄像机不超过200个,85栋楼
                    for (var i = 0; i < 100; i++) {
                        $.each($scope.cameraList, function(j, w) {
                            var num = w.Name.replace(/[^0-9]/ig, "");
                            if (num == i && w.Name.indexOf("门外") != -1) {
                                cameraConfig['jiankong' + i] = {
                                    Id: w.Id,
                                    isOnline: w.IsOnline
                                };
                                return true;
                            }
                            if (num == i && w.Name.indexOf("门内") != -1) {
                                cameraConfig['loudaojiankong_' + i] = {
                                    Id: w.Id,
                                    isOnline: w.IsOnline
                                };
                                return true;
                            }
                        })
                    }
                }
                //根据id查询当前摄像头视频
                $scope.queryVideoById = function(item) {

                    var obj={
                        cameraIp:item.cameraIp,
                        cameraPort:item.cameraPort,
                        login:item.login,
                        password:item.password,
                        name:item.name,
                        pvgChannelID:item.pvgChannelID
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
                    // rightService.queryVideoById(item.Id).then(function(resp) {
                    //     item.src = resp.Data.replace(/110.1.222.1/, "15.128.74.241:1935");
                    //     item.src = item.src.replace(/110.1.98.1/, "15.128.74.241:1935");
                    //     item.src = item.src.replace(/110.1.99.1/, "15.128.74.241:1935");
                    //     sessionStorage.setItem("videoSrc", item.src);
                    //     cameraId = layer.open({
                    //         type: 2,
                    //         title: "视频播放",
                    //         skin: 'dark-layer',
                    //         area: ['8.6rem', '6.5rem'],
                    //         shade: 0.8,
                    //         closeBtn: 1,
                    //         shadeClose: true,
                    //         content: ['../../../lib/video/video.html', 'no'],
                    //         end: function(index, layero) {
                    //             cameraId = null;
                    //             // swObj.shade.show("false");
                    //         },
                    //         success: function(layero) {
                    //             $(layero).find("iframe").contents().find("html").css('font-size', $("html").css('font-size'))
                    //             $(layero).append(iframe);
                    //         }
                    //     });
                    // })
                }

                var onLineArr = [];
                var initFlag = true;
                var onLineLen = 1;

                function formatCameraData(data) {
                    $.each(data, function(i, v) {
                        if (v.IsOnline) {
                            onLineArr.push(v);
                        }
                    })
                }

                //视频播放相关方法
                function videoFun(src) {
                    var width = windowHtmlSize * 2.1 + "px";
                    var height = windowHtmlSize * 1.56 + "px";
                    player = videojs('player', {
                        height: height,
                        width: width,
                        techOrder: ['flash', 'html5'],
                        controls: true,
                        'autoplay': true,
                        sources: [{
                            // src:"rtmp://118.178.191.199:1935/live/camera_1"
                            src: src || ""
                        }]
                    }, function() {});
                    initFlag = false
                }

                //点击摄像头
                var cameraId;
                $scope.clickCamera = function(obj) {
                    $scope.queryVideoById(obj);
                }
                //视频监控模块end

                //人脸信息模块start
                $scope.faceList = [];
                $scope.faceTab = {
                    "faceAll": true,
                    "realPower": false,
                    "importantPeople": false
                }
                var newFaceId = "";
                $scope.queryFaceListFun = function(cameraId, isClicked) {
                    // 
                    var param = {
                        "condition": {
                            "camera_ids": []
                        },
                        "order": {
                            "timestamp": -1
                        },
                        "start": 0,
                        "limit": 20
                    };
                    if(cameraId){
                       param.condition['camera_ids'].push(cameraId);
                    }else{
                        angular.forEach($scope.cameraSelectList,function(data){
                             if(data.F_ID!=='all'){
                                param.condition['camera_ids'].push(data.F_ID);
                             }
                        });
                    }
                    if (isClicked) {
                        $scope.selectFace.text = "";
                        for (var key in $scope.faceTab) {
                            $scope.faceTab[key] = false;
                        }
                        $scope.faceTab.faceAll = true;
                    }
                    // var camearIdArr = [];
                    // if (cameraId && !isClicked) {
                    //     camearIdArr.push(cameraId);
                    // }
                    yituFace.yitu_getFacePicsByCondition(param, function(data) {
                        // 
                        if (0 == data.rtn) {
                            // queryFaceStartNum = data.total;
                            if(data.results.length > 0 && $scope.faceList.length > 0 && data.results[0].face_image_id ==$scope.faceList[0].face_image_id){
                                return;
                            }
                            $.each(data.results, function(i, v) {
                                if (v.face_image_uri && v.face_image_uri != "") {
                                    v.faceUrl = yituFace.yituFace_Pic + base64encode(v.face_image_uri);
                                }
                                if (v.picture_uri && v.picture_uri != "") {
                                    v.picUrl = yituFace.yituFace_Pic + base64encode(v.picture_uri);
                                } else {
                                    v.picUrl = "";
                                }
                                v.captureTime = moment(v.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
                            })
                            $scope.$apply(function() {
                                $scope.faceList = data.results.concat($scope.faceList);
                                var len = $scope.faceList.length;
                                if (len > 20) {
                                    $scope.faceList = $scope.faceList.slice(0, 20);
                                };
                                angular.forEach($scope.faceList,function(obj){
                                    getCamera(obj);
                                });
                                //$scope.faceList
                                $scope.$emit('faceScoket',$scope.faceList);
                            });
                        } else {
                        }
                    });
                };
               function getCamera(obj){
                   angular.forEach($scope.cameraSelectList,function(data2){
                    
                        if(obj.camera_id==data2.F_ID){
                                obj.name=data2.F_Name;
                                obj.lon=data2.lon;
                                obj.lat=data2.lat;
                         }
                    });
                   //return name;
               }
                //放大人像图片
                $scope.enlargeImg = function(item) {
                    ////;
                    // swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
                    // swObj.shade.show("true");
                    var src = item.picUrl;
                    if (item.picUrl == "") {
                        layer.msg("暂无放大照片", {
                            success: function(layero) {
                                $(layero).append(iframe);
                            },
                            time: 1000
                        }, function(index) {
                            setTimeout(function() {
                                layer.close(index);
                            })
                        })
                        return;
                    }
                    var img = '<img src="' + src + '" style="height:100%"/>';
                    layer.open({
                        type: 1,
                        title: "放大图片",
                        skin: 'dark-layer',
                        area: ['6.74rem', '3.74rem'],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: img,
                        end: function(index, layero) {

                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'));
                            $(layero).find(".layui-layer-content").css({"height":'3.73rem','text-align':'center'});
                            $(layero).append(iframe);
                        }
                    });
                }

                $scope.contrastFace = null;
                $scope.contrastFaceImg = function(item) {
                    querySearchFace(item);
                }
                var indexLoad=null;
                function querySearchFace(item) {
                    debugger
                    var _param = {
                        uri_base64:base64encode(item.face_image_uri)
                    }
                    yituFace.yitu_getPic(_param, function(data) {
                       indexLoad=layer.load();
                        var param = {
                            "condition": {},
                            "order": { "similarity": -1 },
                            "start": 0,
                            "limit": 1,
                            "retrieval": {
                                "face_image_id": item.face_image_id,
                                "picture_image_content_base64":data,
                                "threshold": 90,
                                "using_ann": true,
                                "repository_ids":[],                            }
                        };
                        var  kuName='';
                        angular.forEach($scope.faceBuKong,function(data){
                            debugger
                            if(data.type==5){
                               param.retrieval['repository_ids'].push(data.ytLibId);
                               kuName=data.name;
                            }
                        });
                        yituFace.yitu_contrastFaceAll(param, function(data) {
                            layer.close(indexLoad);
                            if (0 != data.rtn || data.results.length == 0) {
                                layer.msg("暂无对比信息", {
                                    success: function(layero) {
                                        $(layero).append(iframe);
                                    },
                                    time: 1000
                                }, function(index) {
                                    setTimeout(function() {
                                        layer.close(index);
                                    })
                                })
                                return;
                            }
                            $scope.$apply(function() {
                                $scope.contrastFace = data.results[0];
                                $scope.contrastFace.repository_id=kuName;
                                $scope.contrastFace.faceUrl = yituFace.yituFace_Pic + base64encode(item.face_image_uri);
                                $scope.contrastFace.picUrl = yituFace.yituFace_Pic + base64encode($scope.contrastFace.picture_uri);
                                $scope.contrastFace.similarity = Number($scope.contrastFace.similarity).toFixed(2);
                                $scope.contrastFace.gender = $scope.contrastFace.gender == 0 ? "未知" : $scope.contrastFace.gender == 1 ? "男" : "女";
                                layer.open({
                                    type: 1,
                                    title: '人脸对比',
                                    skin: 'dark-layer',
                                    area: ['6.3rem', '3rem'],
                                    shade: 0.8,
                                    scrollbar: false,
                                    closeBtn: 1,
                                    shadeClose: true,
                                    content: $("#contrastFace"),
                                    end: function(index, layero) {
                                        // swObj.shade.show("false");
                                    },
                                    success: function(layero) {
                                        $(layero).append(iframe);
                                    }
                                });
                            })
                        });
                    });
                    
                }

                //人脸模块end

                //查询历史列表数据start(包括开门记录、过车、wifi、消防模块)
                $scope.doorRecords = [];
                $scope.carList = [];
                $scope.nonmotorList = [];
                $scope.macList = [];

                function queryHistoryData(type) {
                    var req = {
                        villageCode: $scope.villageCode,
                        pageNumber: 1,
                        pageSize: 20,               
                        isSingleTable:true 
                    }
                    rightService.queryHistoryData(req).then(function(resp) {
                        debugger;
                        if (200 != resp.resultCode || resp.data.length == 0) {
                            return;
                        }
                        $scope.doorRecords = resp.data.openRecord.list; 
                        if(resp.data.acrossVehicle){
                           $scope.carList = resp.data.acrossVehicle.list;
                        }
                        if(resp.data.nonAcrossVehicle){
                           $scope.nonmotorList = resp.data.nonAcrossVehicle.list;
                        }
                        $scope.macList = resp.data.wifi.list;
                        $scope.fireModule.smokeList = resp.data.smokeFog.list;
                        $scope.fireModule.electroniceList = resp.data.electric.list;
                        $scope.fireModule.waterList = resp.data.waterPressure.list;
                        $scope.fireModule.pollingList = resp.data.inspection.list;
                        $scope.fireModule.onGuardList = resp.data.onGuard.list;
                        // $scope.doorRecords = sliceData(resp.data.openRecord.list.concat($scope.doorRecords), 20);
                        // if(resp.data.acrossVehicle){
                        //    $scope.carList = sliceData(resp.data.acrossVehicle.list.concat($scope.carList), 20);
                        // }
                        // $scope.macList = sliceData(resp.data.wifi.list.concat($scope.macList), 20);
                        // $scope.fireModule.smokeList = sliceData(resp.data.smokeFog.list.concat($scope.fireModule.smokeList), 20);
                        // $scope.fireModule.electroniceList = sliceData(resp.data.electric.list.concat($scope.fireModule.electroniceList), 20);
                        // $scope.fireModule.waterList = sliceData(resp.data.waterPressure.list.concat($scope.fireModule.waterList), 20);
                        // $scope.fireModule.pollingList = sliceData(resp.data.inspection.list.concat($scope.fireModule.pollingList), 20);
                        // $scope.fireModule.onGuardList = sliceData(resp.data.onGuard.list.concat($scope.fireModule.onGuardList), 20);
                        if (!!type) {
                            socketFun(type);
                        }
                    })
                }

                //截取数据长度
                function sliceData(data, length) {
                    if (data.length > length) {
                        data = data.slice(0, length);
                    }
                    return data;
                }
                //查询历史列表数据end

                //消防模块start
                function fireModuleFun() {
                    $scope.fireModule = {
                        smokeList: [],
                        electroniceList: [],
                        waterList: [],
                        pollingList: [],
                        onGuardList: []
                    };
                }
                fireModuleFun();
                //消防模块end

                //位移start
                //切换位移模块tab页签
                $scope.showMoveTabName = {
                    "jinggai": true
                }
                $scope.moveModule = {
                    "jinggai": []
                };
                $scope.ckModule = {
                    "ckList": []
                };
                $scope.changeMoveTab = function(tabName) {
                    for (var key in $scope.showMoveTabName) {
                        $scope.showMoveTabName[key] = false;
                    }
                    $scope.showMoveTabName[tabName] = true;
                }

                //窨井盖
                function manholeCoverFun() {
                    var req = {
                        villageCode: $scope.villageCode,
                        pageNumber: 1,
                        pageSize: 20,
                        startTime: '',
                        endTime: ''
                    };
                    communityAllService.queryMapInfo('sewer', req).then(function(data) {
                        if(data.resultCode == '200') {
                            $scope.moveModule.jinggai = data.data.list;
                        } else {
                            notify.warn('无法获取出入口地图信息');
                        }
                    });
                    // var req = {};;
                    // rightService.queryManholeList(req).then(function(resp) {;
                    //     $scope.moveModule.jinggai = resp.data.list;
                    // })
                }
                //获取ck的列表数据
                function getCkAllList() {
                    var req = {};
                    communityAllService.queryMapInfo('ck', req).then(function(data) {
                        if(data.resultCode == '200') {
                            $scope.ckModule.ckList = data.data.list;
                        } else {
                            notify.warn('无法获ck列表');
                        }
                    });
                };
                //定时刷新ck数据
                setInterval(function(){
                    getCkAllList();
                },10000) 
                //点击设置地图中心点
                $scope.setCenter = function(item) {
                    $scope.$emit('openInforwindow',item);
                }
                //窨井盖图片放大
                $scope.moveImgClick = function(item) {
                    var src;
                    src = "template/img/cover/3.jpg";
                    var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
                    layer.open({
                        type: 1,
                        title: "窨井盖",
                        skin: 'dark-layer',
                        area: ['4.2rem', '6.74rem'],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: img,
                        end: function(index, layero) {
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).append(iframe);
                        }
                    });
                }
                //位移end

                //接收websokect数据start
                var websocket = null;
                var socketIp = configFile.websocketIP;
                $scope.showFireTabName = {
                    "smoke": true,
                    "electronic": false,
                    "water": false,
                    "polling": false,
                    "onGuard": false,
                    "manholeCover": false
                }
                var pushType = {
                    "door": 2,
                    "car": 3,
                    "wifi": 4,
                    "fire": 6,
                    "smoke": 6,
                    "electronic": 7,
                    "water": 8,
                    "polling": 9,
                    "onGuard": 10,
                    "manholeCover": 11
                };

                function socketFun(type) {
                    var typeToObj = {
                        "door": $scope.doorRecords,
                        "car": $scope.carList,
                        "wifi": $scope.macList,
                        "fire": $scope.fireModule.smokeList,
                        "smoke": $scope.fireModule.smokeList,
                        "electronic": $scope.fireModule.electroniceList,
                        "water": $scope.fireModule.waterList,
                        "polling": $scope.fireModule.pollingList,
                        "onGuard": $scope.fireModule.onGuardList,
                        "manholeCover": $scope.moveModule.jinggai
                    };
                    var typeToObjArr = [$scope.fireModule.smokeList];
                    if (websocket == null) {
                        //判断当前浏览器是否支持WebSocket
                        if ('WebSocket' in window) {
                            websocket = new WebSocket(socketIp);
                        } else {
                        }
                    }
                    if (websocket.readyState == 1) {
                        websocket.send(JSON.stringify({
                            "villageCode": $scope.villageCode,
                            "pushType": pushType[type]
                        }));
                    }
                    websocket.onopen = function(event) {
                        
                        websocket.send(JSON.stringify({
                            "villageCode": $scope.villageCode,
                            "pushType": pushType[type]
                        }));
                    }
                    websocket.onerror = function() {
                        websocket = new WebSocket(socketIp);
                    };

                    //接收到消息的回调方法
                    websocket.onmessage = function(event) {
                        //debugger;
                        if("car" == type){
                            var data = JSON.parse(event.data).data;
                        }else{
                            var data = JSON.parse(event.data).data[$scope.villageCode];
                        }
                        $scope.$apply(function(){
                            typeToObj[type].unshift.apply(typeToObj[type], data);
                            if(typeToObj[type].length > 20){
                                typeToObj[type].splice(20,typeToObj[type].length-20);
                            }
                            // typeToObj[type][0].buildingNo = "tttt";
                        });
                    }

                    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                    window.onbeforeunload = function() {
                        websocket.close();
                    }
                }
                //接收websokect数据end

                //切换模块tab页签
                $scope.showTabName = {
                    "face": true,
                    "door": false,
                    "car": false,
                    "wifi": false,
                    "fire": false,
                    "move": false,
                    "camera": false,
                    "ck": false
                }

                $scope.changeTab = function(tabName) {
                    for (var key in $scope.showTabName) {
                        $scope.showTabName[key] = false;
                    }
                    $scope.showTabName[tabName] = true;
                    if(tabName == "fire"){
                        for (var key in $scope.showFireTabName) {
                            $scope.showFireTabName[key] = false;
                        }
                        $scope.showFireTabName.smoke = true;
                    }
                    queryHistoryData(tabName);
                }

                //切换消防模块tab页签
                $scope.showFireTabName = {
                    "smoke": true,
                    "electronic": false,
                    "water": false,
                    "polling": false,
                    "onGuard": false,
                    "manholeCover": false
                }

                $scope.changeFireTab = function(tabName) {
                    for (var key in $scope.showFireTabName) {
                        $scope.showFireTabName[key] = false;
                    }
                    $scope.showFireTabName[tabName] = true;
                    queryHistoryData(tabName);
                }

                /**
                 * 列表点击更多 
                 */
                $scope.clickMore = function() {
                    var url = "www.baidu.com";
                    var title = "标题"
                    debugger
                    //判断点击哪个模块“更多”
                    if ($scope.showTabName.door) {
                        url = window.location.href.split("/#")[0] + "#/index/doorrecord/"+$scope.villageCode;
                        title = "开门记录";
                    } else if ($scope.showTabName.fire) {
                        url = window.location.href.split("/#")[0] + "#/index/smoke/"+$scope.villageCode;
                        title = "烟感报警";
                    } else if ($scope.showTabName.ck) {
                        url = window.location.href.split("/#")[0] + "#/index/ck/"+$scope.villageCode;
                        title = "CK报警";
                    } else if ($scope.showTabName.car) {
                        if ($scope.isCarOrNoCar) {
                            url = window.location.href.split("/#")[0] + "#/index/communityCar/"+$scope.villageCode;
                            title = "小区车辆";
                        } else {
                            url = window.location.href.split("/#")[0] + "#/index/communityNonMotor/"+$scope.villageCode;
                            title = "小区非机动车辆";
                        }
                        
                    } else if ($scope.showTabName.wifi) {
                        url = window.location.href.split("/#")[0] + "#/index/communityMac/"+$scope.villageCode;
                        title = "小区Mac";
                    }
                    window.open(url);
                };

                /**
                 * 地图点击对应的门禁，烟感等元素时候 
                 */
                $scope.clickMoreFromMap = function(index, param) {
                    var url = "www.baidu.com";
                    var title = "标题"
                    //判断点击哪个模块“更多”
                    if (1 == index) {
                        url = window.location.href.split("/#")[0] + "#/index/doorrecord/";
                        title = "开门记录";
                    } else if (2 == index) {
                        localStorage.setItem("yanganType", JSON.stringify(param));
                        url = window.location.href.split("/#")[0] + "#/index/smoke/";
                        title = "烟感报警";
                    } else if (3 == index) {
                        url = window.location.href.split("/#")[0] + "#/index/communityCar/";
                        title = "小区车辆";
                    } else if (4 == index) {
                        url = window.location.href.split("/#")[0] + "#/index/communityMac/";
                        title = "小区Mac";
                    } else if (5 == index) {
                        if ($scope.alarmVideo) {
                            var eventType = {
                                type: "doorNotClose",
                                param: {
                                    DeviceName: $scope.alramDeviceName,
                                    startTime: "",
                                    endTime: "",
                                    pageSize: 10,
                                    pageNumber: 1,
                                    status: "",
                                    memo: ""
                                }
                            };
                            localStorage.setItem("factEvent", JSON.stringify(eventType));
                        } else {
                            var eventType = {
                                type: "abnormalCard",
                                param: {
                                    pName: $scope.alramPeopleName,
                                    IdentityCard: "",
                                    startTime: "",
                                    endTime: "",
                                    pageSize: 10,
                                    pageNumber: 1,
                                    alarmType: ""
                                }
                            };
                            localStorage.setItem("factEvent", JSON.stringify(eventType));
                        }
                        url = window.location.href.split("/#")[0] + "#/index/factEvent/";
                    }
                    window.open(url);
                };

                //接收事件汇总
                function getEventFun() {
                    //点击地图外层门禁摄像机
                    $scope.$on("jiankongEvent", function(event, cameraObj) {
                        //增加消防站两个摄像头
                        cameraConfig.tcxp10001 = {
                            Id: "7e4e569f201b68cc0140e7226d45fe7d",
                            isOnline: true
                        }
                        cameraConfig.tcxp10002 = {
                            Id: "7e4e569f201b68cc0140e7226d45fe7d",
                            isOnline: false
                        }
                        if (!cameraConfig[cameraObj.cameraName].isOnline) {
                            layer.msg("此摄像机离线", {
                                success: function(layero) {
                                    $(layero).append(iframe);
                                },
                                time: 1000
                            }, function(index) {
                                setTimeout(function() {
                                    layer.close(index);
                                })
                            })
                            return
                        }
                        $scope.queryVideoById(cameraConfig[cameraObj.cameraName]);
                    })

                    //烟感接收事件
                    $scope.$on("yanganEvent", function(event, yanganObj) {
                        $scope.clickMoreFromMap(2, yanganObj.yanganParam);
                    })

                    //门禁接收事件
                    $scope.$on("menjinEvent", function(event, menjinObj) {
                        $scope.clickMoreFromMap(1, menjinObj.menjinParam);
                    })

                    //水电煤接收事件
                    $scope.$on("waterGasEvent", function(event, waterGasObj) {
                        clickMapWater(waterGasObj);
                    })
                }

                //轨迹跳转
                $scope.toMapTrack = function(index, item) {
                    if (index == 1) {
                        url = "#/index/trackShow/faceTrack/";
                        imgSrcToBase64(item.faceUrl || item.result1.faceUrl, function(data) {
                            var img64Url = data.split(",")[1];
                            localStorage.setItem('faceTrack', img64Url);
                            window.open(url);
                        });
                    }
                    if (index == 2) {
                        url = "#/index/trackShow/macTrack/";
                        // $scope.macData.mac;
                        localStorage.setItem('macTrack', item.userMac);
                        window.open(url);
                    }
                };

                $scope.viewPeoplefile = function(id) {
                    var url = window.location.href.split("/#")[0] + "#/index/peoplefile/" + id + "/";
                    window.open(url);
                }

                //点击3D地图水电煤
                function clickMapWater(param) {
                    var req = {
                        Building_Id: Number(param.waterGasObj.buildingNo),
                        HouseId: Number(param.waterGasObj.roomNo)
                    };
                    rightService.queryWaterGasList(req).then(function(resp) {
                        var electricData = [];
                        var gasData = [];
                        var waterData = [];
                        $.each(resp.data.electricpower, function(i, v) {
                            electricData.push(v.electricusage);
                        })
                        $.each(resp.data.gasusage, function(i, v) {
                            gasData.push(v.gasusage);
                        })
                        $.each(resp.data.waterusage, function(i, v) {
                            waterData.push(v.waterusage);
                        })
                        // 存储值：将对象转换为Json字符串
                        sessionStorage.setItem('user', JSON.stringify(electricData));
                        sessionStorage.setItem('user2', JSON.stringify(gasData));
                        sessionStorage.setItem('user3', JSON.stringify(waterData));
                        var url = window.location.href.split("/#")[0] + "/#/index/waterElectricChart/";
                        window.open(url);
                    })
                }
                $scope.hideAlarm = function() {
                    $scope.alarmMsg = false;
                }

                // function chooseFaceCameraInit() {
                //     //TODO，调用查询人脸摄像机接口
                //     rightService.queryFaceCameraList().then(function(resp) {
                //         $scope.cameraSelectList = $scope.cameraSelectList.concat(resp.data.list);
                //     })
                // }
                $scope.selectFace = {
                    text: ""
                }
                $scope.checkFaceCamera = function(item) {
                    debugger;
                    $scope.showInformationLoading = true;
                    $scope.selectFace.text = item.F_Name;
                    clearInterval(queryFaceListInteval);
                    if (queryRealPowerFaceListInteval) {
                        clearInterval(queryRealPowerFaceListInteval);
                    }
                    if (queryImportantPeopleListInteval) {
                        clearInterval(queryImportantPeopleListInteval);
                    }
                    if ($scope.faceTab.faceAll) {
                        if ("all" == item.F_ID) {
                            $scope.queryFaceListFun();
                        } else {
                            $scope.queryFaceListFun(item.F_ID);
                        }
                        queryFaceListInteval = setInterval(function() {
                            if ("all" == item.F_ID) {
                                $scope.queryFaceListFun();
                            } else {
                                $scope.queryFaceListFun(item.F_ID);
                            }
                        },5000);
                    } else if ($scope.faceTab.realPower) {
                        if ("all" == item.F_ID) {
                            $scope.queryCompareFaceFunOut("realPower", true);
                        } else {
                            $scope.queryCompareFaceFunOut("realPower", false, item.F_ID);
                        }
                    } else {
                        if ("all" == item.F_ID) {
                            $scope.queryCompareFaceFunOut("importantPeople", true);
                        } else {
                            $scope.queryCompareFaceFunOut("importantPeople", false, item.F_ID);
                        }
                    }
                    $scope.selectCameraFocus = false;
                }
                $scope.selectCameraFocusFun = function() {
                    $scope.selectCameraFocus = true;
                }
                $scope.clearSelectFace = function() {
                    $scope.selectFace.text = '';
                    $scope.searchTextFocus = '';
                    $scope.selectCameraFocus='';
                }

                $scope.compareFace = {
                    realPower: [],
                    importantPeople: [],
                    choosedId: ""
                }
                $scope.queryCompareFaceFunOut = function(id, isClicked, cameraId) {
                    if (!!queryRealPowerFaceListInteval) {
                        clearInterval(queryRealPowerFaceListInteval);
                    }
                    if (!!queryImportantPeopleListInteval) {
                        clearInterval(queryImportantPeopleListInteval);
                    }
                    if (isClicked) {
                        $scope.selectFace.text = "";
                        $scope.compareFace[id] = [];
                        $scope.compareFace.choosedId = "";
                        for (var key in $scope.faceTab) {
                            $scope.faceTab[key] = false;
                        }
                        $scope.faceTab[id] = true;
                    } else {
                        $scope.compareFace[id] = [];
                        $scope.compareFace.choosedId = cameraId;
                    }
                    $scope.queryCompareFaceFun(id, isClicked, cameraId);
                    if ("realPower" == id) {
                        queryRealPowerFaceListInteval = setInterval(function() {
                            $scope.queryCompareFaceFun(id, isClicked, cameraId);
                        }, 5000)
                    } else {
                        queryImportantPeopleListInteval = setInterval(function() {
                            $scope.queryCompareFaceFun(id, isClicked, cameraId);
                        }, 5000)
                    }
                }
                var lastRealPowerAndImportant = null;
                //人脸，实有力量，关注人员
                $scope.queryCompareFaceFun = function(id, isClicked, cameraId) {
                    debugger;
                    var kuName='';
                    var param = {
                        "surveillance_ids": [],
                        // "camera_ids":$scope.yituIdArr,
                        "order": {
                            "timestamp": -1
                        },
                        "hit_condition": {
                            // "hit_similarity": {
                            //     "$gte": 80
                            // },
                            "timestamp":{
                                $gte:Number(moment().subtract(3,'days').format('X')),
                                $lte:Number(moment().format('X'))
                            }
                        },
                        "start": 0,
                        "limit": 5000
                    };
                    if(id){
                        var task_ids='';
                        var dd= id=='realPower'?2:4;
                        console.log(task_ids);
                        angular.forEach($scope.faceBuKong,function(data){
                            if(data.type==dd){
                               task_ids=data.ytLibId;
                               kuName=data.name;
                            }
                        });
                       param['surveillance_ids'].push(task_ids);
                    }
                    yituFace.yitu_alarm(param, function(resp) {
                        debugger;
                        if ("0" != resp.rtn) {
                            // notify.error("人像请求错误")
                            return;
                        }
                        if (!resp.pair_results || resp.pair_results.length == 0) {
                            $scope.showInformationLoading = true;
                            $scope.notShuju = true;
                            return;
                        }
                        $scope.showInformationLoading = false;
                        $scope.notShuju = false;
                        var socketFaceList = resp.pair_results;
                        if(!!cameraId){
                           socketFaceList = _.filter(socketFaceList,function(item){
                                return item.result1.camera_id == cameraId;
                            })
                        }
                        if(socketFaceList.length > 0 && $scope.compareFace[id].length > 0 && socketFaceList[0].result1.face_image_id == $scope.compareFace[id][0].result1.face_image_id){
                            return;
                        }
                        $scope.compareFace[id] = socketFaceList.concat($scope.compareFace[id]);
                        var len = $scope.compareFace[id].length;
                        
                        $.each($scope.compareFace[id], function(i, v) {
                            v.result1.faceUrl = yituFace.yituFace_Pic + base64encode(v.result1.face_image_uri);
                            v.result1.picUrl = yituFace.yituFace_Pic + base64encode(v.result1.picture_uri);
                            v.result2.faceUrl = yituFace.yituFace_Pic + base64encode(v.result2.face_image_uri);
                            v.hit_detail.similary = Number(v.hit_detail.hit_similarity).toFixed(2);
                            v.captureTime = moment(v.hit_detail.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
                            v.person_id = v.result2.



                                person_id;
                            v.name = v.result2.name;
                            v.kuName=kuName;
                            v.cameraName = $scope.yituIdToCameraNameObj[v.result1.camera_id];
                            v.lon = $scope.yituIdLon[v.result1.camera_id].lon;
                            v.lat = $scope.yituIdLon[v.result1.camera_id].lat;
                            if(id=='realPower'){
                              v.label=getFaceLabel(v.result2.person_id);
                            }
                            v.result2.gender == 0 ? "未知" : v.result2.gender == 1 ? "男" : "女";
                            // if(v.result2.name == "曹根英"){
                            //     console.log(v.captureTime);
                            // }
                        });
                        var newArr = $.extend([],$scope.compareFace[id]);
                        debugger;
                        if(!!cameraId){
                           $scope.compareFace[id] = _.filter($scope.compareFace[id],function(item){
                                return item.result1.camera_id == cameraId;
                            })
                        }
                        if (len > 20) {
                            $scope.compareFace[id] = $scope.compareFace[id].slice(0, 20);
                        }
                        $.each(newArr,function(i,v){
                            if(v.hit_detail.timestamp < Number(moment(moment().format("YYYY-MM-DD")+"00:00:00").format('X'))){
                                newArr = newArr.slice(0,i);
                                return false;
                            }
                        })
                        $scope.$apply();
                        if(!!lastRealPowerAndImportant && resp.pair_results.length > 0 && lastRealPowerAndImportant[0].result1.face_image_id == resp.pair_results[0].result1.face_image_id){
                            return;
                        }else{
                            lastRealPowerAndImportant = resp.pair_results;
                        }
                        $scope.$emit("realPowerEvent",newArr);
                    });
                }
                function getFaceLabel(id){
                   var str="";
                   angular.forEach(labelData,function(data){
                        if(data.credentialNo==id){
                            str=data.label;
                        }
                   });
                   return str;
                }
                var labelData=[];
                getAllLabel();
                function getAllLabel(){
                   var req = {
                      pageSize:999,
                      pageNumber:1,
                      credentialNo:'',
                      certificatesName:'',
                      residentialAddress:'',
                      phonenumber:'',
                      mac:'',
                      label:'',
                      villageCode:$scope.villageCode,
                      policeNumber:'',
                      department:''
                   };
                    moreService.queryFactPower(req).then(function(resp){
                       if (resp.resultCode == 200) {
                          labelData=resp.data.list;
                       }
                    }).catch(function(){}).finally(function(){});
                }
                //实有力量，关注人员对比
                $scope.contrastCompareFaceFun = function(item) {
                    $scope.contrastFace = {};
                    $scope.contrastFace.faceUrl = item.result1.faceUrl;
                    $scope.contrastFace.picUrl = item.result2.faceUrl;
                    $scope.contrastFace.similarity = item.hit_detail.similary;
                    $scope.contrastFace.gender = item.result2.gender == 0 ? "未知" : item.result2.gender == 1 ? "男" : "女";
                    $scope.contrastFace.person_id = item.person_id;
                    $scope.contrastFace.repository_id = item.kuName;//item.hit_detail.hit_repository_id;
                    $scope.contrastFace.name = item.name;
                    // $scope.$apply();
                    layer.open({
                        type: 1,
                        title: '人脸对比',
                        skin: 'dark-layer',
                        area: ['6.3rem', '3rem'],
                        shade: 0.8,
                        scrollbar: false,
                        closeBtn: 1,
                        shadeClose: true,
                        content: $("#contrastFace"),
                        end: function(index, layero) {
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).find(".layui-layer-content").find(".ul-middle").css({'width': '2.5rem'}).find("li").css({'width': '3rem'});
                        }
                    });
                }
                $scope.contractEnlargeImgFun = function(item) {
                    
                    var src = item.result1.picUrl;
                    var img = '<img src="' + src + '" style="height:100%"/>';
                    layer.open({
                        type: 1,
                        title: "放大图片",
                        skin: 'dark-layer',
                        area: ['6.74rem', '3.74rem'],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: img,
                        end: function(index, layero) {

                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                             $(layero).find(".layui-layer-content").css({"height":'3.73rem','text-align':'center'});
                            $(layero).append(iframe);
                        }
                    });
                }
                //轨迹跳转
                $scope.contractToMapTrack = function(index, item) {
                    
                    var url = "www.baidu.com";
                    if (index == 1) {
                        url = "#/index/trackShow/faceTrack/";
                        localStorage.setItem('faceTrackFromRight', JSON.stringify({ FacePath: item.FacePath, ID: "" }));
                        window.open(url);
                    }
                    if (index == 2) {
                        url = "#/index/trackShow/macTrack/";
                        // $scope.macData.mac;
                        localStorage.setItem('macTrack', item.mac);
                        window.open(url);
                    }
                };
                $scope.replaceMac = function(item) {
                    localStorage.setItem('toMacParams', JSON.stringify(item));
                    window.open("#/index/fromcartomac/");
                }
                $scope.showInformationLoading = true;
                $scope.notShuju = false;
                $scope.realPowerLabel = null;
                $scope.totalRow = null;

                //调用查询实有力量标签接口
                function queryRealPowerLable() {
                    rightService.queryRealPowerLable().then(function(resp) {
                        $scope.realPowerLabel = resp.data;
                    })
                }

               //调用开门记录 WIFI的接口

                 var startTime = moment().format("YYYY-MM-DD 00:00:00");
                var endTime = moment().format("YYYY-MM-DD HH:mm:ss");
                function queryOpenDoorRecordFun(){
                    debugger
                    var req = {
                        villageCode:$scope.villageCode,
                        startTime:startTime,
                        endTime:endTime
                    };
                    rightService.queryDynamicSenseCount(req).then(function(resp) {
                        $scope.wifiCount = resp.data.wifiCount;
                        $scope.warningPeopleCount = resp.data.warningPeopleCount;
                        $scope.warningPeopleUnDealCount = resp.data.warningPeopleUnDealCount;


                    })
                }
                // //调用过车记录的非机动车记录
                // var startTime = moment().format("YYYY-MM-DD 00:00:00");
                // var endTime = moment().format("YYYY-MM-DD HH:mm:ss");
                //  $scope.nonmotorList = [];
                // function queryNonMotorListFun(){
                //     debugger
                //     var req = {
                //         villageCode:$scope.villageCode
                //     };
                //     rightService.queryHistoryData(req).then(function(resp) {
                //         $scope.nonmotorList = resp.data.nonAcrossVehicle.list.nonmotorList;
                //         // $scope.platePic = resp.data.acrossVehicle.list.platePic;
                //         // $scope.name = resp.data;
                //         // $scope.inOutTime = resp.data;
                //         // $scope.tollgateName = resp.data;
                //     })
                // }
                //调用人脸感知发现、感知离开接口
                function getFaceFindAndLeaveFun(){
                    var param = [$scope.villageCode+""];
                    $scope.findAndLeaveObj = {
                        findObj:{
                            num:0
                        },
                        leaveObj:{
                            num:0
                        }
                    }
                    yituFace.yitu_dossier("incoming_dossier",param,function(data){
                        if(data.statistic_info.length>0){
                            $.each(data.statistic_info,function(i,v){
                                $scope.findAndLeaveObj.findObj.num += v.delta_num;
                            })
                        }
                    })
                    yituFace.yitu_dossier("leaving_dossier",param,function(data){
                        if(data.statistic_info.length>0){
                            $.each(data.statistic_info,function(i,v){
                                $scope.findAndLeaveObj.leaveObj.num += v.delta_num;
                            })
                        }
                    });
                }

           //跳转到实有警情事件界面
                $scope.toFaceEventFun = function(type){
                    var params = {
                        type:type,
                        source:""
                    }
                    localStorage.setItem('factEvent'+$scope.villageCode, JSON.stringify(params));
                    var newurl = window.location.href.split("/#")[0] + "#/index/factEvent/"+ $scope.villageCode;
                    window.open(newurl);
                }
                init();
            }
        ]
        return communityRightCtrl
    })
