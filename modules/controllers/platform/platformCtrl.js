/**
 * 用户管理
 * Created by zhurongrong on 2016/5/5.
 */
define(['controllers/controllers', 'jquery', 'layer', 'zTree', 'notify', 'config/common'],
	function(controllers, $, layer, zTree, notify, common) {
		var platformCtrl = ['$scope', '$rootScope', 'orgService', '$compile', '$timeout', '$http', '$state', '$stateParams',
			function($scope, $rootScope, orgService, $compile, $timeout, $http, $state, $stateParams) {
				var lock = false;
				$scope.loader = true;
				/*
				 * onload初始化
				 * */
				$scope.initLoad = function() {
					if(lock) {
						return;
					}
					setTimeout(function() {
						common.CheckBox($("#orgList"), function() {
							//回调方法
						});
						common.CheckBox($("#roleList"), function() {
							//回调方法
						});
						common.CheckBox($("#perList"), function() {
							//回调方法
						});

					}, 250);

					//$.fn.zTree.init($("#treeDemo"), setting, array);
					lock = true;
					// if(index===0){
					//     setTimeout(function () {
					//         tableHeadFixed($('#orgList'))
					//     },500)
					// }
				};
				/*
				 * 侧边栏
				 *
				 */
				$scope.toggleSide = function() { //侧边栏折叠展开
					var $bodyMain = $("#body").find('.body-main');
					if(!$bodyMain.hasClass("animate-margin-left")) {
						$bodyMain.addClass('animate-margin-left');
					}
					$("#body").toggleClass("side-hide");
				};
				$scope.sideItems = [ //side右侧内容切换
					{
						icon: 'icon-side-org',
						name: '机构管理',
						url: 'template/html/modules/platform/org.html'
					}, {
						icon: 'icon-side-role',
						name: '角色管理',
						url: 'template/html/modules/platform/role.html'
					}, {
						icon: 'icon-side-permission',
						name: '用户管理',
						url: 'template/html/modules/platform/permission.html'
					}
				];

				//根据传递过来的参数决定跳转到相应的子页面
				if($stateParams && $stateParams.moduleIndex) {
					var moduleIndex = $stateParams.moduleIndex;
					var arr = moduleIndex.split(',');
					$scope.moduleIndex = arr[0];
				}

				$scope.currentPage = $scope.moduleIndex || 0;
				$scope.sideChange = function(index) {
					$scope.currentPage = index;
					location.hash = '#/index/platform/' + index;
				};

				/*================机构组织===================*/
				var zTreeObj = null;
				$scope.mechanismTab = '列表结构';
				$scope.changeMechanismTab = function(flag) {
					$scope.orgListReq2.orgSearchName = '';
					$scope.orgListReq.searchName = '';
					$scope.orgListReq.currentPage = 1;
					//flag如果true 则代表对当前结构进行增删改查
					if(flag) {
						if($scope.mechanismTab == '树形结构') {
							$scope.querylistOrg();
						} else {
							$scope.queryliTreeOrg('#mechanismTree');
						}
					} else {
						if($scope.mechanismTab == '列表结构') {
							$scope.mechanismTab = '树形结构';
							$scope.querylistOrg();
						} else {
							$scope.mechanismTab = '列表结构';
							$scope.queryliTreeOrg('#mechanismTree');
						}
					}
				}
				//组织机构列表 

				//组织机构列表分页
				$scope.orgListReq2 = {
					orgSearchName: ''
				};
				$scope.orgListReq = {
					pageSize: 10,
					currentPage: 1,
					searchName: '',
					totalNum: 0
				}
				//搜索组织机构
				$scope.queryOrgName = function() {
					if($scope.mechanismTab == '列表结构') {
						$scope.queryOrgNameTree($scope.orgListReq2.orgSearchName, '#mechanismTree');
					} else {
						$scope.orgListReq.currentPage = 1;
						$scope.orgListReq.searchName = $scope.orgListReq2.orgSearchName;
						$scope.querylistOrg();
					}
				}
				$scope.querylistOrg = function() {
					var req = {
						pageSize: $scope.orgListReq.pageSize,
						currentPage: $scope.orgListReq.currentPage,
						searchName: $scope.orgListReq.searchName
					}
					orgService.getOrganizations(req).then(function(resp) {
						if(resp.resultCode == 200) {
							$scope.orgList = resp.data.list;
							$scope.orgListReq.totalNum = resp.data.totalNum;
						}
					}).catch(function() {}).finally(function() {
						$scope.loader = false;
					});
				}

				//机构组织树形图
				var settingOrg = {
					check: {
						enable: true,
						autoCheckTrigger: true
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						onClick: function(event, treeId, treeNode) {
							//父机构
							$scope.newOrg.parentName = treeNode.orgName;
							$scope.newOrg.parentId = treeNode.id;
							$scope.oldOrg.parentName = treeNode.orgName;
							$scope.oldOrg.parentId = treeNode.id;
							//所属机构
							$scope.oldUser.orgName = treeNode.orgName;
							$scope.oldUser.orgId = treeNode.id;
							$scope.newUser.orgName = treeNode.orgName;
							$scope.newUser.orgId = treeNode.id;
						}
					}
				};
				var orgTree = [];
				$scope.queryliTreeOrg = function(treeName) {
					orgService.getOrganizationTree().then(function(resp) {

						if(resp.resultCode == 200) {
							orgTree = getorgTree(resp.data);
							$.fn.zTree.init($(treeName), settingOrg, orgTree);
						}
					}).catch(function() {}).finally(function() {
						$scope.loader = false;
					});
				}

				//搜索树(通用)
				$scope.queryOrgNameTree = function(val, treeName) {
					//console.log(orgTree)$.extend([],orgTree)
					var tree = getTreeName($.extend(true, [], orgTree), val);
					$.fn.zTree.init($(treeName), settingOrg, tree);
				}
				//遍历树
				function getorgTree(layer) {
					//if (!layer || !layer.length) return;
					for(var i = 0, len = layer.length; i < len; i++) {
						layer[i].name = layer[i].orgName;
						layer[i].open = true;
						var children = layer[i].children;
						if(children && children.length > 0) {
							layer[i].children = getorgTree(children);
						}
					}
					return layer;
				}
				//遍历查询树2
				function getTreeName(layer, val) {
					//if (!layer || !layer.length) return;
					var newLayer = [];
					for(var i = 0, len = layer.length; i < len; i++) {
						var children = layer[i].children;
						if(children && children.length > 0) {
							layer[i].children = getTreeName(children, val);
							if(layer[i].children.length == 0) {
								if(layer[i].orgName.indexOf(val) !== -1) {
									newLayer.push(layer[i]);
								}
							} else {
								newLayer.push(layer[i]);
							}
						} else {
							if(layer[i].orgName.indexOf(val) !== -1) {
								newLayer.push(layer[i]);
							}
						}
					}
					return newLayer;
				}

				$scope.changeMechanismTab();

				// 新增机构
				$scope.newOrg = {
					orgCode: '',
					orgName: '',
					parentName: '',
					parentId: ''
				};
				$scope.createMechanism = function() {
					$scope.layerNewMechanism = layer.open({
						type: 1,
						title: '新增机构 ',
						maxmin: false,
						area: ['600px', '500px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-mechanism-create').html())($scope));
							$scope.newOrg.orgName = "";
							$scope.newOrg.orgCode = "";
							$scope.newOrg.parentName = "";
							$scope.newOrg.parentId = "";
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
				};

				$scope.newParentNameFocus = function() {
					$scope.queryliTreeOrg('#newOrgTree');
				}
				$scope.newParentNameKeyUp = function() {
					$scope.queryOrgNameTree($scope.newOrg.parentName, '#newOrgTree');
				}
				$scope.layerCancel = function() {
					layer.close($scope.layerNewMechanism); //关闭弹出窗
				};

				//弹出窗--确定
				$scope.orgSubmit = function() {

					if(!$scope.newOrg.orgName) {
						notify.warn('组织机构名称不为空');
						return;
					};

					if(!$scope.newOrg.parentName) {
						notify.warn('父机构名称不为空');
						return;
					};
					//					var req={
					//					orgCode:$scope.newOrg.orgCode,
					//					orgName:$scope.newOrg.orgName,				
					//                  parentId:$scope.newOrg.parentId
					//					}
					orgService.addOrganization($scope.newOrg).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('新增机构成功！');
								$scope.changeMechanismTab(true);
							} else {
								notify.error('新增机构失败');
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerNewMechanism);
					});

				};

				//修改组织机构

				$scope.oldOrg = {
					id: '',
					orgCode: '',
					orgName: '',
					parentName: '',
					parentId: ''
				};
				$scope.updateOrg = function(item) {
					$scope.layerUpdateOrg = layer.open({
						type: 1,
						title: '修改机构 ',
						maxmin: false,
						area: ['600px', '500px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-mechanism-upt').html())($scope));
							$scope.oldOrg.id = item.id;
							$scope.oldOrg.orgCode = item.orgCode;
							$scope.oldOrg.orgName = item.orgName;
							$scope.oldOrg.parentName = item.parentName;
							$scope.oldOrg.parentId = item.parentId;
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
				};

				$scope.oldParentNameFocus = function() {
					$scope.queryliTreeOrg('#oldOrgTree');
				}
				$scope.oldParentNameKeyUp = function() {
					$scope.queryOrgNameTree($scope.oldOrg.parentName, '#oldOrgTree');
				}
				$scope.updateOrgTrue = function() {
					if(!$scope.oldOrg.orgName) {
						notify.warn('组织机构名称不为空');
						return;
					};

					if(!$scope.oldOrg.parentName) {
						notify.warn('上级机构名称不为空');
						return;
					};
					orgService.updateOrganization($scope.oldOrg).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('修改机构成功！');
								$timeout(function() {
									$scope.changeMechanismTab(true);
								}, 100);

							} else {
								notify.error('修改机构失败');
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerUpdateOrg);
					});
				};

				$scope.updateOrgCancel = function() {
					layer.close($scope.layerUpdateOrg);
				};

				// 删除 组织机构
				$scope.delOrg = function(id) {
					layer.confirm('确定删除?', {
						icon: 3,
						title: '提示'
					}, function(index) {
						layer.close(index);
						orgService.deleteOrganization({
							id: id
						}).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('删除成功！');
									$scope.changeMechanismTab(true);
								} else {
									notify.error("删除失败");
								}
							}
						}).catch(function() {}).finally(function() {});

					});
				}
				/*================角色管理===================*/
				var setting2 = {
					check: {
						enable: true,
						autoCheckTrigger: true
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						onCheck: function(event, treeId, treeNode) {
							debugger
							if(treeNode.children && treeNode.children.length == 0) {
								addRoleMenu(treeNode);
							}
							console.log($scope.roleMenu)
						}
					}
				};
				//点击菜单树添加到
				function addRoleMenu(treeNode) {
					debugger
					if(treeNode.checked) {
						debugger
						if(!checkMenu(treeNode.menuCode)) {
							$scope.roleMenu.push(treeNode);
						}
					} else {
						debugger
						for(var i = 0; i < $scope.roleMenu.length; i++) {
							if($scope.roleMenu[i].menuCode == treeNode.menuCode) {
								$scope.roleMenu.splice(i, 1)
								return;
							}
						}
					}
				}
				//判断菜单是不是已经选中过了
				function checkMenu(menuCode) {
					for(var i = 0; i < $scope.roleMenu.length; i++) {
						if($scope.roleMenu[i].menuCode == menuCode) {
							return true;
						}
					}
					return false;
				}
				//角色列表分页
				$scope.roleListReq2 = {
					roleSearchName: ''
				};
				$scope.roleListReq = {
					pageSize: 10,
					currentPage: 1,
					searchName: '',
					totalNum: 0
				}
				//搜索角色
				$scope.queryRoleName = function() {
					$scope.roleListReq.currentPage = 1;
					$scope.roleListReq.searchName = $scope.roleListReq2.roleSearchName;
					$scope.querylistRole();
				}
				//查询角色列表
				$scope.querylistRole = function() {
					var req = {
						pageSize: $scope.roleListReq.pageSize,
						currentPage: $scope.roleListReq.currentPage,
						searchName: $scope.roleListReq.searchName
					}
					orgService.getRoles(req).then(function(resp) {
						if(resp.resultCode == 200) {
							$scope.roleList = resp.data.list;
							$scope.roleListReq.totalNum = resp.data.totalNum;
						}
					}).catch(function() {}).finally(function() {
						$scope.loader = false;
					});
				}
				$scope.querylistRole();
				//新增角色
				$scope.newRole = {
					name: '',
					remark: ''
				};
				$scope.createRole = function() {
					$scope.layerCreateRole = layer.open({
						type: 1,
						title: '新增角色',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-role-create').html())($scope));
							$scope.newRole.name = "";
							$scope.newRole.remark = '';
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
				$scope.createRoleTrue = function() {
					if(!$scope.newRole.name) {
						notify.warn('角色名称不为空');
						return;
					};
					orgService.addRole($scope.newRole).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('新增成功！');
								$scope.querylistRole();
							} else {
								notify.error(resp.data.status);
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerCreateRole);
					});
				};
				$scope.createRoleCancel = function() {
					layer.close($scope.layerCreateRole);
				};
				$scope.oldRole = {
					id: '',
					name: '',
					remark: ''
				}
				//修改角色
				$scope.updateRole = function(item) {
					$scope.layerUpdateRole = layer.open({
						type: 1,
						title: '修改角色',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-role-upt').html())($scope));
							$scope.oldRole = $.extend({}, $scope.oldRole, item);
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
				$scope.updateRoleTrue = function() {
					var req = {
						id: $scope.oldRole.id,
						name: $scope.oldRole.name,
						remark: $scope.oldRole.remark
					}
					orgService.updateRole(req).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('修改成功！');
								$scope.querylistRole();
							} else {
								notify.error(resp.data.status);
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerUpdateRole);
					});
				};
				$scope.updateRoleCancel = function() {
					layer.close($scope.layerUpdateRole);
				}
				//角色权限设置
				function getMenuTree(layer, menuCode) {
					//if (!layer || !layer.length) return;
					for(var i = 0, len = layer.length; i < len; i++) {
						layer[i].name = layer[i].menuName;
						layer[i].open = true;
						if(layer[i].menuCode == menuCode) {
							layer[i].checked = true
						}
						var children = layer[i].children;
						if(children && children.length > 0) {
							layer[i].children = getMenuTree(children, menuCode);
						}
					}
					return layer;
				}
				$scope.settingRoleId = '';
				$scope.menuTree = [];
				$scope.roleMenu = [];
				$scope.settingRole = function(id) {
					$scope.roleMenu = [];
					$scope.menuTree = [];
					$scope.settingRoleId = id;
					$scope.layerSettingRole = layer.open({
						type: 1,
						title: '菜单权限配置',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-role-setting').html())($scope));
							orgService.listMenuTree().then(function(resp) {
								if(resp.resultCode == 200) {
									if(resp.data.length != 0) {
										$scope.menuTree = resp.data;
										orgService.getMenusByRoleId({
											roleId: id
										}).then(function(resp2) {
											if(resp2.resultCode == 200) {
												if(resp2.data.length == 0) {
													$scope.menuTree = getMenuTree($scope.menuTree, "");
												} else {
													$scope.roleMenu = $.extend(true, [], resp2.data);
													angular.forEach(resp2.data, function(role) {
														$scope.menuTree = getMenuTree($scope.menuTree, role.menuCode);
													});
												}
												$.fn.zTree.init($("#settingTree"), setting2, $scope.menuTree);
											}
										})
									}
								}
							}).catch(function() {}).finally(function() {});

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
				};

				$scope.settingRoleTrue = function() {
					var arr=[];
					angular.forEach($scope.roleMenu, function(role) {
						 arr.push(role.menuCode);
					});
					orgService.addMenuAuthority({
							roleId:$scope.settingRoleId,
							listMenuCode:arr.join(",")
						}).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('设置成功！');
									$scope.querylistRole();
								} else {
									notify.error("设置失败");
								}
							}
						}).catch(function() {}).finally(function() {layer.close($scope.layerSettingRole);});
				};
				$scope.settingRoleCancel = function() {
					layer.close($scope.layerSettingRole);
				};
				//删除角色
				$scope.delRole = function(id) {
					layer.confirm('确定删除?', {
						icon: 3,
						title: '提示'
					}, function(index) {
						layer.close(index);
						orgService.deleteRole({
							id: id
						}).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('删除成功！');
									$scope.querylistRole();
								} else {
									notify.error("删除失败");
								}
							}
						}).catch(function() {}).finally(function() {});

					});
				}
				/*=======================用户管理===========================*/

				//用户列表分页
				$scope.uesrListReq2 = {
					account: '',
					showName:''
				};
				$scope.uesrListReq = {
					pageSize: 10,
					currentPage: 1,
					totalNum: 0,
					account: '',
					showName:''
				}
				//搜索用户
				$scope.queryUserName = function() {
					$scope.uesrListReq.currentPage = 1;
					$scope.uesrListReq.account = $scope.uesrListReq2.account;
					$scope.uesrListReq.showName = $scope.uesrListReq2.showName;
					$scope.queryUserList();
				}
				//查询用户列表
				$scope.queryUserList = function() {
					var req = {
						pageSize: $scope.uesrListReq.pageSize,
						currentPage: $scope.uesrListReq.currentPage,
						account: $scope.uesrListReq.account,
						showName: $scope.uesrListReq.showName,
					}
					orgService.getUsers(req).then(function(resp) {
						if(resp.resultCode == 200) {
							$scope.userList = resp.data.list;
							$scope.uesrListReq.totalNum = resp.data.totalNum;
						}
					}).catch(function() {}).finally(function() {
						$scope.loader = false;
					});
				}
				$scope.queryUserList();
				//新增用户
				$scope.newUser = {
					account: '',
					password: '',
					showName: '',
					orgName: '',
					orgId: ''
				};
				$scope.createUser = function() {
					$scope.layerCreateUser = layer.open({
						type: 1,
						title: '新增用户',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-user-create').html())($scope));
							$scope.newUser.account = '';
							$scope.newUser.password = '';
							$scope.newUser.showName = '';
							$scope.newUser.orgName = '';
							$scope.newUser.orgId = "";
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

				};
				$scope.newUserKeyUp = function() {
					$scope.queryOrgNameTree($scope.newUser.orgName, '#newOrgTree');
				};
				$scope.newUserFocus = function() {
					$scope.queryliTreeOrg('#newUserTree');
				}
				$scope.createUserTrue = function() {
					if(!$scope.newUser.account) {
						notify.warn('账号不为空');
						return;
					};

					if(!$scope.newUser.password) {
						notify.warn('密码不为空');
						return;
					};

					if(!$scope.newUser.showName) {
						notify.warn('显示名称不为空');
						return;
					};
					if(!$scope.newUser.orgName) {
						notify.warn('所属组织机构不为空');
						return;
					};
					var req = {
						account: $scope.newUser.account,
						password: $scope.newUser.password,
						showName: $scope.newUser.showName,
						orgId: $scope.newUser.orgId
					}
					orgService.addUser(req).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('新增用户成功！');
								$scope.queryUserList();
							} else {
								notify.error('新增用户失败');
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerCreateUser);
					});
				};
				$scope.createUserCancel = function() {
					layer.close($scope.layerCreateUser);
				};
				//修改用户
				$scope.oldUser = {
					id: '',
					account: '',
					showName: '',
					orgName: '',
					orgId: ''
				};
				$scope.updateUser = function(item) {
					$scope.layerUpdateUser = layer.open({
						type: 1,
						title: '修改用户',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-user-update').html())($scope));
							$scope.oldUser = $.extend({}, $scope.oldUser, item);

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
				};
				$scope.oldUserKeyUp = function() {
					$scope.queryOrgNameTree($scope.newUser.orgName, '#oldUserTree');
				};
				$scope.oldUserFocus = function() {
					$scope.queryliTreeOrg('#oldUserTree');
				}
				$scope.updateUserTrue = function() {

					if(!$scope.oldUser.account) {
						notify.warn('账号不为空');
						return;
					};

					if(!$scope.oldUser.showName) {
						notify.warn('显示名称不为空');
						return;
					};
					if(!$scope.oldUser.orgName) {
						notify.warn('所属组织机构不为空');
						return;
					};
					var req = {
						id: $scope.oldUser.id,
						account: $scope.oldUser.account,
						showName: $scope.oldUser.showName,
						orgId: $scope.oldUser.orgId
					}
					orgService.updateUser(req).then(function(resp) {
						if(resp.resultCode == 200) {
							if(resp.data.status == 'success') {
								notify.success('修改用户成功！');
								$scope.queryUserList();
							} else {
								notify.error('修改用户失败');
							}
						}
					}).catch(function() {}).finally(function() {
						layer.close($scope.layerUpdateUser);
					});
				}
				$scope.updateUserCancel = function() {
					layer.close($scope.layerUpdateUser);
				}
				//删除用户
				$scope.delUser = function(id) {
					layer.confirm('确定删除?', {
						icon: 3,
						title: '提示'
					}, function(index) {
						layer.close(index);
						orgService.deleteUser({
							id: id
						}).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('删除成功！');
									$scope.queryUserList();
								} else {
									notify.error("删除失败");
								}
							}
						}).catch(function() {}).finally(function() {});

					});
				}
				//设置用户属于那些角色
				$scope.settingUser = function(item) {
					$scope.layerSettingUser = layer.open({
						type: 1,
						title: '设置角色',
						maxmin: false,
						area: ['600px', '400px'],
						shadeClose: true,
						content: '', //$('#layer-org-create'),
						success: function(layero) {
							angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-updatePer-role').html())($scope));
							$scope.roleUptOpts.id = item.id;
							$scope.roleUptOpts.searchAllRoles();
							orgService.getRoleByUserId({
								id: item.id
							}).then(function(resp) {
								if(resp.resultCode == 200) {
									$scope.roleUptOpts.confirmMap = {};
									angular.forEach(resp.data, function(data) {
										$scope.roleUptOpts.confirmMap[data.id] = data;
									});
								}
							}).catch(function() {}).finally(function() {});
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
				};

				//置用户属于那些角色弹窗里面的操作
				$scope.roleUptOpts = {
					id: '',
					keyword: '',
					resultList: [],
					confirmMap: [],
					searchResultList: function() {
						this.searchAllRoles(this.keyword);
					},
					select: function(role, type) {
						if(type === 0) {
							// 左侧列表切换选中
							role.active = !role.active;
						} else {
							// 右侧列表切换选中
							role.hover = !role.hover;
						}
					},
					add: function() {
						var confirmMap = this.confirmMap;
						angular.forEach(this.resultList, function(role) {
							var key = role.id;
							if((!confirmMap[key] || confirmMap[key].hide) && role.active) {
								//role.temp = true;
								role.hide = false;
								confirmMap[key] = role;
							}
							role.active = false;
						});
					},
					remove: function() {
						var confirmMap = this.confirmMap;
						angular.forEach(confirmMap, function(role) {
							var key = role.id;
							if(role.hover) {
								confirmMap[key].hide = true;
							}
							role.hover = false;
						});

					},
					confirm: function() {
						var arr = []
						angular.forEach(this.confirmMap, function(role, key) {
							if(!role.hide) {
								arr.push(key);
							}
						});
						var req = {
							userId: this.id,
							listRoleId: arr.join(",")
						};
						orgService.addUserRole(req).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('角色设置成功！');
									$scope.queryUserList();
								} else {
									notify.error(resp.data.status);
								}
							}
						}).catch(function() {}).finally(function() {
							layer.close($scope.layerSettingUser);
						});
					},
					close: function() {
						layer.close($scope.layerSettingUser);
					},
					searchAllRoles: function(val) {
						var req = {
							pageSize: 10000,
							currentPage: 1,
							searchName: val || ''
						};
						orgService.getRoles(req).then(function(resp) {
							if(resp.resultCode == 200) {
								$scope.roleUptOpts.resultList = resp.data.list;
							}
						}).catch(function() {}).finally(function() {});
					}
				}
                
                //重置密码
                $scope.resetUserPassword=function(id){
                	
					layer.confirm('确定重置密码?', {
						icon: 3,
						title: '提示'
					}, function(index) {
						layer.close(index);
						orgService.resetPassword({
							id: id
						}).then(function(resp) {
							if(resp.resultCode == 200) {
								if(resp.data.status == 'success') {
									notify.success('重置成功，恢复默认密码！');
								} else {
									notify.error("重置失败");
								}
							}
						}).catch(function() {}).finally(function() {});

					});
				
                }
			}
		];
		return platformCtrl;
	});