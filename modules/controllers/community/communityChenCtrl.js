/**
 * 一标六实主面板
 * 2018/05/04
 */
define(
	['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', '/modules/config/echartsConfig.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function (app, controllers, $, configFile, echartsConfig,notify, dark, dMapCtrl, common) {
		var communityAllCtrl = [
			'$scope',
			'$state',
			'$stateParams',
			'communityAllService',
			'mapService',
			'$compile',
			'communityRightModuleService',
			'moreService',
			'$interval',
			'moreService',
			function ($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval, moreService) {
				// 设置样式
				window.onResize = function () {
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
				setEchart=function (id,option,cb){
					echarts.dispose(document.getElementById(id));
					var ECharts = echarts.init(document.getElementById(id));
					ECharts.on('click', function (params) {
						cb(params)
					});
					ECharts.setOption(option);
				}
				// 1. 一标六实数据
				// 2.1 年龄分布
				/* 实有力量~~~~~~~~~~~· */
				//1)实有力量在线统计
				queryRealPower()
				function queryRealPower() {
					communityAllService.realPower().then(function (resp) {
						if (resp.resultCode == '200') {
							var powerData = resp.data
							var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长','志愿者','保安', '保洁', '保绿',  '快递人员'], [powerData.jy,powerData.jwgb, powerData.lzz,powerData.zyz,  powerData.ba, powerData.bj, powerData.bl, powerData.kd])
							setEchart("PowerAnalysis", powerOption)
						}
					}).catch(function () { }).finally(function () { });
				}
				var powerOption = echartsConfig.triangleEcharts(['警员', '居委干部', '楼组长', '志愿者', '保安', '保洁', '保绿', '快递人员'], [1,2,3,4,5,6,7,8])
				setEchart("PowerAnalysis", powerOption,function (params) {
					//点击图标跳转页面
					var key = "resident_";
					localStorage.setItem(key, JSON.stringify(params.dataIndex + 1 + ""));
					var newurl = window.location.href.split("/#")[0] + "#/index/factPower/";
					window.open(newurl);
				})
				//实有安防设施分析
				moreService.queryFacilityList({villageCode: ''}).then(function (resp) {
					console.log(resp.data)
					var dataArr=[]
					var nameArr=[]
					resp.data.forEach(function (v,k) {
						dataArr.push(v.num)
						if (v.name==='WiFi探针'){
							v.name ='WiFi\n探针'
						}else if (v.name.length>2){
							v.name = v.name.substr(0,2)+'\n'+v.name.substr(2, a.length - 2)
						}
						dataArr.push(v.name)
					})
					console.log(dataArr, nameArr)
				})
				var SafeOption = echartsConfig.triangleEcharts(['窖井盖', '微型\n消防站', '消防栓', '电壶', '烟感', '车辆\n卡口', '人脸\n卡口', 'WIFI\n探针', '门禁', '摄像机'], ['170', '40', '178', '98', '74', '111', '100', '28', '144', '56'])
				setEchart("SafeAnalysis", SafeOption)
				/* 实有人员分析 */,  
				$scope.peopleTabAction = 'age';
				$scope.changePeopleTab = function (val) {
					$scope.peopleTabAction = val;
				}
				//年龄分布
				var PeopleOption = echartsConfig.pieEcharts(['1', '2', '3', '4', '5'], ['1-16岁', '17-40岁', '41-60岁', '61-80岁', '80岁以上'], [12, 10, 5, 7, 9])
				setEchart("ageAnalysis", PeopleOption)
				//性别与户籍
				/* 性别 */
				var SexOption = echartsConfig.pieEcharts(['男', '女'], ['1', '2'], [45000, 55000])
				SexOption.title.text='性别\n比例',
					setEchart("sexAnalysis", SexOption)
				/* 户籍 */
				var HujiOption = echartsConfig.pieEcharts(['来沪人员', '户籍人员', '外籍人员'], ['1', '2', '3'], [18000, 73000,9000])
				HujiOption.title.text = '户籍\n比例',
					setEchart("hujiAnalysis", HujiOption)
				// 人员性质
				PeopleOption.title.text = '人员\n性质',
				setEchart("personnelAnalysis", PeopleOption)

				//底部面板切换
				$scope.bottomTabAction = 'cars';
				$scope.changeBottomTab = function (val) {
						$scope.bottomTabAction = val;
				}
				//人脸面板切换
				$scope.faceTabAction = 'all';
				$scope.changeFaceTab = function (val) {
					$scope.faceTabAction = val;
				}
				//过车面板切换
				$scope.carsTabAction = 'iscar';
				$scope.changeCarsTab = function (val) {
					$scope.carsTabAction = val;
				}
			}
		]
		return communityAllCtrl;
	}
);