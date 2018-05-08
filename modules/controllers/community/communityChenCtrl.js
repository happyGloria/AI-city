/**
 * 一标六实主面板
 * 2018/05/04
 */
define(
	['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'notify', 'echarts-dark', 'controllers/community/2dMapCtrl', 'config/common'],
	function (app, controllers, $, configFile, notify, dark, dMapCtrl, common) {
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
			function ($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {
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

				// 1. 一标六实数据

				// 2. 实有人员分析
				// 2.1 年龄分布
				/* 实有力量~~~~~~~~~~~· */
				echarts.dispose(document.getElementById("strengthView"));
				var ECharts = echarts.init(document.getElementById('strengthView'));
				var myColor = ['#eb2100', '#eb4800', '#eb7f00', '#d0a00e', '#c9db00', '#93c222'];
				option = {
					backgroundColor: '#0e2147',
					grid: {
						left: '0%',
						right: '0%',
						bottom: '5%',
						top: '20%',
						width:'300px',
						containLabel: true
					},
					xAxis: {
						data: ['保安', '保绿', '志愿者', '居委干部', '快递人员', '楼栋长','保洁'],
						axisTick: { show: false },
						axisLine: { show: false },
						axisLabel: {
							textStyle: {
								color: 'rgba(255,255,255,0.8)',
								fontSize: '14',
							},
						},
					},
					yAxis: {
						show:false,
					},
					series: [{
						name: 'hill',
						type: 'pictorialBar',
						barCategoryGap: '0%',
						symbol: 'path://M150 50 L130 130 L170 130 Z',
						label: {
							normal: {
								// backgroundColor:'#f03b56',
								// width:'50px',
								// height:'50px',
								// padding:[4,6],
								// borderRadius:4,
								show: true,
								position: 'top',
								textStyle: {
									fontSize: '16',
									color: '#5dbef6'
								}
							}
						},
						itemStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: 'rgba(21, 144, 231, 0.6)' // 0% 处的颜色 //#e81e6d
									}, {
											offset: 1, color: '#17bcec' // 100% 处的颜色//#ff6b31
									}],
									globalCoord: false // 缺省为 false
								}
							},
							emphasis :{
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: '#e81e6d' // 0% 处的颜色 //
									}, {
											offset: 1, color: '#ff6b31' // 100% 处的颜色//
									}],
									globalCoord: false // 缺省为 false
								}
							},
						},
						data: [6, 2, 55, 8, 6, 83, 20],
						z: 10
					}]
				};
				ECharts.setOption(option);

				/* 实有人员分析 */
				echarts.dispose(document.getElementById("ageAnalysis"));
				var ECharts = echarts.init(document.getElementById('ageAnalysis'));
				var dataName = ['1', '2', '3', '4', '5'];

				var dataName2 = ['1-16岁', '17-40岁', '41-60岁', '61-80岁', '80岁以上'];
				var value = [12, 10, 5, 7, 8]
				var dataarr = []
				var dataarr2 = []
				value.forEach(function (ele, index) {

					dataarr.push({
						value: ele,
						name: dataName[index]
					})
					dataarr2.push({
						value: ele,
						name: dataName2[index]
					})
				})

				option = {
					backgroundColor: '#0e2147',
					animation: false,
					grid: {
						left: '0%',
						right: '0%',
						bottom: '5%',
						top: '10%',
						containLabel: true
					},
					title: {
						text: '年龄\n分布',
						x:'center',
						y: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 14,
							color: "#5dbef6",
						}
					},
					// tooltip: {
					// 	trigger: 'item',
					// 	formatter: "{a} <br/>{b}: {c} ({d}%)",
					// },

					series: [{
						name: '年龄分布',
						type: 'pie',
						radius: ['30%', '65%'],
						// center: [150, 50],
						color: [
							'#2CEDED',
							'#7049F0',
							'#B347FF',
							'#E70E65',
							'#FF714A',
							'#F6B768',
							'#B0DF5D',
							'#FC7DBC',
							'#0A9FFD'
						],
						label: {
							normal: {
								formatter: '{b}',
								fontSize: 12,
								color: '#fff'
							},

						},
						labelLine: {
							normal: {
								show: true,
								length: -10,
								length2: 0
							}
						},
						data: dataarr
					}, {
						name: '年龄分布',
						type: 'pie',
						radius: ['30%', '85%'],
							// center: [150, 50],
						color: [
							'transparent',
							'transparent',
							'transparent',
							'transparent',
							'transparent',
							'transparent',
							'transparent',
							'rgba(252,125,188,0.5)',
							'transparent'
						],
						label: {
							normal: {
								show: false
							},

						},
						labelLine: {
							normal: {
								show: false,
							}
						},
						data: dataarr2,
						zlevel: 2
					}]
				};
				ECharts.setOption(option);
			}
		]
		return communityAllCtrl;
	}
);