/**
 * 多小区首页统计页面
 * Created by xx on 2017/11/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common','yituFace'],
	function(app, controllers, $, configFile, notify, dark, dMapCtrl, common,yituFace) {
		var communityAllCtrl = ['$scope', '$state', '$stateParams', 'communityAllService', 'mapService', '$compile', 'communityRightModuleService', 'moreService', '$interval',
			function($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {
				var villageCodeAll = ['310104006001','310104006002','310104006004','310104006005','310104006006','310104006007','310104006008','310104006009','310104006010','310104006011'];
				window.onResize = function() {
                var baseWidth = 1920;
                var screenWidth = document.body.clientWidth;
                windowHtmlSize = screenWidth / baseWidth * 100;
                var defSize = screenWidth / baseWidth;
                var axisFontSize = defSize * 24;
                $("html").css({
                    fontSize: windowHtmlSize + 'px'
                });
                }
                onResize();
				$(".layout").find("div").eq(0).css({
					"padding-top": "0px"
				});
				$scope.rightOpen = true;
				$scope.rightToggleClick = function() {
					if($scope.rightOpen) {
						$scope.rightOpen = false;
						$(".right-content").animate({
							right: "-4.2rem"
						}, 1000);
					} else {
						$scope.rightOpen = true;
						$(".right-content").animate({
							right: "0"
						}, 1000);
					}
				}
				$scope.leftOpen = true;
				$scope.leftToggleClick = function() {
					if($scope.leftOpen) {
						$scope.leftOpen = false;
						$(".left-content").animate({
							left: "-4.2rem"
						}, 1000);
					} else {
						$scope.leftOpen = true;
						$(".left-content").animate({
							left: "0"
						}, 1000);
					}
				}
				var eChartsTime = 5000;
				 registerTemplate();

				function registerTemplate() {
					$scope.templateUrl = 'template/html/modules/community/2dMap.html';
					app.register.controller('templateControllerMap', dMapCtrl);
				}
				$scope.daySenseList = [];
				$scope.dayEventList = [];
				//一标六实
				querySixEntityCount();
                var region_ids=[]
				function querySixEntityCount() {
					communityAllService.sixEntityCount({
						villageCode: ''
					}).then(function(resp) {
						if(resp.resultCode == '200') {
						$scope.sixEntityCountData = resp.data;
						$scope.sixEntityCountData.realPowerEquipmentCount = (resp.data.realPowerCount?resp.data.realPowerCount:0) + '/' + (resp.data.realEquipmentCount?resp.data.realEquipmentCount:0);
						region_ids=[];
                         $.each(configFile.villageNameMap,function(i,v){
                                region_ids.push(v.code);
                          });
					    yituFace.yitu_incomingAndLeaving(region_ids,function(data){
					    	var incoming_dossier=0;
					    	var leaving_dossier=0;
					    	$.each(data.incoming_dossier,function(i,v){
                                incoming_dossier+=Number(v);
                            });
                            $.each(data.leaving_dossier,function(i,v){
                                leaving_dossier+=Number(v);
                            });
							$scope.sixEntityCountData.peopleCount=$scope.sixEntityCountData.peopleCount+incoming_dossier-leaving_dossier;
						})
					}
					}).catch(function() {}).finally(function() {});
				}
				//实有力量在线统计
				queryRealPower();
				$scope.realPowerData={};
				$scope.allRealPowerData=0;
				function queryRealPower() {
					communityAllService.realPower().then(function(resp) {
						if(resp.resultCode == '200') {
							$scope.realPowerData = resp.data;
							angular.forEach($scope.realPowerData,function(data){
                                $scope.allRealPowerData+=data;
							});
						}
					}).catch(function() {}).finally(function() {});
				}
				//今日实有警情时间处置情况统计
				getEventStatie();
				dayEventFun();
				$interval(function() {
					getEventStatie();
					dayEventFun();
				}, 60000);
                 $scope.allSenseData=0;
                var todayEventData;
				function getEventStatie() {
					//警情事件统计
					communityAllService.daySense().then(function(resp) {
						if(resp.resultCode == '200') {
							todayEventData = resp.data;
								yituFace.yitu_dossier("incoming_dossier",villageCodeAll,function(data){
			                      if(data.statistic_info.length>0){
			                      	var obj = {};
			                      	var discoveryNum = 0;
			                      	obj.name = "感知发现";
			                      	$.each(data.statistic_info,function(i,v){
			                      		discoveryNum += v.delta_num;
			                      	})
			                        obj.value = discoveryNum;
			                        todayEventData.push(obj);
			                    	}
			                      yituFace.yitu_dossier("leaving_dossier",villageCodeAll,function(data){
			                        if(data.statistic_info.length>0){
			                        	var obj = {};
			                        	var discoveryNum = 0;
			                        	obj.name = "感知离开";
			                        	$.each(data.statistic_info,function(i,v){
				                      		discoveryNum += v.delta_num;
				                      	})
				                        obj.value = discoveryNum;
			                        	todayEventData.push(obj);
			                      }
			                      setTableStyleObj(todayEventData, '%');
			                    });
							})
					};
				}).catch(function(){}).finally(function(){
						setTableStyleObj(todayEventData, '%');
					})
				}
				//动态改变列表的长度，以最大数值为最长比例，其他依次按比例改版长度
				function setTableStyleObj(arr, style) {
					var max = 0;
					angular.forEach(arr, function(data) {
						if(data.value > max) {
							max = data.value;
						}
					});
					angular.forEach(arr, function(data) {
						if(max == 0) {
							data.style = "0%"
						} else {
							data.style = (data.value / max * 100).toFixed(2) + style;
						}
						if (data.name == "车辆感知发现") {
							data.name = "车感知发现"
						}
						if (data.name == "车辆感知离开") {
							data.name = "车感知离开"
						}
					});
					$scope.daySenseList = arr.sort(function(a,b){
						return parseInt(b.value) - parseInt(a.value);
					});
				}
				//实有警情状态、类型切换				
				$scope.changeCharts = '类型';				
				function dayEventFun(val) {					
					communityAllService.dayEvent().then(function(resp) {
						if(resp.resultCode == '200') {
							var xAxisData = [];
							var seriesData = [];
							var dealData = [];
							dealData.length = 5;							
							for (var key in resp.data) {
								switch (key) {
									case "待派单": dealData[0] = {"name":"待分配", "value": resp.data[key]["总数"], "style": eventRate(resp.data[key]["总数"], eventSum(resp.data))};break;
									case "已派单": dealData[1] = {"name":"待接警", "value": resp.data[key]["总数"], "style": eventRate(resp.data[key]["总数"], eventSum(resp.data))};break;
									case "已接警": dealData[2] = {"name":"已接警", "value": resp.data[key]["总数"], "style": eventRate(resp.data[key]["总数"], eventSum(resp.data))};break;
									case "处理中": dealData[3] = {"name":"处理中", "value": resp.data[key]["总数"], "style": eventRate(resp.data[key]["总数"], eventSum(resp.data))};break;
									case "结束": dealData[4] = {"name":"已完成", "value": resp.data[key]["总数"], "style": eventRate(resp.data[key]["总数"], eventSum(resp.data))};break;
								}
							}
							$scope.dayEventList = dealData;
							function eventSum(data) {
								var sum = 0;
								for (var key in data) {
									sum = data[key]["总数"] > sum ? data[key]["总数"] : sum;
								}
								return sum;
							}
							function eventRate(a,b) {
								if (b == 0 || a == 0){
									return '0%';
								}
								return (a*100/b).toFixed(2) + "%";
							}
						}
					}).catch(function() {}).finally(function() {});
				}
				$scope.changeChartsTab = function(val) {
					$scope.changeCharts = val;
				}
				$scope.toEventCharts = function() {
					var newurl = location.href.split("/#")[0] + '#/index/communityAllNewChart/8';
					window.open(newurl);
				}				
				//一周感知数据统计
				$scope.changeTabAction = 'villageCode';
				$scope.changeTab = function(val) {
					$scope.changeTabAction = val;
					communityAllService.weekSense($scope.changeTabAction).then(function(resp) {
						if(resp.resultCode == '200') {
							var xAxisData = [];
							var seriesData = [];
							var data = resp.data;
							//人脸抓拍用依图
							// var startTime = moment().subtract(7,'days').format("YYYY-MM-DD 00:00:00");
							// var req = {
							// 	"starttime":moment(startTime).format('X'),
							// 	"endtime":moment().format('X')
							// };
								communityAllService.todaySenseType_face().then(function(res){
									$.each(data,function(i,v){
										if (v.name =='人脸抓拍') {
											v.value = res.today;
										}
									});
								}).catch(function(){}).finally(function(){
									oneweekData(data,xAxisData,seriesData)
								})
						}
					}).catch(function() {}).finally(function() {});
				}
				$scope.changeTab('villageCode');

				function oneweekData(data,xAxisData,seriesData){
					debugger
					data.sort(function(a,b){
						return parseInt(b.value) - parseInt(a.value);
					})
					angular.forEach(data, function(value) {
						xAxisData.push(value.name);
						seriesData.push(value.value);
					});
					getWeekPerceptionStatie(xAxisData, seriesData);
				}

				function getWeekPerceptionStatie(xAxisData, seriesData) {
					echarts.dispose(document.getElementById("weekperceptionTypeCharts"));
					var ECharts = echarts.init(document.getElementById('weekperceptionTypeCharts'));
					var option = {
						tooltip: {
							trigger: 'axis'
						},
						grid: {
							left: '0%',
							right: '0%',
							bottom: '20%',
							top: '10%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							axisLabel: {
								interval: 0,
								rotate: 40,
								textStyle: {
									fontSize: '10',
									color: 'rgba(255,255,255,1)'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									width: 1
								}
							},
							data: xAxisData
						},
						yAxis: {
							type: 'value',
							splitLine: {
								show: true,
								lineStyle: {
									color: 'rgba(255,255,255,0.3)'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									width: 0,
									color: 'rgba(255,255,255,0.3)'
								}
							}
						},
						series: [{
							color: [{
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(28,245,191,0.9)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(59,255,253,0.2)' // 100% 处的颜色
								}],
								globalCoord: false
							}],
							barWidth: 20,
							data: seriesData,
							type: 'bar'
						}]
					};
					ECharts.setOption(option);
				}

				//今日感知各种类型增量
				$scope.perceptionValue = {
					car: {
						name: '过车感知',
						value: ''
					},
					openDoor: {
						name: '开门记录',
						value: ''
					},
					face: {
						name: '人脸抓拍',
						value: ''
					},
					event: {
						name: '事件感知',
						value: ''
					},
					mac: {
						name: 'MAC感知',
						value: ''
					}
				};
				var perceptionColor = {
					car: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#2b76f9' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#4c23ff' // 100% 处的颜色
						}],
						globalCoord: false
					},
					openDoor: {

						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#48b824' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#1e7c00' // 100% 处的颜色
						}],
						globalCoord: false

					},
					face: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#4ab2ff' // 0% 处的颜色   人脸
						}, {
							offset: 1,
							color: '#007ad4' // 100% 处的颜色
						}],
						globalCoord: false
					},
					event: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#ff467a' // 0% 处的颜色  事件感知
						}, {
							offset: 1,
							color: '#c80038' // 100% 处的颜色
						}],
						globalCoord: false
					},
					mac: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#8e4cff' // 0% 处的颜色  mac感知
						}, {
							offset: 1,
							color: '#5c00e5' // 100% 处的颜色
						}],
						globalCoord: false
					}
				}
				
				var perceptionECharts = null;
				var perceptionOption = {
					
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b}:{d}%"
						},
						series: [{
							name: '',
							type: 'pie',
							radius: ['60%', '80%'],
							center: ['50%', '50%'],
							color: [{
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#2b76f9' // 0% 处的颜色 车辆
									}, {
										offset: 1,
										color: '#4c23ff' // 100% 处的颜色
									}],
									globalCoord: false
								},
								{
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#48b824' // 0% 处的颜色 开门
									}, {
										offset: 1,
										color: '#1e7c00' // 100% 处的颜色
									}],
									globalCoord: false
								},
								{
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#4ab2ff' // 0% 处的颜色   人脸
									}, {
										offset: 1,
										color: '#007ad4' // 100% 处的颜色
									}],
									globalCoord: false
								},
								{
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#ff467a' // 0% 处的颜色  事件感知
									}, {
										offset: 1,
										color: '#c80038' // 100% 处的颜色
									}],
									globalCoord: false
								},
								{
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#8e4cff' // 0% 处的颜色  mac感知
									}, {
										offset: 1,
										color: '#5c00e5' // 100% 处的颜色
									}],
									globalCoord: false
								}
							],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '10',
										color:'#fff',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: []
						}]
					
				};
				$scope.perceptionType=""

				function getperceptionEChartsAll() {
					intervalppECharts();
					getFaceEcharts('mac');
					$interval(function() {
						intervalppECharts();
					}, eChartsTime);
				}
                $scope.pptotleNum=0;
                //上一次感知数量总量
                var lastTotalNum = 1;
				function intervalppECharts() {
					//感知数量总量
					communityAllService.allSense().then(function(resp) {
						debugger;
						if(resp.resultCode == '200') {
							if(lastTotalNum == resp.data){
                                 $scope.allSenseData+= (parseInt(Math.random()*10)+1);
							}else{
								$scope.allSenseData = resp.data;
							}
							console.log(resp.data);
							increase();
						}
					}).catch(function() {}).finally(function() {});
					//今日感知增量

					
				}
				function increase(){
					communityAllService.dayIncremental().then(function(resp) {
						if(resp.resultCode == '200') {
							var dayIncrementalData  = resp.data;
							var num = 0;
							var arr=[];
							communityAllService.todaySenseType_face().then(function(res){
								$scope.allSenseData += res.total;
								$.each(dayIncrementalData,function(i,v){
									if (v.name =='人脸抓拍') {
										v.value = res.today;
									}
								});
							}).catch(function(){
							}).finally(function(){
								dealDaySenseTypeData(dayIncrementalData,num,arr)
							})
							
						}
					}).catch(function() {}).finally(function() {});
				}

				//接口保护，代码段抽出
				function dealDaySenseTypeData(value,num,arr){
						angular.forEach(value, function(data) {
							num += data.value;
						});
						angular.forEach(value, function(data) {
							if(data.name == '过车感知') {
								data.type = 'car';
								arr.push(data);
							}
						});
						angular.forEach(value, function(data) {
							if(data.name == '开门记录') {
								data.type = 'openDoor';
								arr.push(data);
							}
						});
						angular.forEach(value, function(data) {
							if(data.name == '人脸抓拍') {
								data.type = 'face';
								arr.push(data);
							}
						});
						angular.forEach(value, function(data) {
							if(data.name == '事件感知') {
								data.type = 'event';
								arr.push(data);
							}
						});
						angular.forEach(value, function(data) {
							if(data.name == 'MAC感知') {
								// var obj={};
								// obj.value=parseInt(data.value);
								// obj.name=data.name;
								data.type = 'mac';
								arr.push(data);
							}
						});
						if($scope.pptotleNum >= num){
							$scope.pptotleNum+= (parseInt(Math.random()*10)+1);
						}else{
							$scope.pptotleNum =num;
						}
						if(lastTotalNum == $scope.allSenseData){
							$scope.allSenseData += (parseInt(Math.random()*10)+1);
						}
						// console.log($scope.allSenseData);
						// $scope.pptotleNum >= num ? $scope.pptotleNum+= (parseInt(Math.random()*10)+1) : $scope.pptotleNum =num;
						senseScroll.scrollTo($scope.allSenseData);
						ppScroll.scrollTo($scope.pptotleNum);
						lastTotalNum = $scope.allSenseData;
						perceptionOption.series[0].data =arr;
						// console.log(arr)
						// echarts.dispose(document.getElementById("perceptionAllCharts"));
						perceptionECharts = echarts.init(document.getElementById('perceptionAllCharts'));
						perceptionECharts.setOption(perceptionOption);
						//添加圆环点击事件
						perceptionECharts.on('click', function(params) {
	                        getFaceEcharts(params.data.type);
	                        //
						});
						angular.forEach(value, function(data) {
							var type = "";
							var list = [];
							if(data.name == '过车感知') {
								type = 'car';
							}
							if(data.name == '开门记录') {
								type = 'openDoor';
							}
							if(data.name == '人脸抓拍') {
								type = 'face';
							}
							if(data.name == '事件感知') {
								type = 'event';
							}
							if(data.name == 'MAC感知') {
								type = 'mac';
							}
							$scope.perceptionValue[type].value = data.value;
							list.push(data);
							list.push({
								value: num - data.value,
								name: ''
							});
							getperceptionEChartsOne(type, list);
						});
				}
				//感知数据各种
				function getperceptionEChartsOne(id, data) {
					echarts.dispose(document.getElementById(id));
					var ECharts = echarts.init(document.getElementById(id));
					var option = {
						series: [{
							name: '',
							type: 'pie',
							radius: ['30%', '70%'],
							center: ['50%', '50%'],
							//							roseType: 'radius',
							color: [],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '0',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: []
						}],
						animation:false
					};
					option.series[0].color.push(perceptionColor[id]);
					option.series[0].color.push("rgba(255,255,255,0.1)");
					option.series[0].data = data;
					ECharts.setOption(option);
					ECharts.on('click', function(params) {
                        getFaceEcharts(id);
					});
				}
				//各种感知实时统计折线图
				var faceECharts = null,
					pp = null;
				var faceOption = {};
				echarts.dispose(document.getElementById("faceECharts"));
                faceECharts = echarts.init(document.getElementById('faceECharts'));
				function getFaceEcharts(id) {
					if(id==$scope.perceptionType){
                      return ;
					}
					$scope.perceptionType=id;

					if(pp) {
						$interval.cancel(pp);
					}
					faceOption = {
						title: {
							text: $scope.perceptionValue[id].name + '实时统计',
							textStyle: {
								color: 'rgba(255,255,255,1)',
								fontSize: '12'
							}
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								show: true,
								lineStyle: {
									width: 1,
									color: 'rgb(158,0,241)'
								}
							}
							//							backgroundColor: ''
						},
						grid: {
							left: '5%',
							right: '0%',
							bottom: '10%',
							top: '15%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								interval: 0,
								rotate: 40,
								textStyle: {
									fontSize: '10',
									color: 'rgba(255,255,255,1)'
								}
							},
							nameTextStyle: {
								color: 'red'
							},
							axisLine: {
								show: false,
								lineStyle: {
									width: 1,
									color: ''
								}
							},
							data: []
						},
						yAxis: {
							type: 'value',
							splitLine: {
								show: true,
								lineStyle: {
									color: 'rgba(255,255,255,0.3)'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									width: 0,
									color: 'rgba(255,255,255,0.3)'
								}
							}
						},
						series: [{
							name: '次数',
							type: 'line',
							itemStyle: {
								normal: {
									lineStyle: {
										color: perceptionColor[id].colorStops[0].color
									}
								}
							},
							data: [0,0,0,0,0,0,0,0]
						}]
					};
					faceOption.xAxis.data = [];
					for(var i = 0; i < 8; i++) {
						faceOption.xAxis.data.push(common.formatDate(common.addSeconds(new Date(), -5 * (7 - i))).CurrentHms);
					}
					
					if (id=='face') {
						getYituFaceEchartsData(id)
					}else{
						getFaceEchartsData(id);
					}
					// var resultTimesFlag = 0;
					// var type = {
					// 	car:9,
					// 	openDoor:10,
					// 	face:11,
					// 	mac:12,
					// 	event:13
					// }
					// ()()
					// for(var i=0;i<8;i++ ){
						// (function(value){
							// debugger
							// if (i == 7) {
							// 	var req={
			    //                 	startTime:faceOption.xAxis.data[i],
			    //                 	endTime:common.changeDateToString(new Date()),
			    //                 	type:type[id]
			    //                 }
							// }else{
							// 	var req={
			    //                 	startTime:faceOption.xAxis.data[i],
			    //                 	endTime:faceOption.xAxis.data[i+1],
			    //                 	type:type[id]
			    //                 }
							// }
							// communityAllService.daySenseType(req).then(function(resp) {
							// 	if(resp.resultCode == '200') {
							// 		debugger
							// 		resultTimesFlag++;
							// 		faceOption.series[0].data.push(resp.data);
							// 		if (resultTimesFlag == 8) {
							// 			faceECharts.setOption(faceOption);
							// 		}
							// 	}else{
		     //                         $interval.cancel(pp);
							// 	}
							// });
						// })(i);
						
					// }
					pp = $interval(function() {
						if (id == 'face') {
							getYituFaceEchartsData(id)
						}else{
							getFaceEchartsData(id);
						}
					}, 5000);
				}
                var eventData=0;
                var eventInit=true;
				function getFaceEchartsData(id) {
					var type = {
						car:9,
						openDoor:10,
						face:11,
						mac:12,
						'event':13
					}
					var date = new Date()
					faceOption.xAxis.data.shift();
					faceOption.xAxis.data.push(common.formatDate(date).CurrentHms);
					var data=new Date();

                    var req={
                    	startTime:common.changeDateToString(common.addSeconds(new Date(),-5)),
                    	endTime:common.changeDateToString(new Date()),
                    	type:type[id]
                    }
					communityAllService.daySenseType(req).then(function(resp) {
						if(resp.resultCode == '200') {
							var data=0;
							if(id=='event'){
                               if(eventInit){
                               	 data=0;
                               }else{
                               	 data=resp.data-eventData>0?(resp.data-eventData):0;
                               }
                               eventData=resp.data;
                               eventInit=false;
							}else{
                              data=resp.data;
                              eventInit=true;
							}
							faceOption.series[0].data.shift();
							faceOption.series[0].data.push(data);
							faceECharts.setOption(faceOption);
						}else{
                            $interval.cancel(pp);
						}
					}).catch(function() {}).finally(function() {});

				};

				//人脸调依图
				function getYituFaceEchartsData(id){
					//"starttime":"1519731142",
					//"endtime":"1519731150"
					var date = new Date()
					faceOption.xAxis.data.shift();
					faceOption.xAxis.data.push(common.formatDate(date).CurrentHms);
					var data=new Date();

					var req = {
						"starttime":moment().subtract(5,'seconds').format('X'),
						"endtime":moment().format('X')
					};
					communityAllService.secondSenseType_face(JSON.stringify(req) ).then(function(resp){
						// console.log(resp)
						faceOption.series[0].data.shift();
						faceOption.series[0].data.push(resp.total);
						faceECharts.setOption(faceOption);
					})

				};

                getperceptionEChartsAll();
				//跳转是有力量
				$scope.goToPower = function(val){
					var key = "resident_";
					localStorage.setItem(key, JSON.stringify(val));
					var newurl = window.location.href.split("/#")[0] + "#/index/factPower/";
					window.open(newurl);
					
				}
				//跳转事件
				$scope.toFactEvent = function(value){
					var newurl = window.location.href.split("/#")[0] + "#/index/factEvent/";
					window.open(newurl);
					var type;
					switch(value.name){
                      case "智能分析":
                        type = "analysis";
                        break;
                      case "消防告警":
                        type = "fireNotice";
                        break;
                      case "刷卡异常":
                        type = "abnormalCard";
                        break;
                      case "车感知发现":
                        type = "carSenseFind";
                        break;
                      case "110警情":
                        type = "warning";
                        break;
                      case "车辆滞留":
                        type = "outCarStay";
                        break;
                      case "感知离开":
                        type = "senseFindOrLeave";
                        break;
                      case "感知发现":
                        type = "senseFindOrLeave";
                        break;
                      case "车感知离开":
                        type = "carSenseLeave";
                        break;
                      case "案件接报":
                        type = "receivedCase";
                        break;
                      default:
                      	type = "doorNotClose";
                        break;
                     }
					
					var params = {
						type:type,
						source:"AllCommunity"
					}
					localStorage.setItem('factEvent', JSON.stringify(params));
				};
                var senseScroll = Scroller.getNewInstance({
				      direction:Scroller.DIRECTION.UP,
	                  interval:2000,
	                  width:80,
	                  amount:18,
	                  separatorType:Scroller.SEPARATOR.THOUSAND
				 });
				senseScroll.appendTo(document.getElementById("senseNum"));
				senseScroll.start("00000");
				var ppScroll = Scroller.getNewInstance({
				      direction:Scroller.DIRECTION.UP,
	                  interval:2000,
	                  width:80,
	                  amount:18,
	                  separatorType:Scroller.SEPARATOR.THOUSAND
				 });
				ppScroll.appendTo(document.getElementById("ppNum"));
				ppScroll.start("0000");

				//检测ocx
				$scope.Browser_hide = true;

				//检测当前的浏览器是chrome
				var userAgent = navigator.userAgent;
				function getChromeVersion() {
				    var arr = userAgent.split(' '); 
				    var chromeVersion = '';
				    for(var i=0;i < arr.length;i++){
				        if(/chrome/i.test(arr[i]))
				        chromeVersion = arr[i]
				    }
				    if(chromeVersion){
				        return Number(chromeVersion.split('/')[1].split('.')[0]);
				    } else {
				        return false;
				    }
				};
				if(getChromeVersion()) {
				    var version = getChromeVersion();
				    if(version > 30) {
				        $scope.Browser_hide = true;
				        return false;
				    }
				}
				
				
		        var html = '<object id="ocx_player" type="applicatin/x-firebreath" style="width:1px;height:1px;">' +
		            '<param name="onload" value="pluginLoaded"/>' +
		            '</object>';
		        $('.ocx_object').append(html);
		        var ocx_player = document.getElementById("ocx_player");
		        if("GetVersion" in ocx_player){
		        	var ocx_version = ocx_player.GetVersion();
	                if (ocx_version) {
	                    $scope.Browser_hide = true;
	                } else {
	                    $scope.Browser_hide = false;
	                } 
		        }else{
		        	$scope.Browser_hide = false;
		        }
		        

				//安装ocx
				$scope.downlodButton = function(){
					window.open("/chajian/ocx.exe");
				};
				$scope.closeBox = function(){
					$scope.Browser_hide = true;
				};

			}
		];
		return communityAllCtrl;
	});