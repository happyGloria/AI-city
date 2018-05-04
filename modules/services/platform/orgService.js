/**
 * orgService 机构管理
 * Created by zhurongrong on 2016/5/6.
 */
define(['../services'],
    function (services) {
        services.factory('orgService', ['$q', '$http',
            function ($q, $http) {
            	//组织机构列表 getOrganizations
            	 var getOrganizations = function(req){
                    return $http.post('/zhsq/system/getOrganizations',req).
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
                //组织结构树getOrganizationTree
                var getOrganizationTree = function(req){
                    return $http.post('/zhsq/system/getOrganizationTree',req).
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
                
                // 添加组织结构addOrganization
                var addOrganization = function(req){
                    return $http.post('/zhsq/system/addOrganization',req).
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
                //修改组织机构 updateOrganization
                var updateOrganization = function(req){
                    return $http.post('/zhsq/system/updateOrganization',req).
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
                //删除组织机构deleteOrganization
                var deleteOrganization = function(req){
                    return $http.post('/zhsq/system/deleteOrganization',req).
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
                //获取角色列表列表
                var getRoles = function(req){
                    return $http.post('/zhsq/system/getRoles',req).
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
                
                //添加角色
                var addRole = function(req){
                    return $http.post('/zhsq/system/addRole',req).
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
                
                //删除角色
                var deleteRole = function(req){
                    return $http.post('/zhsq/system/deleteRole',req).
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
                //修改角色updateRole
                
                var updateRole = function(req){
                    return $http.post('/zhsq/system/updateRole',req).
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
                
                //用户列表getUsers
                var getUsers = function(req){
                    return $http.post('/zhsq/system/getUsers',req).
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
                //新增用户
                var addUser = function(req){
                    return $http.post('/zhsq/system/addUser',req).
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
                  //修改用户
                var updateUser = function(req){
                    return $http.post('/zhsq/system/updateUser',req).
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
                //获取当前用户的角色
                var getRoleByUserId = function(req){
                    return $http.post('/zhsq/system/getRoleByUserId',req).
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
                
                //给用户设置角色addUserRole
                var addUserRole = function(req){
                    return $http.post('/zhsq/system/addUserRole',req).
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
                  //删除用户
                var deleteUser = function(req){
                    return $http.post('/zhsq/system/deleteUser',req).
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
                //菜单树listMenuTree
                var listMenuTree = function(){
                    return $http.post('/zhsq/system/listMenuTree').
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
                //获取角色菜单权限getMenusByRoleId
                var getMenusByRoleId = function(req){
                    return $http.post('/zhsq/system/getMenusByRoleId',req).
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
                //赋予角色菜单权限
                var addMenuAuthority = function(req){
                    return $http.post('/zhsq/system/addMenuAuthority',req).
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
                //重置密码
                 var resetPassword = function(req){
                    return $http.post('/zhsq/system/resetPassword',req).
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
            		getOrganizations:getOrganizations,
            		getOrganizationTree:getOrganizationTree,
            		addOrganization:addOrganization,
            		updateOrganization:updateOrganization,
            		deleteOrganization:deleteOrganization,
            		getRoles:getRoles,
            		addRole:addRole,
            		deleteRole:deleteRole,
            		updateRole:updateRole,
            		getUsers:getUsers,
            		addUser:addUser,
            		updateUser:updateUser,
            		getRoleByUserId:getRoleByUserId,
            		addUserRole:addUserRole,
            		deleteUser:deleteUser,
            		addMenuAuthority:addMenuAuthority,
            		listMenuTree:listMenuTree,
            		getMenusByRoleId:getMenusByRoleId,
            		resetPassword:resetPassword
            	}
            }
        ])
    });
