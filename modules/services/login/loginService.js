/**
 * loginService
 * Created by jgx on 2016/4/12.
 */
define(['../services'],
    function (services) {
        services.factory('loginService', ['$q', '$http',
            function ($q, $http) {
                var userLogin = function (account, password) {
                    //http://172.16.61.49:8080/PBD/login?type=1&userName=123456&password=123456
                    //http://172.16.61.49:8080/PBD/login
                    return $http.post('/zhsq/system/login', {
                        account: account,
                        password: password
                    }).then(function (response) {
                        return $q.when(response.data || {});
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                var userKey = 'USER';

                var saveUserName = function (user) {
                    sessionStorage.setItem(userKey, JSON.stringify(user));
                };
                
                var getUserName = function () {
                   return JSON.parse(sessionStorage.getItem(userKey));
                };
                var getUser = function () {
                    var userJson = sessionStorage.getItem(userKey);
                    return JSON.parse(userJson) || {};
                };

                var saveUsrToLocal = function (username) {
                    localStorage.setItem("currentSaveUsr", username);
                };

                var getLocalUsr = function () {
                    return localStorage.getItem("currentSaveUsr") || "";
                };

                var changePwd = function (oldpwd, newpwd, newpwds) {
                    return $http
                        .post('/PBD/changePwd', {
                            oldPwd: oldpwd,
                            newPwd: newpwd,
                            newPwd2: newpwds
                        })
                        .then(function (resp) {
                            return $q.when(resp.data);
                        });
                };

                var logOut = function () {
                    return $http.get('/PBD/logout')
                        .then(function (resp) {
                            return $q.when(resp.data);
                        }, function (d) {
                            return $q.reject(d);
                        });

                };

                var getLoginCounts = function () {
                    return $http.get('/PBD/log/getLoginCounts?queryDate=' + new Date().format("yyyy-MM-dd"))
                        .then(function (resp) {
                            return $q.when(resp.data);
                        }, function (d) {
                            return $q.reject(d);
                        });
                };

                var getOnlinePeopleNum = function () {
                    return $http.get('/PBD/onlinePeopleNum')
                        .then(function (resp) {
                            return $q.when(resp.data);
                        }, function (d) {
                            return $q.reject(d);
                        });
                };

                //预警管理-预警消息读取
                var readWarning = function () {
                    return $http.get('PBD/judgedstation/warning/readWarning')
                        .then(function (resp) {
                            return $q.when(resp.data);
                        }, function (d) {
                            return $q.reject(d);
                        });
                };

                //预警管理-预警消息更新
                var updateRead = function (id) {
                    return $http.post('/PBD/judgedstation/warning/updateRead', {
                        id: id
                    }).then(function (resp) {
                        return $q.when(resp.data);
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                var changeTheme = function (theme) {
                    return $http.get('/PBD/changeTheme', {
                        params: {
                            userTheme: theme
                        }
                    });
                };

                //系统监控报警-获取提醒数量
                var getAlarmCount = function (theme) {
                    return $http.get('/PBD/warn/getAlarmCount').then(function (resp) {
                        return $q.when(resp.data);
                    }, function (d) {
                        return $q.reject(d);
                    });
                };

                //人脸系统登录
                var faceAuth = function () {
                    return $http.get('/PBD/face/auth').then(function (resp) {
                        return $q.when(resp.data);
                    }, function (d) {
                        return $q.reject(d);
                    });
                };


                return {
                    userLogin: userLogin,
                    saveUserName: saveUserName,
                    getUserName:getUserName,
                    getUser: getUser,
                    saveUsrToLocal: saveUsrToLocal,
                    getLocalUsr: getLocalUsr,
                    changePwd: changePwd,
                    logOut: logOut,
                    getLoginCounts: getLoginCounts,
                    getOnlinePeopleNum: getOnlinePeopleNum,
                    readWarning: readWarning,
                    updateRead: updateRead,
                    changeTheme: changeTheme,
                    getAlarmCount: getAlarmCount,
                    faceAuth: faceAuth,
                }
            }
        ])
    });
