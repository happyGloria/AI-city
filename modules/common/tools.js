/*
 * 常用公共方法
 * Leon - https://github.com/threetowns
 * 2018年5月14日 10:00
 **/

define([], function() {
    var tools = {
        // data:    [{"value":8,"name":"江海村"},{"value":6,"name":"杨王村"}]
        // return:  ['江海村','杨王村'] [8, 6]
        // 适用于图表
        jsonToBarEChartsData: function(data){
            if(data.length==0){
                return {
                    xAxisData : ["杨王村","江海村","新强村","金碧汇虹苑"],
                    seriesData: [0,0,0,0]
                }
            }
            data.sort(function(a, b){
                return parseInt(b.value) - parseInt(a.value);
            })
            var xAxisData = [],
                seriesData = [];
            data.forEach(function(element) {
                xAxisData.push(element.name)
                seriesData.push(element.value)
            }, this);
            return {
                xAxisData : xAxisData,
                seriesData: seriesData
            }
        }
    }
    return tools
});