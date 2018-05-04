/**
 * 水电燃气柱状图页面
 * Created by xx on 2017/11/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js', 'notify'],
    function (app, controllers, $, configFile, notify) {
        var peopleChartCtrl = ['$scope', '$state', '$stateParams', 'moreService','mapService','$compile',
            function ($scope,$state,$stateParams,moreService,mapService,$compile) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
                var villageCode = $stateParams.villageCode;
                var key1 = 'user_' + villageCode;
                var key2 = 'user2_' + villageCode;
                var key3 = 'user3_' + villageCode;
                // 取值时：把获取到的Json字符串转换回对象
                //电
                var electricDatastr = sessionStorage.getItem(key1);
                var electricData = JSON.parse(electricDatastr);
                sessionStorage.removeItem(key1);
                // var arr1 = [0,0,0,0,0,0,0,0];
                // var arr2 = [0];
                // var arr3 = arr1.concat(electricData);
                // var electric = electricData.concat(arr2);
                //煤
                var gasDatastr = sessionStorage.getItem(key2);
                var gasData = JSON.parse(gasDatastr);
                sessionStorage.removeItem(key2);
                // var gas = gasData.concat(arr2);
                //水
                var waterDatastr = sessionStorage.getItem(key3);
                var waterData = JSON.parse(waterDatastr);
                sessionStorage.removeItem(key3);
                // var water = waterData.concat(arr2);
                var option = {
                    title : {
                        text: '水电煤量',
                        textStyle:{
                            color:'#FFFFFF',
                        }
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['水','电','煤'],
                        textStyle:{
                            color:'#FFFFFF',
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                            axisLine:{
                                lineStyle:{//坐标轴线颜色
                                    color:'#FFFFFF',
                                    width:2,//坐标轴粗细
                                }
                            } 
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#FFFFFF',
                                    width:2,
                                }
                            } 
                        }
                    ],
                    series : [
                        {
                            name:'水',
                            type:'bar',
                            // barWidth: '60%',
                            data:waterData,
                            itemStyle:{
                                normal:{
                                    color:'#00FFFF'//圆柱颜色
                                }
                            },
                            
                        },
                        {
                            name:'电',
                            type:'bar',
                            // barWidth: '60%',
                            data:electricData,
                            itemStyle:{
                                normal:{
                                    color:'#FFFF00'//圆柱颜色
                                }
                            },
                            
                        },
                        {
                            name:'煤',
                            type:'bar',
                            // barWidth: '60%',
                            data:gasData,
                            itemStyle:{
                                normal:{
                                    color:'#FF0000'//圆柱颜色
                                }
                            },
                            
                        }
                    ]
                };
               var myChart = echarts.init(document.getElementById('main'),'dark');
               myChart.setOption(option);
            }
      ];
      return peopleChartCtrl;
});