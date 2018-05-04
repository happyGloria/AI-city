/**
 * Created by zrr on 2016/7/28.
 * 黑白名单
 */
define(['../services'],
    function (services) {
        services.factory('communityNewService', ['$q','$http',
            function ($q,$http) {

                /***********************  黑名单 *******************************/
                //查询摄像头列表
                var queryCameraList = function () {
                    return $http.post('/PBD/camera/list?pageNumber=1&pageSize=999').
                        then(function (response, error) {
                            if (error) {
                                alert(11);
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            // alert(11);
                            return $q.reject(d);
                        });
                };
                var queryVideoById = function(id){
                    return $http.get("/VIDEO/Video/GetLiveUrl?CameraNo="+id).
                        then(function (response, error) {
                            // debugger;
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            // debugger;
                            return $q.reject(d);
                        });
                }

                var queryDoorRecords = function(){
                    return $http.post('/PBD/doorDevice/openDoorRecordList?pageNumber=1&pageSize=10').
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

                var querySmokeRecords = function(){
                    return $http.post('/PBD/xfyg/deviceAlarmList?pageNumber=1&pageSize=10').
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

                var queryMacRecords = function(){
                    return $http.post('/PBD/mac/captrueMacList?pageNumber=1&pageSize=10').
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

                var queryFaceRecords = function(req){
                    return $http.post('/PBD/fds/rawApi?reqURI=/search/searchaccesslog',req).
                        then(function (response, error) {
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            console.log("错误");
                            return $q.reject(d);
                        });
                }

                var queryCarRecords = function(){
                    return $http.post('/PBD/car/captrueCarList?pageNumber=1&pageSize=10').
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
                //建筑信息
                var buildingInfo = function(req){
                    return $http.post('/PBD/village/list',req).
                        then(function (response, error) {
                            debugger;
                            if (error) {
                                return $q.reject(error);
                            } else {
                                return $q.when(response.data);
                            }
                        }, function (d) {
                            debugger;
                            return $q.reject(d);
                    });
                }

                //住户信息
                var residengtInfo = function(req){
                    return $http.post('/PBD/village/info',req).
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

                //门禁图片接口
                var queryDoorImg = function(req){
                    return $http.post('/PBD/doorDevice/getPic',req).
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
                
                //门禁视频接口
                var queryDoorVideo = function(req){
                    return $http.post('/PBD/doorDevice/getVideo',req).
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

                //人脸对比接口
                var queryContrastFace = function(req){
                    return $http.post('/PBD/fds/getAlarmLog',req).
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

                //人脸对比调用身份检索接口
                var querySearchFace = function(req){
                    return $http.post('/PBD/fds/rawApi?reqURI=/search/searchface',req).
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

                //查询人脸抓拍摄像机列表
                var queryFaceCameraList = function(){
                    return $http.post('/PBD/fds/camera/taskCameraList?pageNumber=1&pageSize=999').
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
                //住户信息中的车辆接口
                var residentCar = function(req){
                    return $http.post('/PBD/car/captrueCarList',req).
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
                    queryCameraList : queryCameraList,
                    queryVideoById : queryVideoById,
                    queryDoorRecords:queryDoorRecords,
                    querySmokeRecords:querySmokeRecords,
                    queryMacRecords:queryMacRecords,
                    queryFaceRecords:queryFaceRecords,
                    queryCarRecords:queryCarRecords,
                    buildingInfo:buildingInfo,
                    residengtInfo:residengtInfo,
                    queryDoorImg:queryDoorImg,
                    queryDoorVideo:queryDoorVideo,
                    queryContrastFace:queryContrastFace,
                    querySearchFace:querySearchFace,
                    queryFaceCameraList:queryFaceCameraList,
                    residentCar:residentCar,
                }
            }
        ])
    });