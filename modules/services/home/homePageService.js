/**
 * Created by lihouhua on 2016/11/30.
 */

define(['../services'], function(services){
    services.factory('homePageService', ['$q', '$http', function($q, $http){
        //查询camera数据
        var queryCameraList = function (req) { //查询
            return dfd.then(function(){
                return $http.get('/PVA/manage/camera/list?'+$.param(req)).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询wifi数据
        var queryWiFiList = function () { //查询
            return $http.get('/PBD/wifi/list').then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询wifi数据
        var queryWiFiHistoryList = function (req) { //查询
            return $http.post('/PBD/wifi/hisData', req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        var dfd = $http.post('/PVA/manage/user/auth', {
            username: 'snface',
            password: 'fc18b32ad40c1c52187b565a5357383a'
        });

        //查询人脸历史
        var queryFaceContact = function(req){
            //return $http.post('/PBD/face/cameraHisData', req).then(function (response, error) {
            //return $http.post('/PBD/face/alarmTop', req).then(function (response, error) {
            return dfd.then(function(){
                return $http.get('/PVA/uams/alarm/top?conditions='+req.conditions +'&pageSize='+req.pageSize).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        var queryFaceContact2 = function(req){
            //return $http.post('/PBD/face/cameraHisData', req).then(function (response, error) {
            req = {
                reqURI: '/service/uams/alarm/list',
                reqMethod: 'get',
                pageSize:20,
                pageNumber:1,
                conditions: JSON.stringify({"cameraId":{"$in":[7130]}})
            };
            return $http.get('/PBD/face/api', req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        /*/face/api
        reqURI：/service/uams/alarm/list/
        reqMethod：*/


        //查询人脸历史
        var queryFaceHistory = function(req){
            //return $http.post('/PBD/face/cameraHisData', req).then(function (response, error) {
            //var request = 'cameraIds='+req.cameraIds+'&currentPage'
            return dfd.then(function(){
                return $http.get('/PVA/trace/log/list?'+$.param(req)).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询人脸聚类
        var queryFaceCluster = function(req){
            return dfd.then(function(){
                return $http.get('/PBD/face/cluster?'+$.param(req)).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询人脸聚类详情
        var clusterDetail = function(req){
            return dfd.then(function(){
                return $http.get('/PBD/face/clusterDetail?'+$.param(req)).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询人脸历史
        var queryPoiList = function(){
            return $http.get('/PBD/kakou/poiList').then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询卡口分析结果
        var analyzeCar = function(req){
            return $http.post('/PBD/kakou/analyze', req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询卡口历史
        var queryCarHistory = function(req){
            return $http.post('/PBD/kakou/hisData', req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询卡口车辆过车照片
        var historyClgczp = function(req){
            return $http.post('/PBD/kakou/historyClgczp', req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询抓拍人脸图片列表
        var faceCrash = function(req){
            return $http.post('/PBD/face/crash?areas='+req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //由人脸碰撞出mac
        var macFaceCrash = function(req){
            return $http.post('/PBD/face/macFaceCrash?areas='+req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //查询抓拍车牌图片列表
        var carCrash = function(req){
            return $http.post('/PBD/kakou/crash?areas='+req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };

        //由车牌碰撞出mac
        var macCarCrash = function(req){
            return $http.post('/PBD/kakou/macCarCrash?areas='+req).then(function (response, error) {
                if (error) {
                    return $q.reject(error);
                } else {
                    return $q.when(response.data);
                }
            }, function (d) {
                return $q.reject(d);
            });
        };


        var dfd = $http.post('/PVA/manage/user/auth', {
            username: 'snface',
            password: 'fc18b32ad40c1c52187b565a5357383a'
        });

        //查询人员信息
        var getPersonInfo = function(req){
            return dfd.then(function(){
                return $http.get('/PVA/manage/person/get/'+req).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //从抓拍历史库中查询
        var queryPatchFace = function(req){
            return dfd.then(function(){
                return $http.post('/PBD/face/search', req).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询民族
        var queryNation = function(){
            return dfd.then(function(){
                return $http.get('/service/base/common/nation').then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        //查询抓拍人脸轨迹
        var queryTraceFace = function(req){
            return dfd.then(function(){
                return $http.get('/service/trace/face/list?'+$.param(req)).then(function (response, error) {
                    if (error) {
                        return $q.reject(error);
                    } else {
                        return $q.when(response.data);
                    }
                }, function (d) {
                    return $q.reject(d);
                });
            });
        };

        return {
            queryTraceFace: queryTraceFace,
            clusterDetail: clusterDetail,
            queryFaceCluster: queryFaceCluster,
            queryNation: queryNation,
            queryPatchFace: queryPatchFace,
            macCarCrash: macCarCrash,
            carCrash: carCrash,
            queryCameraList: queryCameraList,
            queryWiFiList: queryWiFiList,
            queryFaceContact: queryFaceContact,
            queryFaceHistory: queryFaceHistory,
            queryPoiList: queryPoiList,
            analyzeCar: analyzeCar,
            queryWiFiHistoryList: queryWiFiHistoryList,
            queryCarHistory: queryCarHistory,
            historyClgczp: historyClgczp,
            faceCrash: faceCrash,
            macFaceCrash: macFaceCrash,
            getPersonInfo: getPersonInfo
        };
    }]);
});
