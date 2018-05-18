/**
 * 
 **/
define([],function(){
    return {
        WeekAnalysisType: { '过车感知': 9, '开门记录': 10, '人脸抓拍': 11, 'MAC感知': 12, '事件感知': 13 },
        villageCodeNameInfo: [
            { id: 4, pId: 2, code: '310120101234', name: '杨王村', addressName: '奉贤区南桥镇杨王村' },
            { id: 5, pId: 2, code: '310120101203', name: '江海村', addressName: '奉贤区南桥镇江海村' },
            { id: 6, pId: 3, code: '310120106203', name: '新强村', addressName: '奉贤区金汇镇新强村' },
            { id: 7, pId: 3, code: '310120106005', name: '金碧汇虹苑', addressName: '奉贤区金汇镇金碧汇虹苑' }
        ],
        villageNameMap: [
            { id: 1, pId: 0, code: '3101201', name: '奉贤区', addressName: '奉贤区' },
            { id: 2, pId: 1, code: '310120101', name: '南桥镇', addressName: '奉贤区南桥镇' },
            { id: 4, pId: 2, code: '310120101234', name: '杨王村', addressName: '奉贤区南桥镇杨王村' },
            { id: 5, pId: 2, code: '310120101203', name: '江海村', addressName: '奉贤区南桥镇江海村' },
            { id: 3, pId: 1, code: '310120106', name: '金汇镇', addressName: '奉贤区金汇镇' },
            { id: 6, pId: 3, code: '310120106203', name: '新强村', addressName: '奉贤区金汇镇新强村' },
            { id: 7, pId: 3, code: '310120106005', name: '金碧汇虹苑', addressName: '奉贤区金汇镇金碧汇虹苑' }
        ],
        villageAllInfo: [
            {
                name: "江海村",
                villageCode: "310120101203",
                map2d: {
                    "center": "121.4307955058236, 30.89933443349524",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [ 121.43362430500338, 30.914604627015834 ],
                                [ 121.44576275262057, 30.88948809489422 ],
                                [ 121.42645176754455, 30.881455491388028 ],
                                [ 121.41766449495186, 30.915561392773373 ],
                                [ 121.41760004211248, 30.915506126263658 ],
                                [ 121.43362430500338, 30.914604627015834 ]
                            ]
                        ]
                    }
                }
            },{
                name: "杨王村",
                villageCode: "310120101234",
                map2d: {
                    "center": "121.49291636012474, 30.89821546263072",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [ 121.47560682410649, 31.01384298861847 ],
                                [ 121.51626292993991, 31.00778669160105 ],
                                [ 121.52040376155647, 30.91864587904125 ],
                                [ 121.47355126197134, 30.877583015100452 ],
                                [ 121.42569975504014, 30.87776865743584 ],
                                [ 121.42844702010949, 30.927235144248396 ],
                                [ 121.43532381265447, 30.96903410607209 ],
                                [ 121.47560682410649, 31.01384298861847 ]
                            ]
                        ]
                    }
                }
            }
        ],
        layerList:[{
            id: 0, name: '小区', type: 'village', isChecked: 2, hasChild: 'false'
        },
        {
            id: 1, name: '动态感知', type: 'dynamic', isChecked: 2, hasChild: 'true',
            child: [
                { id: 11, name: '人脸抓拍', isChecked: 2 },
                { id: 12, name: '车辆过车', isChecked: 2 },
                { id: 23, name: '实时警情', isChecked: 2 }
            ]
        },
        {
            id: 2, name: '实有力量', type: 'power', isChecked: 2, hasChild: 'true',
            child: [
                { id: 21, name: '实有力量', isChecked: 2 },
                { id: 22, name: '实时警力', isChecked: 2 }
            ]
        },
        { id: 3, name: '实有房屋', type: 'house', isChecked: 0 },
        { id: 4, name: '实有单位', type: 'company', isChecked: 0 },
        {
            id: 5, name: '实有安防设施', type: 'facility', isChecked: 0, hasChild: 'true',
            child: [
                { id: 50, name: 'CK', isMouseOn: 'false', isChecked: 0 },
                { id: 52, name: '卡口', isMouseOn: 'false', isChecked: 0 },
                { id: 49, name: '车棚', isMouseOn: 'false', isChecked: 0 },
                { id: 53, name: 'wifi', isMouseOn: 'false', isChecked: 0 },
                { id: 54, name: '门禁', isMouseOn: 'false', isChecked: 0 },
                { 
                    id: 51, name: '监控', isMouseOn: 'false', isChecked: 0, hasChild: 'true',
                    child: [
                        { id: 511, name: '小区监控', isMouseOn: 'false', isChecked: 0 },
                        { id: 512, name: '道路监控', isMouseOn: 'false', isChecked: 0 }
                    ]
                },
                {
                    id: 551, name: '消防', isMouseOn: 'false', isChecked: 0, hasChild: 'true',
                    child: [
                        { id: 551, name: '烟感', isChecked: 0 },
                        { id: 552, name: '电气', isChecked: 0 },
                        { id: 553, name: '消防栓', isChecked: 0 },
                        { id: 554, name: '微型消防站', isChecked: 0 }
                    ]
                }
            ]
        },
        {
            id: 6, name: '小区出入口', type: 'io', isChecked: 0
        },
        {
            id: 7, name: '窨井盖', type: 'manhole', isChecked: 0
        }
    ]
    }
})