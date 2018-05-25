 define(['app', 'controllers/controllers', 'jquery', '/lib/other/socket.io.js', '/modules/config/configFile.js', 'select2', 'controllers/community/communityRightModuleCtrl'],
    function(app, controllers, $, io, configFile, select2, communityRightModuleCtrl) {
        var communityNewCtrl = ['$scope', '$state', '$stateParams','communityAllService','communityNewService', '$compile',
            function($scope, $state, $stateParams,communityAllService, communityNewService, $compile) {
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
                $(".layout").find("div").eq(0).css({ "padding-top": "0px" });
                $scope.globalVillageCode = $stateParams.id || '310104006001';
                $scope.globalVillageName = configFile.communityCodeToName[$scope.globalVillageCode];
                localStorage.setItem("community3dCode",$scope.globalVillageCode);
                function init() {
                    registerTemplate();
                    mapInit();
                }

                function registerTemplate() {
                    $scope.templateUrl = 'template/html/modules/community/communityRightModule.html';
                    app.register.controller('templateController', communityRightModuleCtrl);
                }

                //三维地图建筑物点击事件
                window.threeMapClickFun = function(obj){
                  // alert(JSON.stringify(data));
                  // alert($scope.startIndoor)
                  // alert(communityNewService.queryCameraList);
                  //判断点击位置是否为楼栋
                    if (obj.tag == "building-top") {
                        var buildparam = {
                            // name: obj.objname.split("_")[1]
                             name:obj.name.split("_")[1],
                             villageCode:obj.name.split("_")[0]
                        };
                        $scope.globalVillageCode=buildparam.villageCode;
                        localStorage.setItem('build_' +buildparam.villageCode, JSON.stringify(buildparam));
                        // var url = window.location.href.split("/#")[0] + "/#/index/clickBuilding/"+buildparam.villageCode;
                        var url = '../../../template/html/modules/buildingHouse/building.html?villageCode='+villageCode;
                        var residentLayer = layer.open({
                            type: 2,
                            title: "楼栋",
                            skin: 'dark-layer',
                            shade: 0.7,
                            shadeClose: true,
                            area: ['7.2rem', '7.75rem'],
                            anim: 2,
                            scrollbar: false,
                            content: [url, 'no'], //iframe的url，no代表不显示滚动条
                            end: function() { //此处用于演示
                            },
                            success: function(layero, index) {
                                $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                                $(layero).append(iframe);
                            }
                        });
                    }
                     if (obj.tag == "menjin-top") {
                        if(!obj.name){
                            return ;
                        }
                        var villageCode = obj.name.split("_")[0];
                        var deviceName= obj.name.split("_")[1];
                        localStorage.setItem("menjinRecord_" + villageCode, JSON.stringify({
                          villageCode:$scope.globalVillageCode,
                          startTime: "",
                          endTime: "",
                          pageSize: 10,
                          pageNumber: 1,
                          pushType:2,
                          peopleName:"",
                          deviceName:deviceName,
                          credentialNo:""
                        }));
                        var url = window.location.href.split("/#")[0] + "#/index/doorrecord/" + villageCode;
                        window.open(url);
                        // $scope.$broadcast("menjinEvent", { "menjinParam": reqParam });
                    }

                    if (obj.tag == "jiankong-top") {
                        //监控
                        var villageCode = obj.name.split("_")[0];
                        var cameraId= obj.name.split("_")[1];
                        var req = {
                            villageCode: '',
                            cameraName:'',
                            cameraType: '1,2',
                            cameraId:cameraId,
                            pageNumber: 1,
                            pageSize: 999,
                        }
                        communityAllService.queryMapInfo('camera', req).then(function(data) {
                            if(data.resultCode == '200') {
                            var obj = data.data.list[0];
                            localStorage.setItem("ocxVideoSrc",JSON.stringify(obj));
                            var cameraLayer = layer.open({
                            type: 2,
                            title: "视频播放",
                            skin: 'dark-layer',
                            area: ['8.6rem', '6.5rem'],
                            shade: 0.8,
                            closeBtn: 1,
                            shadeClose: true,
                            content: ['../../../lib/video/ocx_video.html', 'no'],
                            end: function(index, layero) {
                                cameraLayer = null;
                                localStorage.removeItem(ocxVideoSrc);
                            },
                            success: function(layero) {
                                $(layero).find("iframe").contents().find("html").css('font-size', $("html").css('font-size'));
                                $(layero).append(iframe);
                            }
                           });
                            } 
                        });
                       
                       // $scope.$broadcast("jiankongEvent", { "cameraName": obj.objname });
                    }
                   
                    if (obj.tag == "jinggai-top") {
                        var req = {
                                    villageCode:'',
                                    pageNumber: 1,
                                    pageSize: 1,
                                    startTime: '',
                                    endTime: ''
                                };
                         communityAllService.queryMapInfo('sewer', req).then(function(data) {
                                if(data.resultCode == '200') {
                        var jinggaiName = "井盖";
                        var jinggaiDiv = "<div>" +
                            "<img src='/template/img/cover/1.jpg'/ style='width:200px;height:200px;margin-left:10px;'>" +
                            "<div style='margin-bottom:5px;font-size:16px;margin-left:10px;'><span style='padding-right:20px;'>盖径:</span><span>300mm</span></div>" +
                            "<div style='margin-bottom:5px;font-size:16px;margin-left:10px;'><span style='padding-right:20px;'>材质:</span><span>铸铁</span></div>" +
                            "<div style='margin-bottom:5px;font-size:16px;margin-left:10px;'><span style='padding-right:20px;'>管压:</span><span>0.6MPa</span></div>" +
                            "<div style='margin-bottom:5px;font-size:16px;margin-left:10px;'><span style='padding-right:20px;'>建造时间:</span><span>2006.10</span></div>" +
                            "</div>"
                        layer.open({
                            type: 1,
                            title: jinggaiName,
                            skin: 'dark-layer',
                            shade: 0.7,
                            shadeClose: true,
                            area: ['3.09rem', '5.62rem'],
                            shade: 0.8,
                            closeBtn: 1,
                            shadeClose: true,
                            content: jinggaiDiv,
                            end: function(index, layero) {
                                swObj.shade.show("false");
                            },
                            success: function(layero) {
                                $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                                $(layero).append(iframe);
                            }
                        });
                                            
                                 } else {
                                           // notify.warn('无法获取出入口地图信息');
                                }
                         });
                    }

                }

                //三维地图start
                function mapInit() {
                    var width = $("body").width() - 0.15*(document.body.clientWidth/1920)*100;
                    var ls_height = $("body").height() - $("#threeHeader").height() - $(".footer").height();
                    sessionStorage.setItem("communityCode",$stateParams.id || '310104006001');
                    $('#threeMap').width(width).height(ls_height).attr('src','/lib/map/threeMap/threeMap.html'); 
                }
                
                init();
            }
        ]
        return communityNewCtrl
    })
