/**
 * Created by Administrator on 2016/4/18.
 */
define(['controllers/controllers', 'jquery', 'config/configFile', 'layer', 'notify', 'moment'],
	function(controllers, $, configFile, layer, notify, moment) {
		var navigationCtrl = ['$scope', '$http','$rootScope', '$state', '$stateParams','loginService', 'orgService', '$compile', '$interval', '$timeout',
			function($scope, $http,$rootScope, $state, $stateParams, loginService, orgService, $compile,

				$interval, $timeout) {
				$scope.themeOptions = {
					list: ['default', 'dark'],
					current: sessionStorage.getItem('theme') || 'default',
					mask: function(masking) {
						$(document.body).toggleClass('masking', masking);
					},
					change: function(theme) {
						var self = this;
						if(self.current !== theme) {
							self.mask(true);
							loginService.changeTheme(theme)
								.success(function() {
									self.current = theme;
									window.setTheme(theme, false);
									$rootScope.$broadcast('themeChange', theme);
									setTimeout(function() {
										self.mask(false);
									}, 500);
								});
						}
					}
				};

				$scope.user = loginService.getUser().name;
				$scope.currentTime = moment().format('HH:mm:ss');
				$scope.currentSaveUsr=loginService.getLocalUsr();
				//设置定时器
				var showTime = $interval(function() {
					$scope.currentTime = moment().format('HH:mm:ss');
				}, 1000);

				var weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				var day = new Date().getDay();
				$scope.currentWeek = weekList[day];
				$scope.currentDay = moment().format('YYYY-MM-DD');

				$scope.msg = "确定要退出【奉贤智能安防系统】吗？";
				//退出登录弹出框
				var logOut = '';
				$scope.logout = function() {
					logOut = layer.open({
						type: 1,
						title: ' ',
						shadeClose: true,
						maxmin: false,
						area: ['4.1rem', '2.84rem'],
						content: '',
						success: function(layero) { //层销毁后触发的回调
							angular.element(layero).find('.layui-layer-content').append($compile

								($('#layer-login-out').html())($scope));
						},
						yes: function(index, layero) {
							$scope.msg = "确定要退出【智慧安防社区系统】吗？";

						},
						cancel: function(index, layero) {
							$scope.msg = "确定要退出【智慧安防社区系统】吗？";
							layer.close(logOut);
						}
					});
				};

				$scope.initMenuIndex = 0;
				//获取总的菜单
				var menuList = loginService.getUserName().menuList;
				orgService.listMenuTree().then(function(resp) {
					debugger;
					if(resp.resultCode == 200) {
						$scope.navigationList = getTreeName(resp.data, menuList);
						angular.forEach($scope.navigationList, function(item) {
							var id="";
							if(item.menuName=="人脸识别"){
								id='eye';
							}
							if(item.menuName=="碰撞分析"){
								id='judge';
							}
							if(item.menuName=="轨迹刻画"){
								id='track';
							}
							if(item.menuName=="落脚点分析"){
								id='destination';
							}
							if(item.menuName=="人员分析"){
								id='person';
							}
							if(item.menuName=="异常发现"){
								id='person';
							}
							if(item.menuName=="平台管理"){
								id='person';
							}
						    item.children.id=id
						});
						$timeout(function() {
							$scope.initNavigation();
						   $rootScope.$on('$stateChangeSuccess', function () {
				              stateChange();
				              });
				           stateChange();
						}, 100);

					}
				}).catch(function() {}).finally(function() {});
				//c从总菜单上查找该用户权限的菜单			
				function getTreeName(layer, val) {
					//if (!layer || !layer.length) return;
					var newLayer = [];
					for(var i = 0, len = layer.length; i < len; i++) {
						var children = layer[i].children;
						if(children && children.length > 0) {
							layer[i].children = getTreeName(children, val);
							if(layer[i].children.length == 0) {
								var flag1 = false;
								for(var k = 0; k < val.length; k++) {
									if(val[k].menuCode == layer[i].menuCode) {
										flag1 = true;
									}
								}
								if(flag1) {
									newLayer.push(layer[i]);
								}
							} else {
								newLayer.push(layer[i]);
							}
						} else {
							var flag2 = false;
							for(var k = 0; k < val.length; k++) {
								if(val[k].menuCode == layer[i].menuCode) {
									flag2 = true;
								}
							}
							if(flag2) {
								newLayer.push(layer[i]);
							}
						}
					}
					return newLayer;
				}
				//进行页面的跳转
				$scope.changePage = function(index) {
					$scope.initMenuIndex = index;
					var href = $scope.navigationList[index]['menuUrl'];
					if(10 == index) {
						window.open(href);
						return;
					}
					location.href = href;
				};

				//三级页面跳转
				$scope.gotoSecondMenu = function(second) {
					location.href = second['menuUrl']; 
				};
				var stateChange = function() {
					debugger
					var href = location.hash;
					var nav = _.find($scope.navigationList, function(nav) {
						if(nav.menuUrl==href) {
							return true;
						} else if(nav.children) {
							var second = _.find(nav.children, function(d) {
								return d.menuUrl==href;
							});
							if(!!second) {
								return true;
							}
						}
						
						return false;
					});
					var id=0;
                    for(var i=0;i<$scope.navigationList.length;i++){
                    	if($scope.navigationList[i].menuCode==nav.menuCode){
                    		id=i;
                    	}
                    }
					if(!!nav) {
						$scope.initMenuIndex =id;
					}
				};

				var errNum = 0;
                $scope.loginLayer=null;
                $scope.openLog=function(){
                	debugger
                	$scope.loginLayer = layer.open({
						type: 1,
						title: '',
						maxmin: false,
						area: ['3rem','2rem'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-login-out').html())($scope));
	
						},
						end: function() { //层销毁后触发的回调

						},
						yes: function(index, layero) { //确定
							//do something
						},
						cancel: function(index, layero) { //取消
							//do something
						}
					});
                }
				//退出登录
				$scope.goLogOut = function() {
                    $http.get('/zhsq/system/logout?account=admin').then(function(resp){
                    	debugger
                         if(resp.data.resultCode == 200 && resp.data.data.status=='success'){
                          layer.close($scope.loginLayer);
                          setTimeout(function(){
                          	window.location.href = "/#/index/login/";
                          },200)
                         }
                    }).catch(function() {}).finally(function() {});
					// if(errNum == 0) {
					// 	var promise = loginService.logOut();
					// 	promise.then(function(data) {
					// 		if(data.resultCode == 200) {
					// 			layer.close(logOut);
					// 			//用户注销后删除session
					// 			sessionStorage.removeItem("USER");
					// 			window.location.href = "/#/index/login/";
					// 		} else {
					// 			$scope.msg = data.resultMessage;
					// 			errNum++;
					// 		}
					// } else {
					// 	layer.close(loginLayer);
					// 	window.location.href = "/#/index/login/";
					// }
				};

				//取消退出登录
				$scope.closeOut = function() {
					layer.close($scope.loginLayer);
				};

				$scope.$on('$destroy', function() {
					clearInterval(showTime);
				});

				$scope.secondLists = [];
				//鼠标悬浮在一级菜单上，展示二级菜单
				$scope.showSecondMenus = function(navigation) {
					$scope.secondLists = _.find($scope.navigationList, function(nav) {
						return nav.menuCode == navigation.menuCode;
					})['children'];
				};
				/*
				 * 初始化菜单逻辑
				 * 主导航hover事件
				 * 出现整个菜单栏
				 */
				$scope.initNavigation = function() {
					var hoverStatus = 0,
						hoverMenuIndex = 0,
						hover_t_nav = "";
					var navTop = $(".navigation-v3");
					var navDown = $('.navigation-down-new');
					//var playerObj = $('object');
					navTop.on('mouseover', function(e) {
						hoverStatus = 1;
						var target = e.target;
						if(target.nodeName.toLowerCase() != "a") {
							return;
						}
						var hoverTarget = $(target).parents("li");
						var targetLeft = hoverTarget.offset().left;
						var menuTarget;
						hoverMenuIndex = hoverTarget.index();
						hoverMenuIndex = hoverMenuIndex < 0 ? 0 : hoverMenuIndex;
						//hover_t_nav = hoverTarget.attr("_t_nav");
						var firstSecondMenu = $scope.navigationList[hoverMenuIndex]['children'] && $scope.navigationList[hoverMenuIndex]['children']['id'];
						if(!firstSecondMenu) {
							navDown.stop().slideUp(100);
							if(!!$('.homeMain')) {
								$('.homeMain').css({
									'margin-top': '0'
								});
							}
							return;
						} else {
							$("input").blur();
						}
						hover_t_nav = firstSecondMenu;
						menuTarget = $("#" + hover_t_nav);
						hoverTarget.addClass("active").siblings().removeClass("active");
						menuTarget.addClass("active").css('marginLeft', (targetLeft - 3) + 'px').siblings

						().removeClass("active");
						/*if (/!*hover_t_nav == "home" || *!/hover_t_nav == "data") { // 首页与数据仓版块无

内容，不展示下拉菜单
                         navDown.stop().slideUp(100);
                         return;
                         } else {
                         //规避input框光标问题
                         $("input").blur();
                         }*/
						if(!!$('.homeMain')) {
							$('.homeMain').css({
								'margin-top': '100px'
							});
						}
						navDown.stop().slideDown(100);
					}).on("mouseleave", function(e) {
						e.stopPropagation();
						navTop.find("li").removeClass("active");
						navDown.stop(true, true).slideUp(100);
						if(!!$('.homeMain')) {
							$('.homeMain').css({
								'margin-top': '0'
							});
						}
					});
					navDown.on("mouseover", ".menu-1", function(e) {
						var _this = $(this),
							_t_nav = _this.attr("id");
						navTop.find("." + _t_nav).addClass("active").siblings().removeClass("active");
						e.stopPropagation();
						$(this).addClass("active").siblings().removeClass("active");
					}).on('mouseleave', function() {
						hoverStatus = 0;
					}).on("mouseleave", ".menu-1", function() {
						$(this).removeClass("active");
					})
				};

				/*$scope.initSessionTime = 0;

                 $scope.themeOptions = {
                 list: ['default', 'dark'],
                 current: sessionStorage.getItem('theme') || 'default',
                 mask: function (masking) {
                 $(document.body).toggleClass('masking', masking);
                 },
                 change: function (theme) {
                 var self = this;
                 if (self.current !== theme) {
                 self.mask(true);
                 loginService.changeTheme(theme)
                 .success(function () {
                 self.current = theme;
                 window.setTheme(theme, false);
                 $rootScope.$broadcast('themeChange', theme);
                 setTimeout(function () {
                 self.mask(false);
                 }, 500);
                 });
                 }
                 }
                 };

                 //今日访问量
                 $scope.todayLoginInfo = {
                 count: "",
                 maxSessionTime: 1800
                 };
                 $scope.getLoginCountIntervaler = null;

                 // 从session 获取user信息
                 $scope.userInfo = JSON.parse(sessionStorage.getItem("USER"));
                 if (!$scope.userInfo) {
                 window.location.href = "#/index/login/";
                 }

                 /!*getSecondLists（）
                 * 鼠标悬浮，触发数据更新，更改$scope.secondLists
                 * *!/
                 // 菜单初始化
                 var menuListNew = [];
                 $scope.initNav = function () {
                 var list = $scope.userInfo && $scope.userInfo.menuList || [];
                 //list.push({menuId: 76});
                 menuListNew.push(configFile.navigationList[0]); //添加首页,
                 _.each(configFile.navigationList, function (menu) {
                 var menuTemp = _.clone(menu);
                 var isContains = _.find(list, function (obj) {
                 return obj.menuId == menuTemp.menuId;
                 });
                 if (!!isContains) { // 先获取对应的一级菜单
                 var secondMenuLists = [];
                 _.each(menu.secondMenuList, function (second) { // 遍历二级菜单
                 var isFind = _.find(list, function (tar) {
                 return second.menuId == tar.menuId;
                 });
                 if (!!isFind) { // 已包含二级菜单
                 var ThirdMenuLists = [];
                 if (second.hasThirdMenu) { // 如果包含三级菜单，则遍历
                 second.hasThird = true;
                 _.each(second.thirdMenuList, function (third) {
                 var hasThird = _.find(list, function (ele) {
                 return third.menuId == ele.menuId;
                 });
                 if (!!hasThird) {
                 ThirdMenuLists.push(third);
                 }
                 });
                 var thirdMenuListsLength = ThirdMenuLists.length,
                 perBlock = 7,
                 blockNum = Math.ceil(thirdMenuListsLength / perBlock);
                 var thirdWithBlock = [];
                 for (var i = 0, l = blockNum; i < l; i++) {
                 var blockData = ThirdMenuLists.splice(0, perBlock);
                 thirdWithBlock.push(blockData);
                 }
                 second.menuBlocks = thirdWithBlock;
                 }
                 secondMenuLists.push(second);
                 }
                 });
                 menuTemp.data = secondMenuLists;
                 menuListNew.push(menuTemp);
                 }
                 });
                 };
                 $scope.initNav();
                 $scope.getSecondLists = function (index) {
                 $scope.secondLists = menuListNew[index];
                 };
                 //菜单配置
                 $scope.navigationList = menuListNew || [];
                 sessionStorage.removeItem('navigationList');
                 sessionStorage.setItem('navigationList', JSON.stringify(menuListNew));

                 //对当前的路径进行解析
                 var id = location.hash.split('/')[2];
                 // 特殊页面id改写
                 var cloudArr = ['statistic', 'vehicle-statistic', 'case-statistic'];
                 if (_.contains(cloudArr, id)) {
                 id = 'cloud';
                 }
                 var arr = ['log', 'bwList', 'system', 'setcollision', 'sysConfig', 'sysParam', 

'mapManagement','faceManagement'];
                 if (_.contains(arr, id)) {
                 id = 'platform';
                 }

                 if (id === 'tacticsList') {
                 id = 'judge';
                 }

                 var currentModule = _.find($scope.navigationList, function (obj) {
                 return obj.id == id;
                 });

                 var initIndex = _.indexOf($scope.navigationList, currentModule);

                 //默认首页落脚点
                 $scope.currentModuleID = (currentModule && currentModule.id) || $scope.navigationList

[0].id;


                 var sex = loginService.getUser() && loginService.getUser().sex;
                 if (sex == '1') {
                 $('.head-img .head').addClass('isWoman');
                 }

                 //默认二级菜单为第一个
                 $scope.initMenuIndex = initIndex || 0;
                 $scope.initSecondMenuIndex = 0;
                 $scope.preSecondMenuIndex = 0;
                 $scope.secondMenuList = (currentModule && currentModule.secondMenuList) || 

$scope.navigationList[0].secondMenuList;

                 //监听路径url的变化
                 $rootScope.$watch('navigator', function (newValue, oldValue, rootScope) {
                 if (!newValue) {
                 return;
                 }

                 //路由发生变化重置session时间
                 $scope.initSessionTime = 0;

                 var allMenuList = [];
                 var secondList = _.flatten(_.filter(_.pluck($scope.navigationList, 'secondMenuList'), 

function (menu) {
                 return menu.length > 0;
                 }));
                 var thirdList = _.flatten(_.compact(_.pluck(secondList, 'thirdMenuList')));
                 allMenuList = secondList.concat(thirdList);
                 var targetMenu = _.find(allMenuList, function (menu) {
                 return menu.menuId == newValue;
                 });

                 if (!!targetMenu) {
                 //location.href = targetMenu.href;
                 $scope.setMenuBg(targetMenu.hasThird, targetMenu.href);
                 //菜单配置
                 rootScope.navigator = null;
                 }

                 });
                 // 监听路由变化
                 $rootScope.$on('$stateChangeSuccess', function () { // 模板解析完成后触发
                 var href = location.hash;
                 var id = href.split('/')[2];
                 // 特殊页面id改写
                 var cloudArr = ['statistic', 'vehicle-statistic', 'case-statistic'];
                 if (_.contains(cloudArr, id)) {
                 id = 'cloud';
                 }
                 var arr = ['log', 'bwList', 'system', 'setcollision', 'sysConfig', 'sysParam', 

'mapManagement','faceManagement'];
                 if (_.contains(arr, id)) {
                 id = 'platform';
                 }
                 if (id === 'tacticsList') {
                 id = 'judge';
                 }
                 $('.navigation-v3 ul').find("." + id).addClass('navUpSelectedInPage').siblings

().removeClass('navUpSelectedInPage');
                 });

                 //从二级菜单或者三级菜单中调到相应的页面
                 $scope.goNext = function (navigation, secondMenu, thirdMenu) {
                 var index = 0;
                 if (navigation.id == $scope.navigationList[0].id) {
                 window.location.href = "#/index/home/" + secondMenu.name;
                 }
                 $scope.initMenuIndex = index;
                 };

                 $scope.getOverMenuIndex = function (index) {
                 $scope.overMenuIndex = index;
                 if ($scope.overMenuIndex != $scope.initMenuIndex) {
                 $scope.initSecondMenuIndex = -1;
                 } else {
                 $scope.initSecondMenuIndex = $scope.preSecondMenuIndex;
                 }
                 };

                 /!*
                 * 点击菜单切换模块
                 *!/
                 $scope.loadCurrentArea = function (index, id) {
                 $('.navigation-v3 ul li.navUpSelectedInPage').removeClass('navUpSelectedInPage');
                 $scope.initSecondMenuIndex = 0;
                 $scope.initMenuIndex = index;
                 $scope.secondMenuList = $scope.navigationList[index].secondMenuList;
                 /!*_.each(configFile.navigationList, function (navi, ind) {
                 if (navi.id == id) {
                 index = ind;
                 return;
                 }
                 });*!/
                 $scope.switchModule(index);
                 if (index == 0) {
                 $('.navigation-v3 ul li:first-child').addClass('navUpSelectedInPage');
                 }
                 };

                 $scope.getDefaultMenu = function (index) {
                 var fatherMenu = $scope.navigationList[index] || {};
                 var secondMenuList = fatherMenu.data || [];
                 var defaultMenu = "";
                 var defaultMenuUrl = "#/index";
                 if (fatherMenu.name == "平台管理") {
                 defaultMenuUrl = "#/index/platform/1";
                 return defaultMenuUrl;
                 }
                 //如果二级菜单存在，则找二级菜单的第一个菜单
                 if (secondMenuList.length > 0) {
                 defaultMenu = secondMenuList[0];
                 //如果存在三级菜单，则继续找三级菜单的第一个菜单
                 if (!defaultMenu.hasThirdMenu) {
                 defaultMenuUrl = defaultMenu.href;
                 } else {
                 var thirdMenuList = defaultMenu.menuBlocks || [];
                 if (thirdMenuList.length > 0) {
                 defaultMenuUrl = thirdMenuList[0][0].href;
                 }
                 }
                 } else {
                 defaultMenuUrl = "#/index/data/";
                 }
                 return defaultMenuUrl;
                 };

                 $scope.switchModule = function (index) {
                 var href = '#/index';
                 if (0 === index) {
                 //不保存首页模式状态
                 if (location.href && location.href.indexOf("/index/home/") == -1) {
                 // sessionStorage.removeItem("isCurrentModule");
                 }
                 href = "#/index/home/";
                 } else {
                 href = $scope.getDefaultMenu(index);
                 }
                 window.location.href = href;
                 //重置session时间
                 $scope.initSessionTime = 0;
                 $('.navigation-down-new').slideUp(300);
                 };

                 /!*
                 * 初始化菜单逻辑
                 * 主导航hover事件
                 * 出现整个菜单栏
                 *!/
                 $scope.initNavigation = function () {
                 var hoverStatus = 0,
                 hoverMenuIndex = 0,
                 hover_t_nav = "";
                 var navTop = $(".navigation-v3");
                 var navDown = $('.navigation-down-new');


                 navTop.on('mouseover', function (e) {
                 hoverStatus = 1;
                 var target = e.target;
                 if (target.nodeName.toLowerCase() != "a") {
                 return;
                 }
                 var hoverTarget = $(target).parents("li");
                 var targetLeft = hoverTarget.offset().left;
                 var menuTarget;
                 hoverMenuIndex = hoverTarget.index();
                 hoverMenuIndex = hoverMenuIndex < 0 ? 0 : hoverMenuIndex;
                 hover_t_nav = hoverTarget.attr("_t_nav");
                 menuTarget = $("#" + hover_t_nav);
                 hoverTarget.addClass("active").siblings().removeClass("active");
                 menuTarget.addClass("active").css('marginLeft', (targetLeft - 3) + 'px').siblings

().removeClass("active");
                 if (hover_t_nav == "home" || hover_t_nav == "data") { // 首页与数据仓版块无内容，不展示下

拉菜单
                 navDown.stop().slideUp(300);
                 return;
                 } else {
                 var inputList = [];
                 var firstValue = "";
                 var secondValue = "";
                 var secondStartTime = "";
                 var secondEndTime = "";
                 if (location.href.indexOf("/search/pan/") != -1) {
                 inputList = $("input");
                 if (inputList.length > 2) {
                 firstValue = inputList[0].value;
                 secondValue = inputList[1].value;
                 }
                 secondStartTime = $("#secondStartTime") && $("#secondStartTime")[0].value;
                 secondEndTime = $("#secondEndTime") && $("#secondEndTime")[0].value;
                 }
                 //规避input框光标问题
                 $("input").blur();
                 //判断如果当前模块是条件搜索，菜单下拉时清空时间控件值
                 if (location.href.indexOf("/search/pan/") != -1) {
                 if (!firstValue) {
                 inputList[0].value = "";
                 }
                 if (!secondValue) {
                 inputList[1].value = "";
                 }
                 if (!secondStartTime) {
                 $("#secondStartTime")[0].value = "";
                 }
                 if (!secondEndTime) {
                 $("#secondEndTime")[0].value = "";
                 }
                 }
                 }
                 navDown.stop().slideDown(300);
                 }).on("mouseleave", function (e) {
                 e.stopPropagation();
                 navTop.find("li").removeClass("active");
                 navDown.stop(true, true).slideUp(300);
                 });

                 navDown.on("mouseover", ".menu-1", function (e) {
                 var _this = $(this),
                 _t_nav = _this.attr("id");
                 navTop.find("." + _t_nav).addClass("active").siblings().removeClass("active");
                 e.stopPropagation();
                 $(this).addClass("active").siblings().removeClass("active");
                 }).on('mouseleave', function () {
                 hoverStatus = 0;
                 }).on("mouseleave", ".menu-1", function () {
                 $(this).removeClass("active");
                 })
                 };
                 // 菜单跳转
                 $scope.pageLink = function (href) {
                 var localUrl = window.location.hash ;

                 if(href===localUrl){
                 window.location.reload();
                 } else{
                 window.location.href = href;
                 }
                 //重置session时间
                 $scope.initSessionTime = 0;
                 //若当前是chrome则返回
                 var reg = /\bchrome\b/;
                 var isChrome = reg.test(navigator.userAgent.toLowerCase());
                 if (!!isChrome) {
                 return;
                 }
                 var targetUrl = '';//目标地址
                 //若是打开的是时空碰撞页面
                 if (href.indexOf('/map/collide/') > 0) {
                 targetUrl = '#/index/map/collide/';
                 } else if (href.indexOf('/map/area/') > 0) {//跳转到区域布控页面
                 targetUrl = '#/index/map/area/';
                 } else if (href.indexOf('/map/tracePortray/') > 0) {//跳转到轨迹刻画页面
                 targetUrl = '#/index/map/tracePortray/';
                 }

                 if (!!targetUrl) {
                 mapOpera.utils.open(targetUrl);
                 }
                 };
                 $scope.setMenuBg = function (hasThird, href) {
                 if (hasThird) {
                 return false;
                 }
                 var id;
                 id = href.split('/')[2];
                 // 智慧云分析
                 var cloudArr = ['statistic', 'vehicle-statistic', 'case-statistic'];
                 if (_.contains(cloudArr, id)) {
                 id = 'cloud';
                 }
                 // 平台管理
                 var arr = ['log', 'bwList', 'system', 'setcollision', 'sysConfig', 'sysParam'];
                 if (_.contains(arr, id)) {
                 id = 'platform';
                 }
                 // 战法库
                 if (id === 'tacticsList') {
                 id = 'judge';
                 }
                 $('.navigation-v3 ul').find("." + id).addClass('navUpSelectedInPage').siblings

().removeClass('navUpSelectedInPage');
                 $scope.pageLink(href);
                 $('.navigation-down-new').stop(true, true).slideUp(300);
                 };


                 //修改密码
                 $scope.user = loginService.getUser().name;
                 var updatePwd = '';
                 //修改密码弹出框
                 $scope.updpwd = function () {
                 $scope.oldpwd = "";
                 $scope.newpwd = "";
                 $scope.newpwd2 = "";
                 $scope.tishi = "";
                 $scope.tishi1 = "";
                 $scope.tishi2 = "";
                 updatePwd = layer.open({
                 type: 1,
                 title: '修改密码 ',
                 shadeClose: true,
                 maxmin: false,
                 area: ['480px', '284px'],
                 content: '',//$('#layer-pwd-update'),
                 success: function (layero) { //层销毁后触发的回调
                 angular.element(layero).find('.layui-layer-content').append($compile($('#layer-pwd-

update').html())($scope));
                 }
                 });
                 };

                 $scope.checkValueIsNull = function (index) {
                 if (0 === index) {
                 $scope.tishi = $scope.oldpwd.trim() ? "" : "原密码不为空";
                 } else if (1 === index) {
                 $scope.tishi1 = $scope.newpwd.trim() ? "" : "密码不为空或空字符";
                 if ($scope.newpwd2.trim()) {
                 if ($scope.newpwd2.trim() == $scope.newpwd.trim()) {
                 $scope.tishi2 = "";
                 } else {
                 $scope.tishi2 = "密码不一致";
                 }
                 }
                 if ($scope.newpwd.trim().length > 18) {
                 $scope.tishi1 = "密码不能超过18位";
                 }
                 } else {
                 $scope.tishi2 = "";
                 if (!$scope.newpwd2.trim()) {
                 $scope.tishi2 = "密码不为空或空字符";
                 } else if ($scope.newpwd2.trim().length > 18) {
                 $scope.tishi2 = "密码不能超过18位";
                 } else if ($scope.newpwd2.trim() != $scope.newpwd.trim()) {
                 $scope.tishi2 = "密码不一致";
                 }
                 }
                 };

                 //修改密码
                 $scope.gochangePwd = function () {
                 var oldpwd = $scope.oldpwd.trim();
                 var newpwd = $scope.newpwd.trim();
                 var newpwd2 = $scope.newpwd2.trim();
                 if (!oldpwd) {
                 $scope.tishi = "原密码不为空";
                 return;
                 } else if (newpwd != newpwd2) {
                 $scope.tishi2 = "密码不一致";
                 return;
                 } else if (!newpwd) {
                 $scope.tishi1 = "密码不为空或空字符";
                 return;
                 } else if (!newpwd2) {
                 $scope.tishi2 = "密码不为空或空字符";
                 return;
                 } else if (newpwd.length > 18) {
                 $scope.tishi2 = "密码不能超过18位";
                 return;
                 } else {
                 var promise = loginService.changePwd(oldpwd, newpwd, newpwd2);
                 promise.then(function (data) {
                 if (data.resultCode == 200) {
                 notify.success("修改成功");
                 layer.close(updatePwd);
                 } else {
                 notify.error(data.resultMessage);
                 }
                 }).catch(function () {

                 }).finally(function () {
                 });
                 }
                 };

                 $scope.msg = "确定要退出【公安大数据平台】吗？";
                 //退出登录弹出框
                 var logOut = '';
                 $scope.logout = function () {
                 logOut = layer.open({
                 type: 1,
                 title: ' ',
                 shadeClose: true,
                 maxmin: false,
                 area: ['410px', '284px'],
                 content: '',
                 success: function (layero) { //层销毁后触发的回调
                 angular.element(layero).find('.layui-layer-content').append($compile($('#layer-login-

out').html())($scope));
                 },
                 yes: function (index, layero) {
                 $scope.msg = "确定要退出【公安大数据平台】吗？";

                 },
                 cancel: function (index, layero) {
                 $scope.msg = "确定要退出【公安大数据平台】吗？";
                 layer.close(logOut);
                 }
                 });
                 };


                 $("#outform").closest(".layui-layer-content").next(".layui-layer-setwin").on("click", 

function () {
                 alert($("#outform").closest(".layui-layer").has(".layui-layer-setwin"));
                 });

                 var errNum = 0;
                 //退出登录
                 $scope.goLogOut = function () {
                 if (errNum == 0) {
                 var promise = loginService.logOut();
                 promise.then(function (data) {
                 if (data.resultCode == 200) {
                 layer.close(logOut);
                 //用户注销后删除session
                 sessionStorage.removeItem("USER");

                 clearInterval($scope.checkSessionIntervaler);
                 $scope.checkSessionIntervaler = null;
                 window.location.href = "/#/index/login/";
                 } else {
                 $scope.msg = data.resultMessage;
                 errNum++;
                 }
                 }).catch(function () {

                 }).finally(function () {

                 });
                 } else {
                 layer.close(logOut);
                 window.location.href = "/#/index/login/";
                 }
                 };

                 //取消退出登录
                 $scope.closeOut = function () {
                 layer.close(logOut);
                 };

                 /!**
                 * 当前在线人数
                 *!/
                 $scope.getOnlinePeopleNum = function () {
                 //如果用户没有登录则不执行
                 var userInfo = JSON.parse(sessionStorage.getItem("USER"));
                 if (!userInfo) {
                 return;
                 }
                 var promise = loginService.getOnlinePeopleNum();
                 promise.then(function (data) {
                 if (data && data.resultCode == "200") {
                 $scope.todayLoginInfo.count = "当前在线人数：" + data.data.onlinePeopleNum;
                 //获取session超时时间，如果没有或者为0则默认半个小时
                 if (data.data.maxSessionTimeOut != "" && data.data.maxSessionTimeOut != "0") {
                 $scope.todayLoginInfo.maxSessionTime = parseInt(data.data.maxSessionTimeOut);
                 }
                 }
                 });
                 };

                 /!*
                 * 实时预警
                 *
                 *!/
                 $scope.getWarningInfo = function () {
                 //如果用户没有登录则不执行
                 var userInfo = JSON.parse(sessionStorage.getItem("USER"));
                 if (!userInfo) {
                 return;
                 }
                 var promise = loginService.readWarning();
                 promise.then(function (data) {
                 //规避登录成功后立刻注销预警提示问题
                 var userInfo = JSON.parse(sessionStorage.getItem("USER"));
                 if (!userInfo) {
                 return;
                 }
                 if (data.data && data.resultCode == "200") {
                 layer.msg('<h2>预警' + '</h2>' + '' + data.data.createTime + ' ' + data.data.content + '', 

{
                 offset: 'rb',
                 time: 0,
                 maxWidth: 280
                 , btn: ['确定']
                 , yes: function (index) {
                 layer.close(index);
                 var promise = loginService.updateRead(data.data.id);
                 promise.then(function (result) {
                 if (result.resultCode == "200") {
                 } else {
                 notify.error(data.resultMessage);
                 }
                 }).catch(function () {

                 }).finally(function () {
                 });
                 }
                 });
                 } else {
                 return;
                 }
                 });
                 };

                 //取消修改
                 $scope.cancelPwd = function () {
                 layer.close(updatePwd);
                 };

                 $scope.watchSessionPeriod = function () {
                 //创建session定时器，session超时自动跳转登录页面
                 $scope.checkSessionIntervaler = setInterval(function () {
                 $scope.initSessionTime += 1;
                 //大于的情况存在于临时修改session时间小于之前的session时间
                 if ($scope.initSessionTime >= $scope.todayLoginInfo.maxSessionTime) {
                 notify.error("登录已超时！");
                 loginService.logOut().then(function () {
                 //用户注销后删除session
                 sessionStorage.removeItem("USER");
                 window.location.href = "/#/index/login/";
                 });
                 }
                 }, 1000);
                 };

                 window.onhashchange = function () {
                 //规避浏览器back回退layer层不关闭问题
                 window.layer && window.layer.closeAll();
                 };

                 //菜单初始化
                 $scope.initNavigation();
                 //获取预警信息
                 $scope.getWarningInfo();
                 $scope.runWarnIntervaler = setInterval(function () {
                 $scope.getWarningInfo();
                 }, 300000);

                 //获取今日访问总量
                 $scope.getOnlinePeopleNum();
                 $scope.getLoginCountIntervaler = setInterval(function () {
                 $scope.getOnlinePeopleNum();
                 }, 30000);

                 //监听session是否超时
                 $scope.watchSessionPeriod();

                 $scope.$on("$destroy", function () {
                 clearInterval($scope.getLoginCountIntervaler);
                 clearInterval($scope.runWarnIntervaler);
                 clearInterval($scope.checkSessionIntervaler);
                 clearInterval($scope.runAlarmIntervaler);
                 $scope.getLoginCountIntervaler = null;
                 $scope.runWarnIntervaler = null;
                 $scope.checkSessionIntervaler = null;
                 $scope.runAlarmIntervaler = null;
                 });

                 // 表头固定
                 window.tableHeadFixed = $scope.tableHeadFixed = function (container, tableClassName) {
                 var $table = container,
                 $tableHead,
                 tableHeadInfo,
                 tbClass,
                 scrollTop = 0,
                 navHeight = 50;

                 tbClass = tableClassName || 'table table-base';
                 if ($table.find('thead').length) {
                 $tableHead = $table.find('thead');
                 } else {
                 $tableHead = $table.find('tr').eq(0);
                 }
                 tableHeadInfo = {
                 width: $tableHead.width(),
                 height: $tableHead.height(),
                 left: $tableHead.offset().left,
                 top: $tableHead.offset().top
                 };
                 $(document).on('scroll', function () {
                 scrollTop = $(window).scrollTop();
                 var $fixedTable = $('<div class="fixedTable">');
                 var isFixed = (scrollTop + navHeight >= tableHeadInfo.top);
                 if (!container.is(':visible')) {
                 return false;
                 }
                 if (isFixed) {
                 if ($('.fixedTable') && $('.fixedTable').length) {
                 return false;
                 }
                 $fixedTable.css({
                 position: 'fixed',
                 width: tableHeadInfo.width,
                 height: tableHeadInfo.height,
                 left: tableHeadInfo.left,
                 top: navHeight,
                 zIndex: 100
                 });
                 $fixedTable.append('<table></table>');
                 (tbClass === 'resourceTable') ? ($fixedTable.find('table').html($tableHead.clone()).css

('width', tableHeadInfo.width + 'px').attr('class', tbClass)):($fixedTable.find('table').html

($tableHead.clone()).attr('width', tableHeadInfo.width).attr('class', tbClass));
                 $fixedTable.find('th').each(function () {
                 var $_ = $(this),
                 index = $_.index(),
                 width = 0,
                 $ths;
                 ($tableHead.find('th').length > 0) ? ($ths = $tableHead.find('th')) : ($ths = 

$tableHead.find('td'));
                 width = $ths.eq(index).width();
                 $_.attr('width', width);
                 });
                 $tableHead.css('visibility', 'hidden');
                 if ($('.body').length) {
                 $('.body').append($fixedTable);
                 } else {
                 $('[ui-view="main"]').append($fixedTable);
                 }
                 $fixedTable.on('click',function (e) {
                 var target = e.target,
                 $t = $(target),
                 nodeName = target.nodeName.toLowerCase(),
                 isCheck = function () {
                 return nodeName === 'a' && $t.hasClass('checkbox');
                 };
                 if(isCheck()){
                 container.find('.checkall').click();
                 }
                 });
                 container.on('click','a.checkbox',function () {
                 $fixedTable.find('.checkbox').attr('class',$(this).parents('table').find('.checkall').get

(0).className);
                 });
                 } else {
                 if (!$('.fixedTable').length) {
                 return false;
                 }
                 $tableHead.css('visibility', 'visible');
                 $('.fixedTable').remove();
                 }
                 });
                 };

                 $scope.theme = sessionStorage.getItem('theme') || 'default';
                 $scope.$on('themeChange', function (e, theme) {
                 $scope.theme = theme;
                 $scope.initTxHeader($scope.theme);
                 });

                 //切换头像
                 $scope.headPortrait = loginService.getUser() && loginService.getUser().headPortrait;
                 $scope.initTxHeader = function(theme){

                 $scope.headPortrait = loginService.getUser() && loginService.getUser().headPortrait;
                 if ($scope.headPortrait) {
                 $("#touxiang-header").attr("src", $scope.headPortrait + "??" + Date.parse(new Date()));
                 } else {

                 if(theme === 'dark'){
                 $("#touxiang-header").attr("src", "template/img/user-dark-header-man.png?" + Date.parse

(new Date()));
                 }else {
                 $("#touxiang-header").attr("src", "template/img/user-man.png?" + Date.parse(new Date()));
                 }
                 $("#touxiang-header").closest(".touxiang").css("border","none");
                 }
                 }
                 $scope.initTxHeader($scope.theme);

                 //跳转报警配置
                 $scope.goalarm = function () {
                 window.location.href = '#/index/system/alarmConfig';
                 };


                 //定时查看报警
                 $scope.getAlarmCount = function () {
                 //如果用户没有登录则不执行
                 var userInfo = JSON.parse(sessionStorage.getItem("USER"));
                 if (!userInfo) {
                 return;
                 }
                 loginService.getAlarmCount().then(function (data) {
                 if (data.data && data.resultCode == "200") {
                 var num = data.data.num;
                 if (num > 99) {
                 $scope.alarmNum = '...'
                 } else {
                 $scope.alarmNum = num || 0;
                 }

                 } else {
                 return;
                 }
                 });
                 };
                 $scope.getAlarmCount();
                 $scope.runAlarmIntervaler = setInterval(function () {
                 $scope.getAlarmCount();
                 }, 1800000);
                 window.linkJudge = function(url) { // 链接跳转权限判断
                 var userNavLists = JSON.parse(sessionStorage.getItem('navigationList'));
                 var isContain = false;
                 if(isContain){
                 return;
                 } else{
                 userNavLists.forEach(function (first) {
                 if(first.data && first.data.length){
                 var seconds =first.data;
                 !isContain && seconds.forEach(function (second) {
                 if(!isContain && second.hasThird){
                 second.menuBlocks.forEach(function (block) {
                 if(!!isContain){
                 return;
                 }
                 block.forEach(function (third) {
                 if(!!isContain){
                 return;
                 }
                 if(url.indexOf(third.href)>-1){
                 isContain = true;
                 return;
                 }else{
                 isContain = false;
                 }
                 })
                 })
                 } else{
                 if(!!isContain){
                 return;
                 }
                 if(url.indexOf(second.href)>-1){
                 isContain = true;
                 return;
                 } else{
                 isContain = false;
                 }
                 }
                 })
                 }
                 });
                 }
                 return isContain;
                 };
                 var openWindow = window.open;
                 window.open = $scope.open = function (url) {
                 var isSpecialLists = function () {
                 var isSpecial = false;
                 var specialLists = [
                 'templateDownStream',
                 'exportOperateUserList',
                 'exportOperateList',
                 'downloadExcel',
                 'orgExport',
                 'expRelationInfo',
                 'expPeopleMap',
                 'exportCrashData',
                 'exportPDF',
                 'reportTemplate',
                 'exportPDF',
                 'exportSearchData'
                 ];
                 specialLists.forEach(function (list) {
                 if(url.indexOf(list)>-1){
                 isSpecial = true;
                 return;
                 }
                 });
                 return isSpecial;
                 };
                 if(window.linkJudge(url) || isSpecialLists()){
                 openWindow(url);
                 } else{
                 notify.warn('没有权限!');
                 }
                 };*/
			}
		];
		return navigationCtrl;
	});