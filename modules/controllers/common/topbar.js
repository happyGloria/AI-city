/**
 * Created by chenhao on 2018/5/10.
 */
define(['app','controllers/controllers', 'jquery', 'config/configFile', 'layer', 'notify', 'moment','controllers/user/userCtrl',
        'controllers/common/zTreeSearchCtrl',],
	function(app,controllers, $, configFile, layer, notify, moment,userCtrl, zTreeSearchCtrl) {
        var navigationCtrl = ['$scope', '$location','$http','$rootScope', '$state', '$stateParams','$compile', '$interval', '$timeout',
            function ($scope, $location, $http,$rootScope, $state, $stateParams,  $compile,
				$interval, $timeout) {
                // location.href = '/#/index/communityChen/';
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

                $scope.initNav = function () {
                    $scope.activeNav = $location.$$path
                    registerUserTemplate()
                     registerZTreeSearchTemplate()
                }
                $scope.initNav()
                $scope.showSecondMenus=function(val){
                    $scope.showSecondMenusHover=val
                }
                $scope.hideSecondMenus=function () {
                    $scope.showSecondMenusHover = false
                }
                $scope.msg = "确定要退出【奉贤社会面智能安防平台】吗？";
                //退出登录弹出框
                var logOut = '';
                $scope.logout = function () {
                    logOut = layer.open({
                        type: 1,
                        title: ' ',
                        shadeClose: true,
                        maxmin: false,
                        area: ['4.1rem', '2.84rem'],
                        content: '',
                        success: function (layero) { //层销毁后触发的回调
                            angular.element(layero).find('.layui-layer-content').append($compile

                                ($('#layer-login-out').html())($scope));
                        },
                        yes: function (index, layero) {
                            $scope.msg = "确定要退出【智慧安防社区系统】吗？";

                        },
                        cancel: function (index, layero) {
                            $scope.msg = "确定要退出【智慧安防社区系统】吗？";
                            layer.close(logOut);
                        }
                    });
                };
                $scope.loginLayer = null;
                $scope.openLog = function () {
                    debugger
                    $scope.loginLayer = layer.open({
                        type: 1,
                        title: '',
                        maxmin: false,
                        area: ['3rem', '2rem'],
                        shadeClose: true,
                        content: '', //$('#layer-org-create'),
                        success: function (layero) {
                            angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-login-out').html())($scope));

                        },
                        end: function () { //层销毁后触发的回调

                        },
                        yes: function (index, layero) { //确定
                            //do something
                        },
                        cancel: function (index, layero) { //取消
                            //do something
                        }
                    });
                }
                //退出登录
                $scope.goLogOut = function () {
                    $http.get('/zhsq/system/logout?account=admin').then(function (resp) {
                        debugger
                        if (resp.data.resultCode == 200 && resp.data.data.status == 'success') {
                            layer.close($scope.loginLayer);
                            setTimeout(function () {
                                window.location.href = "/#/index/login/";
                            }, 200)
                        }
                    }).catch(function () { }).finally(function () { });

                };

                //取消退出登录
                $scope.closeOut = function () {
                    layer.close($scope.loginLayer);
                };

			}
		];
		return navigationCtrl;
	});