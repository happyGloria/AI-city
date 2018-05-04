/**
 * Created by lihouhua on 2016/5/13.
 * 提供智慧地图接口查询
 */

define(['../services'],
    function (services) {
        services.factory('mapService', ['$q', '$http',
            function ($q, $http) {

                //查询图层信息
                var queryDataList = function (code) { //查询
                    return $http.get('/PBD/pgis/layer/dataList?code=' + code).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询人员轨迹信息
                var queryPeopleInfo = function (req) {
                    return $http.post('/PBD/pgis/trail/people', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询车辆轨迹信息
                var queryCarInfo = function (req) {
                    return $http.post('/PBD/pgis/trail/autocar', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询开房信息
                var getHotelInformation = function (req) {
                    return $http.post('/PBD/pgis/trail/getHotelInformation', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询热力图条件信息
                var getConditions = function () {
                    return $http.get('/PBD/chart/getConditions').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询热力图信息
                var getThermodyCharts = function (req) {
                    return $http.post('/PBD/chart/getThermodyCharts', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询区域内点位
                var getPoints = function (req) {
                    return $http.post('/PBD/timespaceHunter/getPoints', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //基站查询-基站标准查询
                var standardQuery = function (req) {
                    return $http.post('/PBD/basestation/standardQuery', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //基站查询-基站批量查询
                var batchQuery = function (req) {
                    return $http.post('/PBD/basestation/batchQuery', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //时空碰撞-查询案件
                var getCase = function (req) {
                    return $http.post('/PBD/timespaceHunter/getCase', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //时空碰撞-区域碰撞分析
                var timespaceHunter = function (req, req2) {
                    return $http.post('/PBD/timespaceHunter/collision?' + $.param(req2), req, {
                        headers: { 'Content-Type': 'application/json;'},
                        transformRequest: function(data){
                            return JSON.stringify(data);
                        }
                    }).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-获取告警任务
                var getAlarmTask = function () {
                    return $http.post('/PBD/alarm/getAlarmTask').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-删除告警任务
                var delAlarmTask = function (req) {
                    return $http.post('/PBD/alarm/delAlarmTask', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-获取重点区域信息
                var getKeyAreas = function () {
                    return $http.post('/PBD/alarm/getKeyAreas').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-新增告警任务
                var addAlarmTask = function (req) {
                    return $http.post('/PBD/alarm/addAlarmTask', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-获取告警信息
                var getAlarminfo = function (req) {
                    return $http.post('/PBD/alarm/getAlarminfo', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-获取告警信息
                var modifyAlarmTask = function (req) {
                    return $http.post('/PBD/alarm/modifyAlarmTask', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //区域布控-查询重点区域的报警次数
                var queryCount = function (req) {
                    return $http.post('/PBD/alarm/queryCount', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //时空碰撞-查询人员的基本信息
                var baseInfo = function (req) {
                    return $http.post('/PBD/dataeye/people/peopleInfo', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取地图配置信息
                var getLayerManager = function (req) {
                    return $http.post('/PBD/layerManager/getLayerManager', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //修改地图配置信息
                var modifyLayerManager = function (req) {
                    return $http.post('/PBD/layerManager/modifyLayerManager?layerManager='+ JSON.stringify(req)).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                 //修改图层展示类型
                var modifySystemMapType = function (req) {
                    return $http.post('/PBD/layerManager/modifySystemMapType', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                 //查询市内人员轨迹
                var peopleCityTrail = function (req) {
                    return $http.post('/PBD/pgis/trail/peopleCityTrail', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                // 查询人脸布控摄像机列表
                var queryFaceCam = function (req) {
                    return $http.post('/PBD/', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 查询人脸布控数据库
                var queryFaceDataBase = function (req) {
                    return $http.post('/PBD/', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 查询人脸布控布控人员
                var queryFacePeople = function (req) {
                    return $http.post('/PBD/', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 查询人脸布控结果列表
                var queryFaceList = function (req) {
                    return $http.post('/PBD/face/alarm', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                // 人脸落脚点查询

                var queryFacePoint = function (req) {
                    return $http.post('/PBD/ljd/faceLjd', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 人脸落脚点详情查询

                var queryFacePointDetail = function (req) {
                    return $http.post('/PBD/ljd/faceLjdData', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // MAC落脚点
                var queryMacPoint = function (req) {
                    return $http.post('/PBD/ljd/macLjd', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // MAC落脚点
                var queryMacPointData = function (req) {
                    return $http.post('/PBD/ljd/macLjdData', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 车辆落脚点

                var queryCarPoint = function (req) {
                    return $http.post('/PBD/ljd/carLjd', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };
                // 车辆落脚点详情

                var queryCarPointData = function (req) {
                    return $http.post('/PBD/ljd/carLjdData', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                // 人员轨迹查询
                var queryTrack = function (req) {
                    return $http.post('/PBD/people/trail/trailSearch', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                var queryCarInfo = function (req) {
                    return $http.post('/PBD/people/trail/carDetail', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                // 异常小区
                var queryUnusualDistrict = function (req) {
                    return $http.post('/PBD/ycfx/ycxq', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                // 异常人员
                var queryUnusualPerson = function (req) {
                    return $http.post('/PBD/excpeople/excPeopleSearch', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                var queryUnusualPersonDetail = function (req) {
                    return $http.post('/PBD/excpeople/excPeopleDetail', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                var detailExcPeo = function (req) {
                    return $http.post('/PBD/excpeople/detailExcPeo', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                }
                //mac轨迹
                var captrueMacList = function(req){
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
                //mac轨迹
                var queryCameraId = function(req){
                    return $http.post('/PBD/fds/camera/allList').
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
                return {
                    queryDataList: queryDataList,
                    queryPeopleInfo: queryPeopleInfo,
                    queryCarInfo: queryCarInfo,
                    getHotelInformation: getHotelInformation,
                    getConditions: getConditions,
                    getThermodyCharts: getThermodyCharts,
                    getPoints: getPoints,
                    standardQuery: standardQuery,
                    batchQuery: batchQuery,
                    getCase: getCase,
                    timespaceHunter: timespaceHunter,
                    getAlarmTask: getAlarmTask,
                    delAlarmTask: delAlarmTask,
                    getKeyAreas: getKeyAreas,
                    addAlarmTask: addAlarmTask,
                    getAlarminfo: getAlarminfo,
                    queryCount: queryCount,
                    modifyAlarmTask: modifyAlarmTask,
                    baseInfo: baseInfo,
                    getLayerManager: getLayerManager,
                    modifyLayerManager: modifyLayerManager,
                    modifySystemMapType: modifySystemMapType,
                    peopleCityTrail: peopleCityTrail,
                    queryFaceCam:queryFaceCam,
                    queryFaceDataBase:queryFaceDataBase,
                    queryFacePeople:queryFacePeople,
                    queryFaceList:queryFaceList,
                    queryMacPoint:queryMacPoint,
                    queryMacPointData:queryMacPointData,
                    queryTrack:queryTrack,
                    queryFacePoint:queryFacePoint,
                    queryFacePointDetail:queryFacePointDetail,
                    queryUnusualDistrict:queryUnusualDistrict,
                    queryUnusualPerson:queryUnusualPerson,
                    queryCarInfo:queryCarInfo,
                    queryCarPoint:queryCarPoint,
                    queryCarPointData:queryCarPointData,
                    queryUnusualPersonDetail:queryUnusualPersonDetail,
                    detailExcPeo:detailExcPeo,
                    captrueMacList:captrueMacList,
                    checkFace:checkFace,
                    searchaccesslog:searchaccesslog,
                    queryCameraId:queryCameraId,
                }
            }
        ])
    });
