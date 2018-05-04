/**
 * Created by zrr on 2016/7/28.
 * 更多列表
 */
define(['../services'],
    function (services) {
        services.factory('moreService', ['$q','$http',
            function ($q,$http) {
                
                //获取门禁设备列表
                var doorDevice = function(req){
                    return $http.post('/zhsq/access/getAccessDeviceList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //门禁记录列表
                var openDoorRecord = function(req){
                    return $http.post('/zhsq/dynamicSense/findDynamicSenseList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //ck报警
                var ckAlarmList = function(req){
                    return $http.post('/zhsq/ck/ckAlarmList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }; 
                //ck设备
                var ckDeviceList = function(req){
                    return $http.post('/zhsq/ck/ckDeviceList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //门未关
                var getNotCloseList = function(req){
                    return $http.post('/zhsq/openRecord/notLocked ',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //刷卡异常
                var getDoorAlarmList = function(req){
                    return $http.post('/zhsq/openRecord/warningPeople',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //消防报警列表--事件
                var smokeAlarmList = function(req){
                    return $http.post('/zhsq/fire/fireAlarmList',req).//PBD/smoke/captrueSmokeList
                        then(function (response, error) {///PBD/xfyg/alarmList
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //消防设备列表
                var smokeDeviceList = function(req){
                    return $http.post('/zhsq/fire/fireDeviceList',req).///PBD/xfyg/deviceList
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //动态感知数据列表 
                // pushType 1:人脸,2:开门记录,3:过车,4:wifi,5:消防,6:烟感,7:电气,8:水压,9:巡视,10:在岗,11:位移,12:视频
                var captrueCarList = function(req){
                    return $http.post('/zhsq/dynamicSense/findDynamicSenseList',req).///kakou/poiList
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //查询卡扣列表
                var getVehicleTollgateList = function(req){
                    return $http.post('/zhsq/vehicle/getVehicleTollgateList',req).///kakou/poiList
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //小区Mac
                var captrueMacList = function(req){
                    return $http.post('/zhsq/dynamicSense/findDynamicSenseList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //wifi设备
                var wifiList = function(req){
                    return $http.post('/zhsq/wifi/getWifiDeviceList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //camera
                var cameraList = function(req){
                    return $http.post('/zhsq/camera/getCameraByType',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //facecamera
                var faceCameralist = function(req){
                    return $http.post('/zhsq/camera/getCameraByType',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //factPeople
                var factPeople = function(req){
                    return $http.post('/zhsq/people/peopleList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //一人一档
                var peopleFile = function(req){
                    return $http.post('/zhsq/people/getPeopleBaseInfo',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };
                //人脸抓拍
                var checkFace = function(formData,callback){
                    debugger
                    var request = new XMLHttpRequest(); 
                      //上传连接地址 
                      request.open("POST", "/PBD/fds/formdataApi?reqURI=/search/checkFace"); 
                      request.onreadystatechange=function() 
                      { 
                        if (request.readyState==4) 
                        { 
                          if(request.status==200){ 
                            debugger
                            callback(request.responseText);
                            console.log("上传成功"); 
                          }else{ 
                            console.log("上传失败,检查上传地址是否正确"); 
                          } 
                        } 
                      } 
                      request.send(formData); 
                };


                //人脸抓拍
                var searchaccesslog = function(req){
                    return $http.post('/PBD/fds/rawApi?reqURI=/search/searchaccesslog',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                };

                //实时力量列表接口
                var queryCommunityPowerList = function(req){
                    return $http.post('/PBD/realPower/realPowerList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }

                //实时力量查询多张图片
                var queryCommunityPowerPic = function(req){
                    return $http.post('/PBD/realPower/faceRealPowerInfo',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //布控告警
                var monitorList = function(req){
                    return $http.post('/zhsq/facelibMapper/alert',req,{
                        'headers':{
                            'Content-Type':'application/json;charset=UTF-8'
                        }
                    }).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response);
                            }
                        }, function (d) {
                            return $q.reject(d);
                        });
                }
                //110警情
                var warningList = function(req){
                    return $http.post('/zhsq/policeAlert/getPoliceAlerts',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //实有单位列表
                var factCompanyList = function(req){
                    return $http.post('/zhsq/village/getRealCompanyList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //从业人员详情
                var peopleDetailList = function(req){
                    return $http.post('/zhsq/village/getRealCompanyPeopleList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //查询实有安防设施列表接口
                var queryFacilityList = function(req){
                    return $http.post('/zhsq/fire/getSecurityEquipment',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //查询实有安防力量列表接口
                var queryPowerList = function(req){
                    return $http.post('/zhsq/realPowerEquip/getCountRealPower',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //车辆状态接口
                var queryCarStatus = function(req){
                    return $http.post('/PBD/car/carStatsList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //实有力量
                var queryFactPower = function(req){
                    return $http.post('/zhsq/realPowerEquip/getRealPowerGroupByLabel',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //单位信息-一人一档
                var queryCompanyInfo = function(req){
                    return $http.post('/PBD/SYDW/getcompanyPersonbyID',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //处理事件-确认按钮接口
                var detailEvent = function(req){
                    return $http.post('/zhsq/eventDeal/deal',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //感知发现
                var senseFind = function(req){
                    return $http.post('/PBD/sensing/discovery',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                
                //感知离开
                var senseLeave = function(req){
                    return $http.post('/zhsq/openRecord/senseLeave',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //智能分析
                var analysis = function(req){
                    return $http.post('/zhsq/eventAnalysis/queryEventAnalysis',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //动态感知-过车-过车统计列表
                var queryDiffTypeVehicle = function(req){
                    return $http.post('/zhsq/vehicle/queryDiffTypeVehicle',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //实有事件-外来车辆滞留
                var senseCar = function(req){
                    return $http.post('/zhsq/vehicle/notLeave',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //实有人口查询数量类别接口
                var queryRealPeopleNum = function(req){
                    return $http.post('/zhsq/people/peopleTypeCount',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }

                //感知离开，发现，实际登记人口数量查询
                var querySenceFindAndLeave = function(){
                    return $http.post('/PBD/syrk/syrkNum').
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                
                //实有装备
                var queryRealEquiments = function(req){
                    return $http.post('/zhsq/realPowerEquip/getEquipmentList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //快递人员
                var queryExpressPeople = function(req){
                    return $http.post('/zhsq/people/expressPeopleList',req).
                    then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //人车到mac
                var carRecordMacDetail = function(req){
                    return $http.post('/PBD/car/carRecordMacDetail',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                // //车辆感知--登记数
                // var registerCar = function(req){
                //     return $http.post('/PBD/pva/alarm/list',req).
                //         then(function (response, error) {
                //             if (error) {
                //                 return $q.reject(error);
                //             } else {
                //                 return $q.when(response.data);
                //             }
                //         }, function (d) {
                //             return $q.reject(d);
                //     });
                // }
                //快递静态数据
                var queryExpressPeopleStatic = function(req){
                    return $http.post('/PBD/fds/getKuaidiAccessLog').
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档中的事件
                var getSomeoneAffair = function(req){
                    return $http.post('/zhsq/eventDeal/findEventDeal',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //车辆感知发现
                var carSenseFind = function(req){
                    return $http.post('/zhsq/vehicle/senseDiscovery',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                
                //车辆感知离开
                var carSenseLeave = function(req){
                    return $http.post('/zhsq/vehicle/senseLeaveList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档车辆信息，获取车牌号
                var getCarNo = function(req){
                    return $http.post('/PBD/car/getCarInfoList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档车辆信息，违章列表
                var getWeiTing = function(req){
                    return $http.post('/zhsq/vehicle/queryPeccancyCar',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档车辆信息，卡口过车
                var getKakou = function(req){
                    return $http.post('/zhsq/vehicle/queryKakouJiLu',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //窨井盖设备列表
                var getJingGai = function(req){
                    return $http.post('/zhsq/cover/getManholecoverList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //微型消防站
                var getFireStation = function(req){
                    return $http.post('/zhsq/fire/getFireStationList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //案件接报
                var getReceivedCase = function(req){
                    return $http.post('/zhsq/policeRecv/getPoliceRecvList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //消防-动态感知,右侧模块
                var dynamicAwareFire = function(req){
                    return $http.post('/zhsq/dynamicSense/findDynamicSenseList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档-房屋信息
                var getHouseInfoList = function(req){
                    return $http.post('/zhsq/village/getHouseInfoList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档-用户移动设备mac
                var getUserMacList = function(req){
                    return $http.post('/zhsq/wifi/getUserMacList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //一人一档-mac信息
                var getWifiDataList = function(req){
                    return $http.post('/zhsq/wifi/getWifiDataList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //多小区首页-一标六实chart
                var queryFact = function(req){
                    return $http.post('/zhsq/statistics/six-entity-type',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //多小区首页-警员
                var queryPolice = function(req){
                    return $http.post('/zhsq/wifi/getWifiDataList',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //实有房屋
                var factHouseList = function(req){
                    return $http.post('/zhsq/village/getHouseListByBuilding',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //警员
                var getPoliceList = function(req){
                    return $http.post('/zhsq/gps/findGpsByPage',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //警务流程处理
                var dealPoliceInfo = function(req){
                    return $http.post('/zhsq/eventDeal/dealPoliceInfo',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //警员排班表
                var getPoliceTable = function(req){
                    return $http.post('/zhsq/police/queryPoliceSchedule',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //警务流程查看
                var lookDetail = function(req){
                    return $http.post('/zhsq/eventDeal/queryDealProcessRecord',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }
                //手动派单
                var shouDongPaiDang = function(req){
                    return $http.post('/zhsq/policeAlert/shouDongPaiDang',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            return $q.reject(d);
                    });
                }

                return {
                    doorDevice:doorDevice,
                    openDoorRecord:openDoorRecord,
                    ckAlarmList:ckAlarmList,
                    ckDeviceList:ckDeviceList,
                    getNotCloseList:getNotCloseList,
                    getDoorAlarmList:getDoorAlarmList,
                    smokeAlarmList:smokeAlarmList,
                    smokeDeviceList:smokeDeviceList,
                    captrueCarList:captrueCarList,
                    getVehicleTollgateList:getVehicleTollgateList,
                    captrueMacList:captrueMacList,
                    wifiList:wifiList,
                    cameraList:cameraList,
                    faceCameralist:faceCameralist,
                    factPeople:factPeople,
                    peopleFile:peopleFile,
                    checkFace:checkFace,
                    searchaccesslog:searchaccesslog,
                    queryCommunityPowerList:queryCommunityPowerList,
                    queryCommunityPowerPic:queryCommunityPowerPic,
                    warningList:warningList,
                    monitorList:monitorList,
                    factCompanyList:factCompanyList,
                    peopleDetailList:peopleDetailList,
                    queryFacilityList:queryFacilityList,
                    queryPowerList:queryPowerList,
                    queryCarStatus:queryCarStatus,
                    queryFactPower:queryFactPower,
                    queryCompanyInfo:queryCompanyInfo,
                    detailEvent:detailEvent,
                    senseFind:senseFind,
                    senseLeave:senseLeave,
                    analysis:analysis,
                    queryDiffTypeVehicle:queryDiffTypeVehicle,
                    senseCar:senseCar,
                    queryRealPeopleNum:queryRealPeopleNum,
                    querySenceFindAndLeave:querySenceFindAndLeave,
                    queryRealEquiments:queryRealEquiments,
                    carRecordMacDetail:carRecordMacDetail,
                    queryExpressPeople:queryExpressPeople,
                    queryExpressPeopleStatic:queryExpressPeopleStatic,
                    getSomeoneAffair:getSomeoneAffair,
                    carSenseFind:carSenseFind,
                    carSenseLeave:carSenseLeave,
                    getCarNo:getCarNo,
                    getWeiTing:getWeiTing,
                    getKakou:getKakou,
                    getJingGai:getJingGai,
                    getFireStation:getFireStation,
                    getReceivedCase:getReceivedCase,
                    dynamicAwareFire:dynamicAwareFire,
                    getHouseInfoList:getHouseInfoList,
                    getUserMacList:getUserMacList,
                    getWifiDataList:getWifiDataList,
                    queryFact:queryFact,
                    queryPolice:queryPolice,
                    factHouseList:factHouseList,
                    getPoliceList:getPoliceList,
                    dealPoliceInfo:dealPoliceInfo,
                    getPoliceTable:getPoliceTable,
                    lookDetail:lookDetail,
                    shouDongPaiDang:shouDongPaiDang
                }
            }

        ])
    });