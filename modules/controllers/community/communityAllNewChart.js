
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify','yituFace'],
	function(app, controllers, $, configFile, common, notify,yituFace) {
		var chart = ['$scope', '$state', '$stateParams',  'moreService', '$compile', '$timeout', 'communityAllService',
			function($scope, $state, $stateParams, moreService,  $compile, $timeout, communityAllService) {
				window.onResize = function() {
	                var baseWidth = 1920;
	                var screenWidth = document.body.clientWidth;
	                windowHtmlSize = screenWidth / baseWidth * 100;
	                var defSize = screenWidth / baseWidth;
	                var axisFontSize = defSize * 24;
	                $("html").css({
	                    fontSize: windowHtmlSize + 'px'
	                });
	                // $scope.facilityList=setTableStyleObj($scope.facilityList || []);
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
				var type;
				$scope.YName = "个";
				$scope.eventMaxNum = 0;
				function init(){
					type = $stateParams.type;
					$scope.type = $stateParams.type;
					$scope.initType = $stateParams.type;
					if (type == '2') {
						$scope.YName = "户";
					}else{
						$scope.YName = "个";
					}
					$scope.type = type;
					$scope.chartdData = [];
					if (type == '8') {
						showCharts()
						return;
					}
					factPeople();
				}
				function showCharts() {
					$scope.titleName = $scope.getTitle($scope.type);
					communityAllService.dayEvent().then(function(resp) {
						if(resp.resultCode == '200') {
							var xAxisData = [];
							var seriesData = [];
							var dealData = {
								'110警情': [],
								'案件接报': [],
								'重点关注人员': [],
								'消防告警': []
							};
							var tempData = new Array(5);
							for (var name in resp.data) {
								switch(name) {
									case ('待派单'): tempData.splice(0, 0, resp.data[name]); break;
									case ('已派单'): tempData.splice(1, 0, resp.data[name]); break;
									case ('已接警'): tempData.splice(2, 0, resp.data[name]); break;
									case ('处理中'): tempData.splice(3, 0, resp.data[name]); break;
									case ('结束'): tempData.splice(4, 0, resp.data[name]); break;
								}
							}
							console.log(tempData)
							for (var key in tempData) {
								for (var k in tempData[key]) {
									switch(k) {
										case '110警情': dealData['110警情'].push(tempData[key][k]);break;
										case '案件接报': dealData['案件接报'].push(tempData[key][k]);break;
										case '重点关注人员': dealData['重点关注人员'].push(tempData[key][k]);break;
										case '消防告警': dealData['消防告警'].push(tempData[key][k]);break;
									}
								}
							}			
							getTodayEventStatie(dealData, xAxisData, seriesData)
						}
					}).catch(function() {}).finally(function() {});
				}
				function getTodayEventStatie(data, xAxisData, seriesData) {					
					echarts.dispose(document.getElementById("getTodayEventStatie"));
					var ECharts = echarts.init(document.getElementById('getTodayEventStatie'));
					var option = {
	                    tooltip : {
	                        trigger: 'axis'
	                    },
	                    calculable : false,
	                    xAxis : [
	                        {
	                            type : 'category',
	                            data : ['待分配','待接警','已接警','处理中','已完成'],
	                            axisLine:{
	                            	show: false,
	                                lineStyle:{//坐标轴线颜色
	                                    color:'#FFFFFF',
	                                    width:2,//坐标轴粗细
	                                }
	                            },
	                            axisTick: false,
	                            splitLine:{
	                            	show: false
	                            }
	                        }
	                    ],
	                    yAxis : [
	                        {
	                        	show: false	                            
	                        }
	                    ],
	                    series : [
	                    	{
	                            name:'110警情',
	                            type:'bar',
	                            // barWidth: '60%',
	                            data: data["110警情"],
	                            itemStyle:{
	                                normal:{
	                                    color:'rgba(0,74,169,.6)'//圆柱颜色
	                                }
	                            },	                            
	                            barCategoryGap: '15%',
	                            barGap: '10%'
	                        },
	                        {
	                            name:'案件接报',
	                            type:'bar',
	                            // barWidth: '60%',
	                            data: data["案件接报"],
	                            itemStyle:{
	                                normal:{
	                                    color:'rgba(0,138,255,0.6)'//圆柱颜色
	                                }
	                            },
	                            
	                        },
	                        {
	                            name:'布控告警',
	                            type:'bar',
	                            // barWidth: '60%',
	                            data: data["重点关注人员"],
	                            itemStyle:{
	                                normal:{
	                                    color:'rgba(13,207,255,1)'//圆柱颜色
	                                }
	                            },
	                            
	                        },	                        
	                        {
	                            name:'消防告警',
	                            type:'bar',
	                            // barWidth: '60%',
	                            data: data["消防告警"],
	                            itemStyle:{
	                                normal:{
	                                    color:'rgba(226,72,72,.6)'//圆柱颜色
	                                }
	                            },
	                            
	                        }
	                    ],
	                    label: {
	                    	normal: {
                            	show: true,
                            	position: 'top',
                            	fontSize: '16px',
                            	color: 'white',
                            	rotate: 50,
                            	align: 'left',
                            	verticalAlign: 'middle',
                            	formatter: '{c}  {a}'
	                    	}
	                    }
	                };
					ECharts.setOption(option);
					ECharts.on('click', function(params) {
						toFactEvent(params.seriesName);
					})
				}
				var toFactEvent = function(value){
					var newurl = window.location.href.split("/#")[0] + "#/index/factEvent/";
					window.open(newurl);
					var type;
					switch(value){
					  case "重点关注人员": 
					  	type = "monitor";
					  	break;
                      case "消防告警":
                        type = "fireNotice";
                        break;
                      case "110警情":
                        type = "warning";
                        break;
                      case "案件接报":
                        type = "receivedCase";
                        break;
                      default:
                      	type = "monitor";
                        break;
                     }					
					var params = {
						type: type,
						source: "AllCommunity"
					}
					localStorage.setItem('factEvent', JSON.stringify(params));
				};
				$scope.switchMenu = function(val){
					type = val;
					$scope.type = type;
					$scope.initType = val;
					factPeople();
				};
				//一标六实
				var factTypeObj = {
					"1": "/#/index/factpeople/", 
					"2": "/#/index/factHouse/",
					"3": "/#/index/factCompany/",
					"4": "/#/index/securityPower/1/",
					"5": "/#/index/securityPower/0/", 
					"6": "/#/index/factEvent/",
					"7": "/#/index/securityPower/0/"
				}
				var typeName = {
					"1":"实有人口",
					"2":"实有房屋",
					"3":"实有单位",
					"4":"实有安防设施",
					"5":"实有力量",
					"6":"实有警情事件",
					"7":"实有装备",
					"8":"今日实有警情事件处置"
				}
				$scope.getTitle = function(value){
					return typeName[value];
				};
				var factDateInit=[];
				function factPeople() {
					if(type === '5' || type === '7'){
						$scope.titleName = "实有力量与装备";
					}else{
						$scope.titleName = typeName[type];
					}
					var req = {
						type:type
					};
					moreService.queryFact(req).then(function(resp) {
						var data = resp.data;
						var region_ids=[];
						for(var i=0;i<data.length;i++){
                            region_ids.push(data[i].code);
							if(data[i].num == "0") {
								data.splice(i, 1);
								i = i-1;
							};
							
						}
						if(type==1){
						   factDateInit=data;
                           yituFace.yitu_incomingAndLeaving(region_ids,function(data){
                           var obj=data;
                          $.each(factDateInit,function(i,v){
                                v.num=Number(v.num)+Number(obj.incoming_dossier[v.code])-Number(obj.leaving_dossier[v.code]);
                          });
                            $scope.chartdData=setTableStyleObj(factDateInit);
						  });
						}else{
                           $scope.chartdData=setTableStyleObj(data);
						}
						
					})
				};
				
				
				//跳转
				$scope.toNextPage=function(obj) {
					if(type === '5'){
						window.sessionStorage.setItem("powerType","0");
					}else if(type === '7'){
						window.sessionStorage.setItem("powerType","1");
					}
					openDataList(obj.name, factTypeObj[type]);
					function openDataList(title, url) {
						var newurl = window.location.href.split("/#")[0] + url + obj.code;
						window.open(newurl);
					};;
				};

                //动态改变列表的长度，以最大数值为最长比例，其他依次按比例改版长度
				function setTableStyleObj(arr) {
					var maxHeight = $(".statistics-content").height()-250;
					var max = 0;
					angular.forEach(arr, function(data) {
						data.num = parseInt(data.num);
						if(data.num > max) {
							max = data.num;
						}
					});
					// console.log(max)
					angular.forEach(arr, function(data) {
						if(max==0){
							data.style ="0%"
						}else{
						   data.style = (data.num / max).toFixed(2);	
						}
						data.height = maxHeight*data.style;
					});
					// console.log(arr)
					return arr;
				}
				
				init();
			}
		];
		return chart;
	});