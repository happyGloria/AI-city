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
                name: "杨王村",
                villageCode: "310120101234",
                map2d: {
                    "center": "121.49291636012474, 30.89821546263072",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [ 121.50875175837537,30.905388970213668 ],
                                [ 121.50547879759817,30.904974663517525 ],
                                [ 121.50471421893799,30.906674479305607 ],
                                [ 121.4945392668628,30.90554941613237 ],
                                [ 121.48700205783915,30.90473555565093 ],
                                [ 121.48635593100904,30.905708855004256 ],
                                [ 121.4843317021055,30.905353189210555 ],
                                [ 121.48120926020262,30.90508628774022 ],
                                [ 121.47613827751452,30.90387532225105 ],
                                [ 121.47466309527978,30.90649313339673 ],
                                [ 121.46979717968432,30.905172780839035 ],
                                [ 121.47167063547977,30.901580695293017 ],
                                [ 121.47322111785745,30.898778883368305 ],
                                [ 121.47694612727092,30.899424549721513 ],
                                [ 121.47723688314204,30.898680124200702 ],
                                [ 121.4787226503456,30.89886850332268 ],
                                [ 121.4817382171916,30.88873741575875 ],
                                [ 121.4854851617607,30.88917187491166 ],
                                [ 121.48903831997369,30.89032355756704 ],
                                [ 121.49187014377782,30.89081975867889 ],
                                [ 121.49212867232835,30.889541483324724 ],
                                [ 121.49356071866401,30.89001507857948 ],
                                [ 121.49410997983179,30.888627240531772 ],
                                [ 121.49769548751237,30.88942014181624 ],
                                [ 121.49778153843843,30.89047861012723 ],
                                [ 121.49804000198719,30.889927273030903 ],
                                [ 121.50468316623045,30.891686069028847 ],
                                [ 121.50498465582002,30.891438506340677 ],
                                [ 121.5091189798863,30.891275666146527 ],
                                [ 121.50922667448273,30.89087109933793 ],
                                [ 121.51189662462153,30.89063946561109 ],
                                [ 121.5095487896247,30.901306226563104 ],
                                [ 121.50873022679046,30.905379707914477 ],
                                [ 121.50875175837537,30.905388970213668 ]
                            ]
                        ]
                    }
                }
            },
            {
                name: "江海村",
                villageCode: "310120101203",
                map2d: {
                    "center": "121.43076544677004, 30.899537539241482",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [ 121.43341464643284, 30.914673252886928 ],
                                [ 121.44571973679719, 30.889340769947314 ],
                                [ 121.44532173095598, 30.8893030868291 ],
                                [ 121.4436652385658, 30.889097058277308 ],
                                [ 121.44155714611615, 30.888742957140916 ],
                                [ 121.43999240173066, 30.887653936811656 ],
                                [ 121.43956225268424, 30.887321802430606 ],
                                [ 121.4265538643678, 30.881538466144658 ],
                                [ 121.4256076610165, 30.886414359445816 ],
                                [ 121.42507013244543, 30.88840123783557 ],
                                [ 121.41920125787018, 30.91021818324372 ],
                                [ 121.41748187124102, 30.91549679787799 ],
                                [ 121.41752484583004, 30.915460047492562 ],
                                [ 121.43341464643284, 30.914673252886928 ]
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