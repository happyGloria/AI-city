/**
 * Created by zrr on 2016/7/28.
 * 黑白名单
 */
define(['../services'],
	function(services) {
		services.factory('communityAllService', ['$q', '$http',
			function($q, $http) {
				/*================人脸抓拍================*/
				//布控任务以及居民库
				var getFacelibMapper = function(req) {
					return $http.post('/zhsq/facelibMapper/getFacelibMapper',req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				/*=================多小区首页========================*/
				//小区基本信息
				var getVillageByVillageCode = function(req) {
					return $http.post('/zhsq/village/getVillageByVillageCode',req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//一标六实/zhsq/statistics/sixEntityCount
				var sixEntityCount = function(req) {
					return $http.get('/zhsq/statistics/sixEntityCount?villageCode='+req.villageCode).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//实有力量在线统计
				var realPower = function(req) {
					var url='/zhsq/statistics/real-power'
					return $http.get('/zhsq/statistics/real-power?villageCode='+req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//感知总数  /zhsq/statistics/all-sense
				var allSense = function() {
					return $http.get('/zhsq/statistics/all-sense').
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//今日实有警情统计
				var dayEvent = function (req) {
					return $http.get('/zhsq/statistics/day-sense-byState').then(function(res, err){
						if (err) {
							return $q.reject(err)
						} else {
							return $q.when(res.data)
						}
					}, function(d) {
						return $q.reject(d)
					})
				}
				//一周感知量统计
				var weekSense = function(req) {
					return $http.get('/zhsq/statistics/week-sense?group='+req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//今日感知增量
				var dayIncremental = function() {
					return $http.get('/zhsq/statistics/day-incremental').
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//获取具体感知数据当前时间统计（折线图+5种类型）
				var daySenseType = function(req) {
					return $http.post('/zhsq/statistics/day-sense-type',req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				//获取具体感知数据当前时间统计（人脸-依图-今日）
				var todaySenseType_face = function(req) {
					return $http({
						method:'post',
						timeout:2000,
						url:'/captureToday/',
						data:req,
						headers:{
						 'Content-Type': 'application/json;charset=UTF-8'
						}
						
					}).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				}; 
				//获取具体感知数据当前时间统计（人脸-依图-秒）
				var secondSenseType_face = function(req) {
					return $http({
						method:'post',
						timeout:2000,
						url:'/capturemSecond/',
						data:req,
						headers:{
						 'Content-Type': 'application/json;charset=UTF-8'
						}
						
					}).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				}; 
				//今日实有警情统计
				var daySense = function() {
					return $http.get(' /zhsq/statistics/day-sense').
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};
				/*=================单小区首页========================*/


				//查询小区内一天GPS
				var findGpsByPage = function(req) {
					return $http.post('zhsq/gps/findGpsByPage', req).
					then(function(response, error) {
						if(error) {
							return $q.reject(error);
						} else {
							return $q.when(response.data);
						}
					}, function(d) {
						return $q.reject(d);
					});
				};

				//获取设备撒点坐标
				var queryMapInfo = function(id, req) {
					var url;
					switch(id) {
						case 'alerts':
						     url='/zhsq/policeAlert/getPoliceAlerts'
						     break;
						case 'building':
							url = '/zhsq/village/getBuildings'
							break;
						case 'mac':
							url = '/zhsq/realPowerEquip/realPowerDiscovery'
							break;
						case 'doorway':
							url = '/zhsq/village/getVillageEntranceExit';
							break;
						case 'employer':
							url = '/zhsq/village/getRealCompanyList';
							break;
						case 'smoke':
							url = '/zhsq/fire/fireDeviceList'
							break;
						case 'fireplug':
							url = '/zhsq/fire/fireDeviceList'
							break;
						case 'arc':
							url = '/zhsq/fire/fireDeviceList'
							break;
						case 'firehouse':
							url = '/zhsq/fire/getFireStationList'
							break;
						case 'camera':
							url = '/zhsq/camera/getCameraByType'
							break;
						case 'wifi':
							url = '/zhsq/wifi/getWifiDeviceList'
							break;
						case 'door':
							url = '/zhsq/access/getAccessDeviceList'
							break;
						case 'kakou':
							url = '/zhsq/kakou/poiList'
							break;
						case 'sewer':
							url = '/zhsq/cover/getManholecoverList'
							break;
						case 'bayonet':
							url = '/zhsq/vehicle/getVehicleTollgateList'
							break;
						case 'ck':
							url = '/zhsq/ck/ckDeviceList'
							break;
						case 'shed':
							url = '/zhsq/vehicle/getVehicleTollgateList'
							break;
					}
					debugger;
					if(id=="camera"){
					    req.pageSize='99';
						return $http.get('/zhsq/camera/getCameraByType?villageCode='+req.villageCode+'&cameraType='+req.cameraType+'&cameraName='+req.cameraName+'&pageNumber='+req.pageNumber+'&pageSize='+req.pageSize
						).then(function(response, error) {
							if(error) {
								return $q.reject(error);
							} else {
								return $q.when(response.data);
							}
						}, function(d) {
							return $q.reject(d);
						});
					}else{
						return $http.post(url, req).
						then(function(response, error) {
							if(error) {
								return $q.reject(error);
							} else {
								return $q.when(response.data);
							}
						}, function(d) {
							return $q.reject(d);
						});
					}
				}

				return {
					getVillageByVillageCode:getVillageByVillageCode,
					sixEntityCount: sixEntityCount,
					dayIncremental: dayIncremental,
					realPower:realPower,
					daySense: daySense,
					weekSense: weekSense,
					allSense: allSense,
					dayEvent:dayEvent,
					daySenseType:daySenseType,
					dayIncremental:dayIncremental,
					// queryRealPowerList:queryRealPowerList,
					queryMapInfo: queryMapInfo,
					getFacelibMapper:getFacelibMapper,
					findGpsByPage: findGpsByPage,
					todaySenseType_face:todaySenseType_face,
					secondSenseType_face:secondSenseType_face
				}
			}
		])
	});