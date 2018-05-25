/** 
 * app.js 
 */
define(
    [
        'angular',
        // 'controllers/community/communityRightModuleCtrl',
        'angularResource',
        'uiRoute',
        'angularRoute',
        'angularAMD',
        'angularCss',
        'echarts-all',
        'echarts-dark',
        'uiBootstrapTpls',
        //'prefixfree',
        'd3',
        'd3.layout.cloud',
        'layer',
        'datetimepicker',
        'scrollbar',
        'excheck',
        'dropdownlist',
        'controllers/index',
        'services/index',
        'directives/index'
    ],
    function(angular) {
        var angularModule = angular.module('app', ['ngRoute', 'ngResource', 'controllers', 'services', 'directives', 'ui.router', 'ui.bootstrap'], function($compileProvider, $controllerProvider) {});
        //自定义过滤器
        angularModule.filter('paging', function() {
            return function(items, index, pageSize) {
                if (!items)
                    return [];

                var offset = (index - 1) * pageSize;
                return items.slice(offset, offset + pageSize);

            }
        });

        angularModule.filter('size', function() {
            return function(items) {
                if (!items)
                    return 0;

                return items.length || 0
            }
        });

        angularModule.filter('transferPic', function() {
            return function(picUrl) {
                return '/zhsq/file/show?path='+picUrl;
            }
        });

        angularModule.filter('locationName', function() {
            return function(locationName) {
                if(locationName.split(" ")[0] == "null"){
                    return locationName.split(" ")[1];
                }
                return locationName;
            }
        });

        angularModule.directive('errorSrc', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('error', function() {
                        var imgSrc = 'template/img/people.gif';
                        var theme = sessionStorage.getItem('theme') || 'default';
                        if (theme != 'default') {
                            imgSrc = 'template/img/dark-people.png';
                        }
                        attrs.$set('src', imgSrc);
                    });
                    scope.$on('themeChange', function(e, theme2) {
                        if (attrs.src.indexOf('people.gif') >= 0 || attrs.src.indexOf('dark-people.png') >= 0) {
                            var theme = theme2;
                            var imgSrc = 'template/img/people.gif';
                            if (theme != 'default') {
                                imgSrc = 'template/img/dark-people.png';
                            }
                            attrs.$set('src', imgSrc);
                        }
                    });
                }
            }
        });

        Date.prototype.format = function(format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };

        angularModule.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
                angularModule.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
                // angularModule.register.controller('templateController', communityRightModuleCtrl);
            }
        ]);

        // 添加HTTP拦截器
        angularModule.factory('httpInterceptor', ['$q', function($q) {
            function errorMessage(message) {
                if (!window.notify || !message) {
                    return;
                }
                notify.error(message).queue = [];
            }

            return {
                request: function(config) {
                    config.timeout = 20000;
                    return config;
                },
                requestError: function(config) {
                    return $q.reject(config);
                },
                response: function(response, a, b, c) {
                    var data = response.data || {},
                        resultCode = data.resultCode;
                    if (!!resultCode && resultCode != '200') {
                        var url = window.location.hash;
                        if (url.indexOf('search/pan/') <= -1) {
                            errorMessage(data.resultMessage);
                        }
                        if (resultCode === '401') {
                            setTimeout(function() {
                                //用户注销后删除session
                                sessionStorage.removeItem("USER");
                                location.href = '#index/login/';
                            }, 1000);
                        }
                        return $q.reject(response);
                    }
                    return response;
                },
                responseError: function(response) {
                    var message;
                    switch (response.status) {
                        case 0:
                            message = '请求超时，请稍后重试！';
                            break;
                        case 404:
                            message = '请求的地址不存在，请联系管理员！';
                            break;
                    }
                    var url = window.location.hash;
                    if (url.indexOf('search/pan/') <= -1) {
                        //errorMessage(message);
                    }
                    // errorMessage(message);
                    return $q.reject(response);
                }
            };
        }]);

        angularModule.config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
            $httpProvider.defaults.transformRequest = function(data) {
                var key, result = [];
                if (typeof data === "string") return data;
                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
                    }
                }
                return result.join("&");
            };
            $httpProvider.defaults.headers.post = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
        }]);
        return angularModule;
    });
