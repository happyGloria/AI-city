/**
 * Created by jgx on 2016/4/12.
 */
define(['controllers/controllers', 'jquery', 'notify'],
    function (controllers, $, notify) {

        var loginCtrl;
        loginCtrl = ['$scope', 'loginService',
            function ($scope, loginService) {
                $scope.$on('$stateChangeSuccess', function() {
                    var $starmapH = $('.sm-starmap-application').height();
                    var $contentH = $('.content-box').height();
                    if($starmapH > $contentH){
                        $('.sm-starmap-application').css('min-height','100%');
                    }else{
                        $('.sm-starmap-application').height($contentH);
                    }
                });

                // $('.user').focus(function(){
                //     $('.user').addClass('focus');
                // }).blur(function(){
                //     $('.user').removeClass('focus');
                // });
                // $('.password').focus(function(){
                //     $('.password').addClass('focus');
                // }).blur(function(){
                //     $('.password').removeClass('focus');
                // });

                // 关闭其他页面跳转到登录时的弹出框
                window.layer && layer.closeAll();
                /*$('.logo-gif').animate({},6000,function(){
                 $('.logo-gif').animate({'margin-top':'-3rem'})
                 $('.content-box').animate({opacity:1})
                 });*/
                // setTimeout(function(){
                //     $('.content-box').css({'background':'url(../../template/img/login/plice-flower.png) no-repeat','background-size':'8.31rem 7.57rem'});
                //     $('.logo-con-top').animate({'margin-top':'-0.65rem'},750)
                //     $('.logn-con-bottom, .input-con, .login-btn').animate({opacity:1},3000)
                // },4000)
                //默认记住用户名
                $scope.isSaveUsr = true;
                $scope.loginContent = "欢迎登录智慧安防社区系统";

                ////切换登录方式
                //$scope.goUkeyModel = function(){
                //    $("#webcontant").hide();
                //    $("#ukeycontant").show();
                //    $("#ukeysrc").attr("src","template/img/login/checked.png")
                //    $("#websrc").attr("src","template/img/login/unchecked.png")
                //};
                //
                //$scope.goWebModel = function(){
                //    $("#ukeycontant").hide();
                //    $("#webcontant").show();
                //    $("#websrc").attr("src","template/img/login/checked.png")
                //    $("#ukeysrc").attr("src","template/img/login/unchecked.png")
                //
                //};
                var localUsername = loginService.getLocalUsr();

                $scope.username = localUsername || "";
                $scope.password = "";

                if (navigator.userAgent && navigator.userAgent.indexOf("MSIE 9.0") > -1) {
                    $scope.username = "请输入用户名";
                    $scope.password = "请输入密码";
                }

                $scope.loginFocus = function (flag) {
                    if (navigator.userAgent && navigator.userAgent.indexOf("MSIE 9.0") > -1) {
                        if (flag == "user" && $scope.username == "请输入用户名") {
                            $scope.username = "";
                        } else if (flag == "pwd" && $scope.password == "请输入密码") {
                            $scope.password = "";
                        }
                    }
                    if (flag == "pwd") {
                        $(".pwd .login-text").attr("type", "password");
                    }
                };

                $scope.loginBlur = function (flag) {
                    if (navigator.userAgent && navigator.userAgent.indexOf("MSIE 9.0") > -1) {
                        if (flag == "user" && !$scope.username) {
                            $scope.username = "请输入用户名";
                        } else if (flag == "pwd" && !$scope.password) {
                            $scope.password = "请输入密码";
                        }
                    }
                    if (flag == "pwd" && $scope.password == "请输入密码") {
                        $(".pwd .login-text").attr("type", "text");
                    }
                };


                $scope.goWebLogin = function () {
                    if ($scope.username.trim() === '' || $scope.username == "请输入用户名") {
                        notify.warn('请填写正确的用户名！');
                        return;
                    }
                    if ($scope.password.trim() === '' || $scope.password == "请输入密码") {
                        notify.warn('密码不为空！');
                        return;
                    }
                    var promise = loginService.userLogin($scope.username, $scope.password);

                    promise.then(function (data) {

                        if (data.data.status == 'success') {
                            if ($scope.isSaveUsr) {
                                loginService.saveUsrToLocal($scope.username);
                            }
                            loginService.saveUserName(data.data.user)
                            //var theme = data.user.userTheme || 'default';
                            var theme = data.data.user.userTheme || 'default';
                            //var theme = 'dark';

                            sessionStorage.setItem('theme', theme);
                            window.setTheme(theme);

                            var $canvas = document.createElement('canvas')
                                , $context = $canvas.getContext('2d');
                            $canvas.width = 400;
                            $canvas.height = 200;
                            $context.globalAlpha = 0.25;
                            $context.rotate(-Math.PI / 6);
                            $context.font = "20px Arial";
                            $context.fillStyle = '#7a7a7a';
                            var waterprintStr = '';
                            if (data.data && data.data.user) {
//                              waterprintStr = (data.user.policeNo || '') + ' ' + (data.data.staffName || '') + ' ' + (data.data.idcardNo || '');
                                waterprintStr = (data.data.user.orgName || '') + ' ' + (data.data.user.showName || '');
                            }
                            $context.fillText(waterprintStr, -30, 170);
                            sessionStorage.removeItem('waterprint');
                            sessionStorage.setItem('waterprint', '.waterprint{background-image:url("' + $canvas.toDataURL() + '")}');
                            window.setWaterPrint();
                            setTimeout(function () {
                                //重新登录不需要保存首页模式状态
                                sessionStorage.removeItem("isCurrentModule");
                                //location.href = "#/index/home/";
                                location.href = "#/index/communityPanel/";
                            }, 1);
                        } else {
                            notify.error(data.data.status)
                        }
                    }).catch(function () {

                    }).finally(function () {

                    });
                };

                $scope.saveUsrName = function () {
                    if ($scope.isSaveUsr) {
                        $(".checkbox").removeClass("checked");
                        $scope.isSaveUsr = false;
                        localStorage.removeItem("currentSaveUsr");
                    } else {
                        $(".checkbox").addClass("checked");
                        $scope.isSaveUsr = true;
                    }
                };

                $scope.keyEnter = function (e) {
                    var keyCode = window.event ? e.keyCode : e.which;
                    if (keyCode == 13) {
                        $scope.goWebLogin();
                    }
                };
            }
        ];

        return loginCtrl;
    });
