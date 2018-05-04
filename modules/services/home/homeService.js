/**
 * Created by lihouhua on 2016/5/10.
 *查询首页数据
 */
define(['../services'],
    function (services) {
        services.factory('homeService', ['$q', '$http',
            function ($q, $http) {

                //查询今日概况数据
                var queryTodayList = function () { //查询
                    return $http.get('/PBD/datastore/dataSource/toDayList').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //查询变化趋势数据
                var queyDataHistory = function (req) { //查询
                    return $http.post('/PBD/datastore/dataSourceHistory/dataHistory', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取已经添加的菜单
                var getAlreadyMenus = function () {
                    return $http.get('/PBD/menu/getAlreadyMenus').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                //获取用户可以添加的常用菜单
                var getAvailableMenus = function () {
                    return $http.get('/PBD/menu/getAvailableMenus').then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //添加常用菜单
                var addMenu = function (ids) {
                    return $http.get('/PBD/menu/add?menuIds=' + ids).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //删除常用菜单
                var deleteMenu = function (ids) {
                    return $http.get('/PBD/menu/delete?menuIds=' + ids).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取战法模型
                var getTacticsShareCount = function () {
                    return $http.get('/PBD/judgedstation/tacticsShare/tacticsShareCount').then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //新增任务
                var addMission = function (content, participant, title) {
                    return $http.post('/PBD/cooperativetask/add', {
                        participant: participant,
                        content: content,
                        title: title
                    }).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取待办系统任务条数
                var queryCount = function () {
                    return $http.post('/PBD/cooperativetask/queryCount').then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //协同任务-查询任务
                var missionList = function (req) {
                    return $http.post('/PBD/cooperativetask/list', req).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //协同任务-接受任务
                var receive = function (id) {
                    return $http.post('/PBD/cooperativetask/receive', {id: id}).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //协同任务-查询任务详细
                var getDetailed = function (id) {
                    return $http.post('/PBD/cooperativetask/getDetailed', {id: id}).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                //零时头像保存
                var savePicture = function (paramObj) {
                    return $http.post('/PBD/user/savePicture', {
                        id: paramObj.id,
                        imageFile: paramObj.imageFile
                    }).
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

                //头像裁剪保存
                var setUpHeadPortrait = function (paramObj) {
                    return $http.post('/PBD/user/setUpHeadPortrait', {
                        id: paramObj.id,
                        x: paramObj.x,
                        y: paramObj.y,
                        width: paramObj.width,
                        height: paramObj.height,
                        imageName: paramObj.imageName
                    }).
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

                var trendDataChoose = function (req) {
                    return $http.post('/PBD/trendData/trendDataChoose', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                var trendDataList = function (req) {
                    return $http.post('/PBD/trendData/list', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                var trendModify = function (req) {
                    return $http.post('/PBD/trendData/modify', req).then(function (response, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(response.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取通知通告条数
                var newsCount = function () {
                    return $http.post('/PBD/notice/count').then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //获取通知通告列表
                var getNoticePage = function (req) {
                    return $http.post('/PBD/notice/getNoticePage', req).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //通知通告接受任务
                var newsReceive = function (id) {
                    return $http.post('/PBD/notice/read', {ids: id}).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //通知通告添加
                var addNews = function (req) {
                    return $http.post('/PBD/notice/add',req).then(function (resp, error) {
                        if (error) {
                            return $q.reject(error);
                        } else {
                            return $q.when(resp.data);
                        }
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                return {
                    queryTodayList: queryTodayList,
                    queyDataHistory: queyDataHistory,
                    getAlreadyMenus: getAlreadyMenus,
                    getAvailableMenus: getAvailableMenus,
                    addMenu: addMenu,
                    deleteMenu: deleteMenu,
                    getTacticsShareCount: getTacticsShareCount,
                    addMission: addMission,
                    queryCount: queryCount,
                    missionList: missionList,
                    receive: receive,
                    getDetailed: getDetailed,
                    savePicture: savePicture,
                    setUpHeadPortrait: setUpHeadPortrait,
                    trendDataChoose: trendDataChoose,
                    trendDataList: trendDataList,
                    trendModify: trendModify,
                    newsCount: newsCount,
                    getNoticePage: getNoticePage,
                    newsReceive:newsReceive,
                    addNews:addNews
                }
            }
        ])
    });
