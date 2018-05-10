/**
 * 
 **/
define([],function(){
    return {
        villageNameMap: [
            { id: 1, pId: 0, code: '3101201', name: '奉贤区', addressName: '奉贤区' },
            { id: 2, pId: 1, code: '310120101', name: '南桥镇', addressName: '奉贤区南桥镇' },
            { id: 4, pId: 2, code: '310120101234', name: '杨王村', addressName: '奉贤区南桥镇杨王村' },
            { id: 5, pId: 2, code: '310120101203', name: '江海村', addressName: '奉贤区南桥镇江海村' },
            { id: 3, pId: 1, code: '310120106', name: '金汇镇', addressName: '奉贤区金汇镇' },
            { id: 6, pId: 3, code: '310120106203', name: '金星村', addressName: '奉贤区金汇镇金星村' },
            { id: 7, pId: 3, code: '310120106005', name: '金碧汇虹苑', addressName: '奉贤区金汇镇金碧汇虹苑' }
        ],
        communityAllInfo: [
            {
                name: "田林十二村",
                villageCode:'310104006001',
                map2d:{
                    "center": "13517386.928907,3655120.6969577",
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    [13517181.741499998, 3655202.4809999987],
                                    [13517239.950000003, 3655056.4306999967],
                                    [13517312.939199999, 3654907.1657000035],
                                    [13517425.685000002, 3654917.9033999965],
                                    [13517425.685000002, 3654930.1750999987],
                                    [13517506.217699997, 3654930.9421000034],
                                    [13517507.751699999, 3654944.7476999983],
                                    [13517525.3922, 3654948.5825999975],
                                    [13517560.673199996, 3654946.2815999985],
                                    [13517572.177900001, 3654949.3495000005],
                                    [13517576.0128, 3654953.1843999997],
                                    [13517573.711800002, 3654990.7664000019],
                                    [13517552.2364, 3655198.6174999997],
                                    [13517444.414300002, 3655159.6626000032],
                                    [13517380.9142, 3655298.5691],
                                    [13517182.476300001, 3655212.0502000004],
                                    [13517181.741499998, 3655202.4809999987]
                                ]
                            ]
                        ],
                        "type": "MultiPolygon"
                    },
                }
            },{
                name: "田林十三村",
                villageCode:'310104006011',
                map2d:{
                    "center": "13516948.194300003,3655262.3752999976",
                    "geometry": {
                        "coordinates": [
                            [
                                [
                                    [13516784.230800003,3655305.7338000014], 
                                    [13516816.607699998,3655229.3668000028], 
                                    [13516833.554700002,3655232.141900003], 
                                    [13516859.465499997,3655174.4346000031], 
                                    [13516966.596,3655218.8475999981], 
                                    [13516986.554300003,3655184.8302000016], 
                                    [13517074.137199998,3655223.9126999974], 
                                    [13517032.023599997,3655322.6604000032], 
                                    [13517003.364299998,3655387.7476999983], 
                                    [13516898.038999997,3655342.8549000025], 
                                    [13516923.598700002,3655275.1335000023], 
                                    [13516880.979999997,3655257.6300000027], 
                                    [13516847.148500003,3655329.7421000004], 
                                    [13516784.230800003,3655305.7338000014]
                                ]
                            ]
                        ],
                        "type": "MultiPolygon"
                    },
                }
            }
        ]
    }
})