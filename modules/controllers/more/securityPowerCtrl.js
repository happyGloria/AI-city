//实有安防力量柱状图js
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify'],
	function(app, controllers, $, configFile, common, notify) {
		var securityPowerCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
			function($scope, $state, $stateParams, moreService, $compile, $timeout) {
				window.onResize = function() {
	                var baseWidth = 1920;
	                var screenWidth = document.body.clientWidth;
	                windowHtmlSize = screenWidth / baseWidth * 100;
	                var defSize = screenWidth / baseWidth;
	                var axisFontSize = defSize * 24;
	                $("html").css({
	                    fontSize: windowHtmlSize + 'px'
	                });
	                debugger;
	                $scope.facilityList=setTableStyleObj($scope.facilityList || []);
	                $scope.$apply();
               }
                $(window).resize(function() {
                    onResize(); 
                })
				$(".layout").find("div").eq(0).css({
					"padding-top": "0px"
				});
				var villageCode;
				
				var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
				//实有安防力量start
				function securityPowerInit() {
					var req = {
						villageCode:villageCode
					};
					moreService.queryPowerList(req).then(function(resp) {
						var dataPower = resp.data;
						for(var i=0;i<dataPower.length;i++){
							if(dataPower[i].num == "0") {
								dataPower.splice(i, 1);
								i = i-1;
							};
							if(dataPower[i].name == "警员") {
								dataPower.splice(i, 1);
								i = i-1;
							}
						}
						
                        $scope.dataPowerList=setTableStyleObj(dataPower);

					})
				}
                
                $scope.toFactPeoplePage=function(obj) {

                	debugger
        	        var urlParam = {
						name: obj.name,
						value: obj.num
					};
					var key = "factPower_" + villageCode;
					localStorage.setItem(key, JSON.stringify(urlParam));
					if(urlParam.name=='快递'){
                       var url = window.location.href.split("/#")[0] + "/#/index/expressPeople/" + villageCode;
					   window.open(url);
					}else{
                      var url = window.location.href.split("/#")[0] + "/#/index/factPower/" + villageCode;
					  window.open(url);
					}
				}
				//实有安防设施start
				function securityFacilityInit() {
					var req = {
						villageCode:villageCode
					};
					var securityFacilityObj = {
						// "摄像机": "/#/index/camera/" + villageCode, //cameraType为空
						"门禁": "/#/index/doorrecord/" + villageCode,
						"WiFi探针": "/#/index/communityMac/" + villageCode,
						// "人脸卡口": "/#/index/camera/" + villageCode,//cameraType 传2
						// "车辆卡口": "/#/index/communityCar/" + villageCode, //单独的车辆列表
						"烟感": "/#/index/smoke/" + villageCode,
						"电表": "/#/index/smoke/" + villageCode,
						"电弧": "/#/index/smoke/" + villageCode,
						// "消防栓": "",
						// "微型消防站": "",
						// "窨井盖": ""
					}
					moreService.queryFacilityList(req).then(function(resp) {
						var data = resp.data;
						for(var i=0;i<data.length;i++){
							if(data[i].num == "0") {
								data.splice(i, 1);
								i = i-1;
							};
							
						}
						debugger
                        $scope.facilityList=setTableStyleObj(data);
						var urlParam = {};
					})
					$scope.toDevicePage = function(obj){
						console.log(obj)
						return
						debugger
						var urlParam = {
							name: obj.name,
							value: obj.num
						};
						if (urlParam.name =="门禁" || urlParam.name=="WiFi探针" || urlParam.name=="烟感" || urlParam.name=="电表" || urlParam.name=="电弧") {
							urlParam.type = "toDevicePage";
							var key = "facility_" + villageCode;
							localStorage.setItem(key, JSON.stringify(urlParam));
							openDataList(urlParam.name, securityFacilityObj[urlParam.name]);
						}else{
							return
						}
						
					}
				}
				
				function openDataList(title, url) {
					var newurl = window.location.href.split("/#")[0] + url;
					window.open(newurl);
				}
                //动态改变列表的长度，以最大数值为最长比例，其他依次按比例改版长度
				function setTableStyleObj(arr) {
					debugger;
					var maxHeight = $(".statistics-content").height()-250;
					var max = 0;
					angular.forEach(arr, function(data) {
						if(data.num > max) {
							max = data.num;
						}
					});
					angular.forEach(arr, function(data) {
						if(max==0){
							data.style ="0%"
						}else{
						   data.style = (data.num / max).toFixed(2);	
						}
						data.height = maxHeight*data.style;
					});
					return arr;
				}
				function init() {
					$scope.facility = false;
					var type = $stateParams.type;
					if(1 == type) {
						$scope.facility = true;
						securityFacilityInit();
					} else {
						$scope.facility = false;
						securityPowerInit();
					}
				}
				$scope.searchSecurityZhuangbei = function() {
					$scope.securityZhuangBeiData = [];
					moreService.queryRealEquiments($scope.initParams).then(function(resp) {
						if(resp.resultCode == 200) {
							// alert(1)
							$scope.securityZhuangBeiData = resp.data.list;
							debugger
							$scope.page1.totalRow = resp.data.totalRow;
							// securityZhuangBeiData.forEach(function(data, index) {
							// 	if(data.picType == 1) {
							// 		$scope.securityZhuangBeiData.push(data);
							// 	}
							// });
							// securityZhuangBeiData.forEach(function(data, index) {
							// 	if(data.picType == 2) {
							// 		$scope.securityZhuangBeiData.push(data);
							// 	}
							// });
						}
					}).catch(function() {}).finally(function() {});
				};
				debugger
				var tabIndex = parseInt(window.sessionStorage.getItem("powerType"));
				if(tabIndex){
					$scope.initType = tabIndex;
				}else{
					$scope.initType = 0;
				}
				
				$scope.switchMenu = function(val) {
					villageCode = $stateParams.villageCode;
					$scope.villageName = configFile.communityCodeToName[villageCode];
					if(val == 0) {
						$scope.initType = 0;
						init();
					}
					if(val == 1) {
						$scope.initType = 1;
						$scope.initParams = {
							pageSize: 10,
							pageNumber: 1,
							villageCode:villageCode
						};
						$scope.page1 = {
							totalRow: 0,
							count: 0
						};
						$scope.searchSecurityZhuangbei();
					}
				}
				var type = $stateParams.type;
				if(type==1){
					$scope.tabShow = false;
				}else{
                    $scope.tabShow = true;
				}
				$scope.switchMenu($scope.initType);
			}
		];
		return securityPowerCtrl;
	});