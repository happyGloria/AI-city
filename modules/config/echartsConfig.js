/*
 * 配置echarts图标
 **/

define([],function(){
    return{
        // 一周感知数据统计
        BarEcharts: function(xAxisdData, seriesData){
            return {
                xAxis: {
                    type: 'category',
                    data: xAxisdData, // ['MAC感知', '开门记录', '事件感知', '人脸抓拍', '过车感知'],
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: { color: '#5dbef6', interval: 0, rotate: 20, textStyle: { "fontSize": 10 } }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle:{ color:'#0c3b71' } },
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: { fontSize: 10, color: '#5dbef6' }
                },
                grid: { left: '0', top:'12%', right: '5%', bottom: '3%', containLabel: true },
                series: [{
                    data: seriesData, // [120, 200, 150, 80, 70]
                    type: 'bar',
                    barWidth: 26,
                    label:{
                        normal:{
                            show:true, position:'top',
                            textStyle:{ fontSize: 12, color:'#5dbef6' }
                        },
                        emphasis: { textStyle:{ color:'#ffcb54' } }
                    },
                    itemStyle: {
                        normal: {
                          color: new echarts.graphic.LinearGradient( 0, 1, 1, 1,
                            [{offset: 0, color: 'rgba(0, 99, 201, 0.4)'}, {offset: 0.7, color: 'rgba(0, 48, 120, 0.6)'}, {offset: 1, color: 'rgba(0, 89, 165, 0.5)'}]
                          )
                        },
                        emphasis: {
                          color: new echarts.graphic.LinearGradient( 0, 1, 1, 1,
                            [{offset: 0, color: 'rgba(232, 30, 109, 0.4)'}, {offset: 0.7, color: 'rgba(175, 0, 68, 0.6)'}, {offset: 1, color: 'rgba(210, 44, 0, 0.5)'}]
                          )
                        }
                    }
                }]
            };
        },
        // 一周感知数据统计 - 实时统计
        LineEcharts: function(seriesData){
            return {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#091f3c',
                    textStyle: { color: '#5dbef6' },
                    axisPointer: { lineStyle: { color: '#1884b7' }},
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                },
                grid: {
                    left: '0',
                    top:'6%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,
                        rotate: 20,
                        textStyle: {
                            fontSize: '10',
                            color: '#5dbef6'
                        }
                    },
                    splitLine: {
                        show: true,
                        interval: 'auto',
                        lineStyle: {
                            color: ['#0c3b71']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0c3b71'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: ['#0c3b71'] } },
                    axisTick: { show: false },
                    axisLine: { lineStyle: { color: '#0c3b71' } },
                    axisLabel: { textStyle: { fontSize: 10, color: '#5dbef6' } },
                    gridIndex: 0,
                    splitArea: { show: true, areaStyle: { color: ['#0c2746', '#09233f'] }}
                },
                series: [{
                    name: '次数',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbol: 'circle',
                    symbolSize: 5,
                    data: seriesData ? seriesData : [0, 0, 0, 0, 0, 0, 0, 0], // ['1200', '1400', '1008', '1411', '626', '588', '300', '100']
                    itemStyle : {
                        normal : {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 1,
                                color: '#e9216b'
                            }, {
                                offset: 0,
                                color: '#ff6a31'
                            }], false)
                        }
                    }
                    
                }]
            };
        },
        //实有力量,实有安装设备
        triangleEcharts: function (xAxisdData, seriesData) {
            return {
                grid: {
                    left: '-8%',
                    right: '0%',
                    bottom: '5%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: {
                    data: xAxisdData ,
                    axisTick: { show: false },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#1590e7"
                        }
                    },
                    axisLabel: {
                        color: '#5dbef6',
                        interval: 0,
                        rotate: 0,
                        textStyle: {
                            fontSize: '12',
                        },
                    },
                },
                yAxis: {
                    show: false,
                },
                series: [{
                    name: 'hill',
                    // type: 'pictorialBar',
                    type: 'bar',
                    barCategoryGap: '25%',
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
                                fontSize: '14',
                                color: '#5dbef6'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color:  new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [{ offset: 0, color: '#17bcec' }, { offset: 1, color: 'rgba(21, 144, 231, 0.6)' }]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [{ offset: 0, color: '#e81e6d' }, { offset: 1, color: '#ff6b31' }]
                            ),
                        },
                    },
                    data: seriesData,
                    z: 10
                }]
            };
        },
        //实有人员分析
        pieEcharts: function (dataName, dataName2, value){
            var myColor = [
                new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgb(6, 119, 214)' }, { offset: 1, color: 'rgb(0,157,185)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgb(232,30,109)' }, { offset: 1, color: 'rgb(255,107,49)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgb(9,92,163)' }, { offset: 1, color: 'rgb(0,132,170)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgb(14,138,243)' }, { offset: 1, color: 'rgb(7,184,216)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgb(9,92,163)' }, { offset: 1, color: 'rgb(0,132,170)' }]
                ),
            ]
            var myColor2 = [
                new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgba(6, 119, 214,0.3)' }, { offset: 1, color: 'rgba(0,157,185,0.3)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgba(232,30,109,0.3)' }, { offset: 1, color: 'rgba(255,107,49,0.3)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgba(9,92,163,0.3)' }, { offset: 1, color: 'rgba(0,132,170,0.3)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgba(14,138,243,0.3)' }, { offset: 1, color: 'rgba(7,184,216,0.3)' }]
                ), new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{ offset: 0, color: 'rgba(9,92,163,0.3)' }, { offset: 1, color: 'rgba(0,132,170,0.3)' }]
                ),
            ]
            var dataarr = []
            var dataarr2 = []
            var dataColor = []
            var dataColor2=[]
            value.forEach(function (ele, index) {
                dataarr.push({
                    value: ele,
                    name: dataName[index]
                })
                dataColor.push(myColor[index])
                dataColor2.push(myColor2[index])
                dataarr2.push({
                    value: ele,
                    name: dataName2[index]
                })
            })
            return {
                tooltip: {
                    backgroundColor: '#091f3c',
                    textStyle: { color: '#5dbef6' },
                    axisPointer: { lineStyle: { color: '#1884b7' }},
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
                    formatter: "浜烘暟锛歿c} "
                },
                animation: false,
                title: {
                    text: '年龄\n分布',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 12,
                        color: "#5dbef6",
                    }
                },
                // tooltip: {
                // 	trigger: 'item',
                // 	formatter: "{a} <br/>{b}: {c} ({d}%)",
                // },

                series: [
                    {
                    type: 'pie',
                    radius: ['30%', '70%'],
                    // center: [150, 50],
                    color: dataColor,
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
                            length: -20,
                            length2: 0
                        }
                    },
                    data: dataarr,
                    zlevel: 3
                }, 
                {
                    type: 'pie',
                    radius: ['70%', '80%'],
                    // center: [150, 50],
                    color: dataColor2,
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
        },
        
        // 今日实有警情分析
        RadarEcharts: function(){
            return {
                tooltip: {
                    backgroundColor: '#091f3c',
                    textStyle: { color: '#5dbef6' },
                    axisPointer: { lineStyle: { color: '#1884b7' }},
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                },
                radar: {
                    shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#5dbef6'
                        }
                    },
                    splitNumber: 5,
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(47, 156, 207, 0.36)'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: [
                                'rgba(27, 124, 170, 0.36)', 'rgba(27, 124, 170, 0.28)', 'rgba(27, 124, 170, 0.2)', 'rgba(27, 124, 170, 0.12)', 'rgba(27, 124, 170, 0.06)'
                            ],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 0
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#1b7caa'
                        }
                    },
                    indicator: [{
                            name: '车辆感知发现',
                            max: 6500,
                            axisLabel:{ show:true, color:'#5dbef6' }
                        },
                        { name: '智能分析', max: 16000 },
                        { name: '消防告警', max: 30000 },
                        { name: '刷卡异常', max: 38000 },
                        { name: '案件接报', max: 52000 },
                        { name: '车辆滞留', max: 25000 }
                    ]
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [5000, 4000, 28000, 31000, 42000, 21000],
                        name: '数据',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [{ offset: 0, color: '#e81e6d' }, { offset: 1, color: '#ff6b31' }], false)
                            }
                        }
                    }]
                }]
            }
        }
    }
})