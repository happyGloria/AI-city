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
                    data: [0,0,0,0,0,0,0,0],
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
                    data: seriesData, // ['1200', '1400', '1008', '1411', '626', '588', '300', '100']
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
        }
    }
})