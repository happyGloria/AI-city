/**
 * Created by jgx on 2016/4/12.
 */
define([], function() {
	return {
		serviceModeToName:{
			"1":"综合指挥",
            "2":"侦查办案",
            "3":"街面勤务",
            "4":"社区勤务",
            "5":"窗口服务"
		},
		villageNameMap:[ 
          { 'code':'310104006001', 'name':'田林十二村','addressName':'田林十二村'},
          { 'code':'310104006002', 'name':'田林十四村' ,'addressName':'田林十四村'},
          { 'code':'310104006004', 'name':'宜山路655弄2-4号','addressName':'宜山路655弄' },
          { 'code':'310104006005', 'name':'高知楼','addressName':'宜山路655弄6号' },
          { 'code':'310104006006', 'name':'千鹤2/4','addressName':'柳州路600弄' },
          { 'code':'310104006007', 'name':'钦州路785弄','addressName':'钦州路785弄' },
          { 'code':'310104006008', 'name':'吴中公寓','addressName':'中山西路1536弄' },
          { 'code':'310104006009', 'name':'东航公寓','addressName':'中山西路1509弄' },
          { 'code':'310104006010', 'name':'华鼎广场' ,'addressName':'中山西路2368弄'},
          { 'code':'310104006011', 'name':'田林十三村','addressName':'田林十三村' }
        ],
		departmentList:[
			{
                code:"1,2,3,4,5",
                name:"全部"
             },
			{
                code:"1",
                name:"派出所1"
              },
              {
                code:"2",
                name:"派出所2"
              },
              {
                code:"3",
                name:"派出所3"
              },
              {
                code:"4",
                name:"派出所4"
              },
              {
                code:"5",
                name:"派出所5"
        	}
		],
		serviceModeNameList:[
			{
                code:"1,2,3,4,5",
                name:"全部"
             },
			{
                code:"1",
                name:"综合指挥"
              },
              {
                code:"2",
                name:"侦查办案"
              },
              {
                code:"3",
                name:"街面勤务"
              },
              {
                code:"4",
                name:"社区勤务"
              },
              {
                code:"5",
                name:"窗口服务"
        	}
        ],
        dutyArea:[
			{
            	code:"1601",
                name:"第一责任区块"
            },{
            	code:"1602",
                name:"第二责任区块"
            },{
            	code:"1603",
                name:"第三责任区块"
            },{
            	code:"1604",
                name:"第四责任区块"
            },{
            	code:"1605",
                name:"第五责任区块"
            },{
            	code:"1606",
                name:"第六责任区块"
            },
			
        ],
        workStatusToName:{
			"0":"下岗",
            "1":"工作",
            "2":"待命",
            "3":"休息"
		},
		workStatusNameList:[
			{
                code:"0,1,2,3",
                name:"全部"
            },
            {
                code:"0",
                name:"下岗"
            },
            {
                code:"1",
                name:"工作"
            },
            {
                code:"2",
                name:"待命"
            },
            {
                code:"3",
                name:"休息"
            }
		],
		//三维坐标映射
		coordinateMap: {
			"沁春园93号": {
				x: "-14.69",
				y: "1",
				z: "11.7"
			},
			"田林十二村30号": {
				x: "-63.3128",
				y: "3.631051",
				z: "-52.49242"
			}
		},
		//时间条件
		timeButtons: {
			"yesterday": "昨日",
			"today": "今日",
			"lastOne": "最近一天",
			"lastThird": "最近三天",
			"lastSeven": "最近七天",
			"lastMonth": "最近一个月",
			"lastThreeMonths": "最近三个月",
			"other": "自定义",
			"anytime": "时间不限",
			"all": "全部时间"
		},
		//推送的IP地址
		websocketIP:"ws://15.128.21.153:28080/zhsq/websocket",
		//多小区信息
		yitu_communityCode:{
			'310104006001':1,
			'310104006011':2,
			'310104006002':3,
			'310104006004':4,
			'310104006005':5,
			'310104006006':6,
			'310104006007':9,
			'310104006008':7,
			'310104006009':8,
			'310104006010':10
		},
		//全景多小区信息
		all_view_communityCode:{
			'310104006001':1,
			'310104006009':2,
			'310104006010':3,
			"310104006006":4,
			"310104006007":5,
			"310104006011":6,
			"310104006002":7,
			"310104006008":8,
			"310104006004":9
		},
		communityCodeToName:{
			"310104006001":"田林十二村",
			"310104006002":"田林十四村",
			"310104006004":"宜山路655弄2-4号",
			"310104006005":"高知楼",
			"310104006006":"千鹤2/4",
			"310104006007":"钦州路785弄",
			"310104006008":"吴中公寓",
			"310104006009":"东航公寓",
			"310104006010":"华鼎广场",
			"310104006011":"田林十三村"
		},
		communityCodeToCaseAddress:{
			"310104006001":"田林十二村",
			"310104006002":"田林十四村",
			"310104006004":"宜山路655弄",
			"310104006005":"宜山路655弄6号",
			"310104006006":"柳州路600弄",
			"310104006007":"钦州路785弄",
			"310104006008":"中山西路1536弄",
			"310104006009":"中山西路1509弄",
			"310104006010":"中山西路2368弄",
			"310104006011":"田林十三村"
		},
		communityAllInfo: [{
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
			},
			map3d:{}
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
			},
			map3d:{}
		
		},{
			name: "田林十四村",
			villageCode:'310104006002',
			map2d:{
				"center": "13516801.5295,3655561.4834000021",
				"geometry": {
					"coordinates": [
						[
							[
							    [13516601.1494,3655598.7025000006],
								[13516601.8193,3655588.9518999979],
								[13516603.624400001,3655583.7858000025],
								[13516639.3202,3655512.552199997],
								[13516661.127300002,3655469.3783000037],
								[13516694.537,3655403.3012999967],
								[13516715.868,3655360.9365999997],
								[13516719.044599999,3655360.0930000022],
								[13516974.4604,3655469.7546999976],
								[13516972.709299996,3655478.5537],
								[13516967.623400003,3655509.2666999996],
								[13516953.973399997,3655591.4795999974],
								[13516952.206100002,3655602.630400002],
								[13516951.196000002,3655611.744599998],
								[13516946.178000003,3655636.7782000005],
								[13516940.305600002,3655650.7947999984],
								[13516932.9578,3655668.8417999968],
								[13516915.8059,3655693.9993999973],
								[13516901.196999997,3655708.5835999995],
								[13516877.5268,3655727.7208999991],
								[13516842.263700001,3655755.8084999993],
								[13516811.701300003,3655785.7330000028],
								[13516803.217799999,3655784.6697999984],
								[13516773.425800003,3655750.9002000019],
								[13516759.050700001,3655735.5969000012],
								[13516726.3345,3655703.7749999985],
								[13516705.9379,3655684.9239000008],
								[13516611.681899998,3655614.3081],
								[13516605.525400002,3655608.5363000035],
								[13516601.1494,3655598.7025000006]
  
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		},{
			name: "东航公寓",
			villageCode:'310104006009',
			map2d:{
				"center": "13516547.833700001,3657484.196800001",
				"geometry": {
					"coordinates": [
						[
							[
							    [13516478.0143,3657518.3241000026],
								[13516527.787500001,3657435.6687000021],
								[13516616.182,3657479.5242],
								[13516612.7071,3657487.8008999974],
								[13516594.5328,3657514.8885999992],
								[13516565.0317,3657518.5926999971],
								[13516515.2203,3657514.9011000022],
								[13516478.0143,3657518.3241000026]
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		},{ name: "高知楼",
			villageCode:'310104006005',
			map2d:{
				"center": "13517070.597499996,3655594.3984000012",
				"geometry": {
					"coordinates": [
						[
							[
							    [13516963.837899998,3655578.7879000008],
								[13516969.658699997,3655546.5086999983],
								[13516979.712899998,3655547.0379000008],
								[13516996.646300003,3655538.5711999983],
								[13517000.350500003,3655541.7462000027],
								[13517010.933799997,3655552.8586999997],
								[13517023.1047,3655560.7961999997],
								[13517067.025600001,3655572.9671000019],
								[13517158.042400002,3655597.8379999995],
								[13517160.159100004,3655603.6587999985],
								[13517142.696599998,3655645.9922999963],
								[13517112.534000002,3655633.2921999991],
								[13517101.421499997,3655639.6422000006],
								[13517094.5423,3655641.7589000016],
								[13517087.134000003,3655639.1130999997],
								[13517075.492299996,3655626.9421999976],
								[13517069.142300002,3655613.7129999995],
								[13517052.7381,3655604.7172000036],
								[13517026.279700004,3655598.3672000021],
								[13516997.175499998,3655592.0170999989],
								[13516977.067100003,3655586.7255000025],
								[13516968.6004,3655581.9629999995],
								[13516963.837899998,3655578.7879000008]

							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		},{
			name: "华鼎广场",
			villageCode:'310104006010',
			map2d:{
				"center": "13517762.259300001,3656163.7889000028",
				"geometry": {
					"coordinates": [
						[
							[
							    [13517666.7298,3656176.0473000035],
								[13517677.012999997,3656160.7827999964],
								[13517757.638700001,3656056.5996000022],
								[13517815.5924,3656108.3342000023],
								[13517864.932499997,3656164.0217000023],
								[13517865.957599998,3656168.7391000018],
								[13517824.948700003,3656211.4113000035],
								[13517806.331100002,3656228.3128999993],
								[13517793.067599997,3656239.2405999973],
								[13517763.150300004,3656260.4710000008],
								[13517747.274999999,3656252.8381000012],
								[13517703.0841,3656212.7410999984],
								[13517684.369400002,3656196.2634999976],
								[13517672.2923,3656183.942400001],
								[13517666.7298,3656176.0473000035]
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		},{
			name: "千鹤小区2,4",
			villageCode:'310104006006',
			map2d:{
				"center": "13516438.406100001,3655933.3976000026",
				"geometry": {
					"coordinates": [
						[
							[
							    [13516401.5839,3655984.9615999982],
								[13516394.176800001,3655978.4355000034],
								[13516398.932,3655956.2584000006],
								[13516405.5946,3655927.5284999982],
								[13516404.2168,3655922.6860999987],
								[13516400.539299998,3655917.3950000033],
								[13516396.243700001,3655911.2602000013],
								[13516400.6655,3655889.9447999969],
								[13516405.716400001,3655868.6437999979],
								[13516475.5825,3655886.4368000031],
								[13516472.702799998,3655909.7298000008],
								[13516470.716200002,3655931.5569000021],
								[13516470.716200002,3655946.4179999977],
								[13516469.7216,3655965.3953000009],
								[13516470.490200002,3656002.5927999988],
								[13516443.998599999,3656000.2577999979],
								[13516431.620000001,3655999.9003000036],
								[13516413.485599998,3655996.3479000032],
								[13516401.5839,3655984.9615999982]
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		
		},{
			name: "钦州路785弄",
			villageCode:'310104006007',
			map2d:{
				"center": "13517281.8213,3655904.3955999985",
				"geometry": {
					"coordinates": [
						[
							[
							    [13517223.7302,3655906.6877000034],
								[13517259.524099998,3655854.6662999988],
								[13517285.722599998,3655865.2260000035],
								[13517330.241499998,3655892.8241999969],
								[13517296.608999997,3655953.9305000007],
								[13517223.7302,3655906.6877000034]
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		},{
			name: "吴中公寓",
			villageCode:'310104006008',
			map2d:{
				"center": "13516455.2923,3657114.4227000028",
				"geometry": {
					"coordinates": [
						[
							[
							    [13516491.4903,3657145.5252000019], 
							    [13516478.261100002,3657149.2294000015], 
							    [13516467.6778,3657148.1710999981], 
							    [13516451.2295,3657144.938699998], 
							    [13516432.7086,3657142.2929000035], 
							    [13516418.1565,3657133.0324999988], 
							    [13516406.2502,3657121.126199998], 
							    [13516402.2815,3657098.6366000026], 
							    [13516404.927299999,3657082.761500001], 
							    [13516412.811900001,3657071.0352], 
							    [13516425.3532,3657067.685999997], 
							    [13516439.323199999,3657076.1468999982], 
							    [13516496.208700001,3657103.928199999], 
							    [13516518.698399998,3657118.4803000018], 
							    [13516509.4379,3657133.0324999988], 
							    [13516500.177499998,3657140.9699999988], 
							    [13516491.4903,3657145.5252000019]
							]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		
		},{
			name: "宜山路655弄2,4号",
			villageCode:'310104006004',
			map2d:{
				"center": "13517026.879,3655680.3110999987",
				"geometry": {
					"coordinates": [
						[
						  [
							[13516923.699699998,3655715.5042999983],
							[13516920.549099997,3655710.4975000024],
							[13516953.564999998,3655642.8439000025],
							[13516963.837899998,3655578.7879000008],
							[13516977.067100003,3655586.7255000025],
							[13517052.7381,3655604.7172000036],
							[13517069.142300002,3655613.7129999995],
							[13517075.492299996,3655626.9421999976],
							[13517087.134000003,3655639.1130999997],
							[13517094.5423,3655641.7589000016],
							[13517112.534000002,3655633.2921999991],
							[13517142.696599998,3655645.9922999963],
							[13517098.130999997,3655746.0961999968],
							[13517090.288599998,3655762.2228000015],
							[13517077.446900003,3655776.2233999968],
							[13517065.1796,3655772.7993],
							[13517039.480400003,3655752.9993000031],
							[13516963.588,3655726.6542000026],
							[13516923.699699998,3655715.50429999]
							
						  ]
						]
					],
					"type": "MultiPolygon"
				},
			},
			map3d:{}
		
		
		}
		],
		//导航菜单
		navigationList: [{}],
		/*navigationList: [{
		    "name": "首页",
		    "id": "home",
		    "secondMenuList": [
		        //                    {
		        //                        "name": "我的工作台",
		        //                        "id": "gongzuotai",
		        //                        "menuID": 0,
		        //                        "href": "/#/index",
		        //                        "isSecond": true,
		        //                        "hasThirdMenu": false
		        //                    }
		    ]
		},
		    {
		        "name": "智慧云搜索",
		        "id": "search",
		        "menuId": 1,
		        "secondMenuList": [{
		            "name": "全景搜索",
		            "id": "quanjing",
		            "href": "#/index/search/",
		            "menuId": 8,
		            "isSecond": true,
		            "hasThirdMenu": false
		        },
		            {
		                "name": "条件搜索",
		                "id": "fankong",
		                "menuId": 9,
		                "href": "#/index/search/pan/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            },
		            {
		                "name": "数据碰撞",
		                "id": "shuju",
		                "menuId": 21,
		                "href": "#/index/search/collision/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            },
		            {
		                "name": "人脸检索",
		                "id": "faceSearch",
		                //"menuId": 21,
		                //"href": "#/index/search/collision/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            }
		        ]
		    },
		    {
		        "name": "智慧云地图",
		        "id": "map",
		        "menuId": 2,
		        "secondMenuList": [{
		            "name": "轨迹刻画",
		            "menuId": 11,
		            "id": "guiji",
		            "href": "#/index/map/tracePortray/",
		            "isSecond": true,
		            "hasThirdMenu": false
		            /!*"thirdMenuList": [{
		                "name": "跨区域轨迹",
		                "id": "guiji",
		                "menuId": 83,
		                "href": "#/index/map/tracePortray/"
		            },
		                {
		                    "name": "市内轨迹",
		                    "id": "cityguiji",
		                    "menuId": 79,
		                    "href": "#/index/map/cityOrbit/"
		                }
		            ]*!/
		        },
		            {
		                "name": "时空猎人",
		                "menuId": 67,
		                "id": "时空猎人",
		                "href": "#/index/map/collide/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "时空碰撞",
		                    "menuId": 68,
		                    "id": "cludecollide",
		                    "href": "#/index/map/collide/"
		                },
		                    {
		                        "name": "时空对比",
		                        "menuId": 69,
		                        "id": "cludeduibi",
		                        "href": "#/index/map/contrast/"
		                    },
		                    {
		                        "name": "区域布控",
		                        "id": "quyubukong",
		                        "menuId": 70,
		                        "href": "#/index/map/area/"
		                    }
		                    /!*{
		                        "name": "人脸MAC关联",
		                        "id": "faceMac",
		                        "menuId": 70,
		                        "href": "#/index/map/faceMac/"
		                    }*!/
		                    /!*{
		                        "name": "人脸聚类",
		                        "id": "faceCluster",
		                        "menuId": 70,
		                        "href": "#/index/map/faceCluster/"
		                    }*!/
		                    /!*{
		                        "name": "轨迹查脸",
		                        "id": "faceOrbit",
		                        "menuId": 70,
		                        "href": "#/index/map/faceOrbit/"
		                    }*!/
		                ]
		            },
		            {
		                "name": "热力图",
		                "id": "heatmap",
		                "menuId": 22,
		                "href": "#/index/map/heatmap/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            },
		            {
		                "name": "基站查询",
		                "id": "jizhan",
		                "menuId": 65,
		                "href": "#/index/map/baseStation/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            }
		        ]
		    },
		    {
		        "name": "智慧数据眼",
		        "id": "eye",
		        "menuId": 3,
		        "hasThirdMenu": true,
		        "secondMenuList": [{
		            "name": "超级云档案",
		            "id": "yundangan",
		            "href": "#/index/eye/archive/people-info/",
		            "menuId": 12,
		            "isSecond": true,
		            "hasThirdMenu": true,
		            "thirdMenuList": [{
		                "name": "人员全息档案",
		                "menuId": 59,
		                "id": "renyuanxinxi",
		                "href": "#/index/eye/archive/people-info/"
		            },
		                {
		                    "name": "人员画像",
		                    "menuId": 60,
		                    "id": "renyuanhuaxiang",
		                    "href": "#/index/eye/archive/people-portrait/"
		                },
		                {
		                    "name": "车辆电子档案",
		                    "menuId": 23,
		                    "id": "celiangxinxi",
		                    "href": "#/index/eye/archive/car-info/"
		                },
		                {
		                    "name": "车型库",
		                    "menuId": 24,
		                    "id": "celianghuaxiang",
		                    "href": "#/index/eye/archive/car-portrait/"
		                },
		                {
		                    "name": "车辆画像",
		                    "menuId": 86,
		                    "id": "chelianghuaxiang",
		                    "href": "#/index/eye/archive/car-portrait1/"
		                },
		                {
		                    "name": "案件电子档案",
		                    "menuId": 78,
		                    // "menuId": 100,
		                    "id": "caseInfo",
		                    "href": "#/index/eye/archive/case-info/"
		                }
		            ]
		        },
		            {
		                "name": "人立方",
		                "id": "renlifang",
		                "href": "#/index/eye/people/atlas/",
		                "menuId": 13,
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "关系图谱",
		                    "id": "guanxitupu",
		                    "href": "#/index/eye/people/atlas/",
		                    "menuId": 61
		                },
		                    {
		                        "name": "关系发现",
		                        "menuId": 62,
		                        "id": "guanxifaxian",
		                        "href": "#/index/eye/people/find/"
		                    },
		                    {
		                        "name": "六度空间",
		                        "menuId": 63,
		                        "id": "sixdegree",
		                        "href": "#/index/eye/people/space/"
		                    }
		                ]
		            }/!*,
		            {
		                "name": "车立方",
		                "href": "#/index/eye/carPortrait/",
		                "id": "celifang",
		                "menuId": 14,
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [
		                    /!*{
		                        "name": "车辆画像",
		                        "menuId": 86,
		                        "id": "chelianghuaxiang",
		                        "href": "#/index/eye/carPortrait/"
		                    }*!/
		                    {
		                        "name": "人车关系",
		                        //"menuId": 86,
		                        "id": "peopleCarRelation"
		                        //"href": "#/index/eye/carPortrait/"
		                    },
		                    {
		                        "name": "车车关系",
		                        //"menuId": 86,
		                        "id": "twoCarRelation"
		                        //"href": "#/index/eye/carPortrait/"
		                    }
		                ]
		            }*!/
		        ]
		    },
		    {
		        "name": "智慧云分析",
		        "id": "cloud",
		        "menuId": 4,
		        "secondMenuList": [{
		            "name": "涉案人员统计",
		            "id": "renyuan",
		            "menuId": 15,
		            "href": "#/index/statistic/",
		            "isSecond": true,
		            "hasThirdMenu": false
		        },
		            {
		                "name": "车辆统计",
		                "id": "cheliang",
		                "menuId": 16,
		                "href": "#/index/vehicle-statistic/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            },
		            {
		                "name": "案件统计",
		                "id": "anjian",
		                "menuId": 17,
		                "href": "#/index/case-statistic/",
		                "isSecond": true,
		                "hasThirdMenu": false
		            }
		        ]
		    },
		    {
		        "name": "智慧研判台",
		        "id": "judge",
		        "menuId": 5,
		        "secondMenuList": [
		            {
		                "name": "社会治安研判",
		                "id": "shehui",
		                "menuId": 38,
		                "href": "#/index/judge/society/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "热点舆情",
		                    "menuId": 41,
		                    "id": "redianyuqing",
		                    "href": "#/index/judge/society/hot-situation"
		                },
		                {
		                    "name": "治安态势分析",
		                    "menuId": 42,
		                    "id": "zhiantaishi",
		                    "href": "#/index/judge/society/security-situation-table"
		                },
		                {
		                    "name": "维稳研判",
		                    "menuId": 72,
		                    "id": "weiwen",
		                    "href": "#/index/judge/society/stability"
		                }
		                ]
		            },
		            {
		                "name": "人员动态研判",
		                "id": "renyuan",
		                "menuId": 39,
		                "href": "#/index/judge/people/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "外来前科人员",
		                    "menuId": 88,
		                    "id": "wailaiqianke",
		                    "href": "#/index/judge/people/foreign-preRecord"
		                },
		                    {
		                        "name": "进辖区无落脚点",
		                        "menuId": 43,
		                        "id": "jinxiaqu",
		                        "href": "#/index/judge/people/trail"
		                    },
		                    {
		                        "name": "积分模型",
		                        "menuId": 45,
		                        "id": "jifenmoxing",
		                        "href": "#/index/judge/people/points-model"
		                    },
		                    {
		                        "name": "预警分析",
		                        "menuId": 44,
		                        "id": "yujing",
		                        "href": "#/index/judge/people/early-warning"
		                    }
		                ]
		            },
		            {
		                "name": "车辆动态研判",
		                "id": "cheliangyanpan",
		                "menuId": 85,
		                "href": "#/index/judge/car/searchbyplatenumber/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [
		                    {
		                        "name": "车牌搜车",
		                        "menuId": 25,
		                        "id": "cepaisouce",
		                        "href": "#/index/judge/car/searchbyplatenumber/"
		                    },
		                    {
		                        "name": "车型搜车",
		                        "menuId": 26,
		                        "id": "cexingsouce",
		                        "href": "#/index/judge/car/searchbycarmodel/"
		                    },
		                    {
		                        "name": "类别搜车",
		                        "menuId": 27,
		                        "id": "leibiesouce",
		                        "href": "#/index/judge/car/searchbyptype/"
		                    },
		                    {
		                        "name": "多维搜车",
		                        "menuId": 28,
		                        "id": "duowei",
		                        "href": "#/index/judge/car/searchbygroup/"
		                    },
		                    {
		                        "name": "卡口监控",
		                        "menuId": 29,
		                        "id": "kakou",
		                        "href": "#/index/judge/car/gate/"
		                    },
		                    {
		                        "name": "跟车分析",
		                        "menuId": 30,
		                        "id": "gengcefenxi",
		                        "href": "#/index/judge/car/carfollow/"
		                    },
		                    {
		                        "name": "碰撞分析",
		                        "menuId": 31,
		                        "id": "pengzhuangfenxi",
		                        "href": "#/index/judge/car/collide/"
		                    },
		                    {
		                        "name": "频次分析",
		                        "menuId": 32,
		                        "id": "pingcifenxi",
		                        "href": "#/index/judge/car/frequency/"
		                    },
		                    {
		                        "name": "套牌分析",
		                        "menuId": 33,
		                        "id": "taipaifenxi",
		                        "href": "#/index/judge/car/fakelicensed/"
		                    },
		                    {
		                        "name": "落脚点分析",
		                        "menuId": 34,
		                        "id": "luojiaodian",
		                        "href": "#/index/judge/car/foothold/"
		                    },
		                    {
		                        "name": "昼伏夜出",
		                        "menuId": 35,
		                        "id": "zhoufu",
		                        "href": "#/index/judge/car/nocturnal/"
		                    },
		                    {
		                        "name": "隐匿车辆挖掘",
		                        "menuId": 36,
		                        "id": "yinnice",
		                        "href": "#/index/judge/car/hidden/"
		                    },
		                    {
		                        "name": "频繁过车",
		                        "menuId": 37,
		                        "id": "pinghuan",
		                        "href": "#/index/judge/car/continual/"
		                    },
		                    {
		                        "name": "行车轨迹",
		                        "menuId": 58,
		                        "id": "xingceguiji",
		                        "href": "#/index/judge/car/track/"
		                    }
		                ]
		            },
		            {
		                "name": "主题研判",
		                "id": "zhuti",
		                "menuId": 40,
		                "href": "#/index/judge/theme/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "类案研判",
		                    "menuId": 47,
		                    "id": "leian",
		                    "href": "#/index/judge/theme/similar-case"
		                },
		                    {
		                        "name": "串并案研判",
		                        "menuId": 48,
		                        "id": "chuanbingan",
		                        "href": "#/index/judge/theme/series-and-case"
		                    },
		                    {
		                        "name": "流窜研判",
		                        "menuId": 66,
		                        "id": "liuchuan",
		                        "href": "#/index/judge/theme/series-people-car"
		                    }
		                ]
		            },
		            {
		                "name": "专家战法库",
		                "id": "zhanfaku",
		                // "menuId": 71,
		                "menuId": 1000,
		                "href": "#/index/tacticsList/",
		                "isSecond": true
		            }
		        ]
		    },
		    {
		        "name": "智慧数据仓",
		        "id": "data",
		        "menuId": 6,
		        "secondMenuList": []
		    },
		    {
		        "name": "平台管理",
		        "id": "platform",
		        "menuId": 7,
		        "secondMenuList": [{
		            "name": "用户中心",
		            "id": "yonghu",
		            "menuId": 20,
		            "href": "#/index/platform/",
		            "isSecond": true,
		            "hasThirdMenu": true,
		            "thirdMenuList": [{
		                "name": "机构管理",
		                "menuId": 18,
		                "id": "jigou",
		                "href": "#/index/platform/0"
		            },
		                {
		                    "name": "角色管理",
		                    "menuId": 19,
		                    "id": "juese",
		                    "href": "#/index/platform/1"
		                },
		                {
		                    "name": "用户管理",
		                    "menuId": 57,
		                    "id": "quanxian",
		                    "href": "#/index/platform/2"
		                }
		            ]
		        },
		            {
		                "name": "日志管理",
		                "id": "rizhi",
		                "menuId": 64,
		                "href": "#/index/log/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "日志查看",
		                    "menuId": 80,
		                    "id": "dialyLog",
		                    "href": "#/index/log/"
		                },
		                    {
		                        "name": "访问统计",
		                        "menuId": 81,
		                        "id": "access",
		                        "href": "#/index/log/access"
		                    },
		                    {
		                        "name": "在线人数",
		                        "menuId": 81,
		                        "id": "access",
		                        "href": "#/index/log/online"
		                    }
		                ]
		            },
		            {
		                "name": "白名单设置",
		                "id": "baimingdan",
		                "menuId": 74,
		                "href": "#/index/bwList/white",
		                "isSecond": true,
		                "hasThirdMenu": false
		            },
		            {
		                "name": "系统监控",
		                "id": "jiankong",
		                "menuId": 49,
		                "href": "#/index/system/cpu",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{

		                    "name": "资源总览",
		                    "menuId": 82,
		                    "id": "monitorconfig",
		                    "href": "#/index/system/monitorConfig"
		                },
		                    {
		                        "name": "CPU负荷",
		                        "menuId": 50,
		                        "id": "cpu",
		                        "href": "#/index/system/cpu"
		                    },
		                    {
		                        "name": "内存使用",
		                        "menuId": 51,
		                        "id": "memery",
		                        "href": "#/index/system/memory"
		                    },
		                    {
		                        "name": "磁盘使用",
		                        "menuId": 52,
		                        "id": "cipan",
		                        "href": "#/index/system/disk"
		                    },
		                    {
		                        "name": "网络状况",
		                        "menuId": 53,
		                        "id": "net",
		                        "href": "#/index/system/net"
		                    },
		                    {
		                        "name": "端口监视",
		                        "menuId": 54,
		                        "id": "duankou",
		                        "href": "#/index/system/port"
		                    },
		                    {
		                        "name": "告警配置",
		                        "menuId": 77,
		                        "id": "alarmonfig",
		                        "href": "#/index/system/alarmConfig"
		                    }
		                ]

		            },
		            {
		                "name": "系统配置",
		                "id": "peizhi",
		                "menuId": 55,
		                "href": "#/index/collision/",
		                "isSecond": true,
		                "hasThirdMenu": true,
		                "thirdMenuList": [{
		                    "name": "图层管理",
		                    "menuId": 10,
		                    "id": "tuceng",
		                    "href": "#/index/mapManagement/"
		                },
		                    {
		                        "name": "数据维护",
		                        "menuId": 75,
		                        "id": "shujuweihu",
		                        "href": "#/index/sysConfig/table"
		                    },
		                    {
		                        "name": "系统参数",
		                        "menuId": 76,
		                        "id": "systemparam",
		                        "href": "#/index/sysParam/"
		                    }
		                    /!*{
		                        "name": "人脸库管理",
		                        "menuId": 76,
		                        "id": "faceManagement",
		                        "href": "#/index/faceManagement/"
		                    }*!/
		                ]
		            }
		        ]
		    }
		],*/

		cssFileList: [
			'./template/css/base.css',
			'./template/css/navigation.css',
			'./template/css/home.css',
			'./template/css/search.css',
			'./template/css/map.css',
			'./template/css/eye.css',
			'./template/css/statistic.css',
			'./template/css/dataHouse.css',
			'./template/css/platform.css',
			'./template/css/layer/skin/layer.css',
			'./template/css/zTreeStyle/zTreeStyle.css',
			'./template/css/dropdownlist/dropdownlist.css',
			'./template/css/jquery.mCustomScrollbar.css',
			'./template/css/jquery.datetimepicker.css',
			'./template/css/odometer-theme-car.css'
		],
		chartTheme: {
			'default': {
				'home': {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						textStyle: {
							color: '#999'
						}
						//data: [title]
					},
					//calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#999'
							}
						},
						splitLine: {
							lineStyle: {
								color: '#ccc'
							}
						}
						//data: ['2016-04-30', '2016-05-01', '2016-05-02', '2016-05-03', '2016-05-04', '2016-05-05', '2016-05-06']
					}],
					yAxis: [{
						name: '单位：（万）',
						nameTextStyle: {
							color: '#999'
						},
						nameLocation: 'end',
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: '#ccc',
								width: 1,
								type: 'solid'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#999'
							},
							formatter: function(value, index) {
								return value / 10000;

							}
						},
						splitLine: {
							lineStyle: {
								color: '#ccc'
							}
						}
					}],
					series: [{
						symbolSize: 4,
						itemStyle: {
							normal: {
								color: '#5bdaf1',
								lineStyle: {
									color: '#83dff2'
								}
								/*areaStyle: {
								 type: 'default',
								 color: '#d0ebf5'
								 }*/
							}
						},
						//name: title,
						smooth: true,
						type: 'line',
						//data: numList,
						symbol: 'emptyCircle'

					}]
				},
				'statistic': {
					'trend': {
						'line': {
							'xAxis': {
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#848484'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							}
						},
						'bar': {
							'xAxis': {
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#848484'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							}
						}
					},
					'area': {
						'map': {},
						'heat': {}
					},
					'car': {
						'flow': {
							'title': {
								'textStyle': {
									'color': '#333'
								}
							},
							'xAxis': {
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#333'
								},
								'axisLine': {
									'lineStyle': {
										'color': '#848484'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#eee"
									}
								}
							}
						},
						'amount': {
							'title': {
								'textStyle': {
									'color': '#333'
								},
								'subtextStyle': {
									'color': '#333'
								}
							},
							'xAxis': {
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#eee"
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#888'
								},
								'axisLine': {
									'lineStyle': {
										'color': '#eee'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': '#eee'
									}
								}
							}
						}
					}

				},
				'judge': {
					'warn': {},
					'similarCase': {
						title: {
							text: '辖区类案发案数量统计图表',
							//subtext: startTime + '-' + endTime,
							x: 'center',
							textStyle: {
								fontSize: 22,
								color: '#333'
							},
							subtextStyle: {
								fontSize: 16,
								color: '#333'
							},
							padding: [0, 0, 100, 0]
						},
						tooltip: {
							trigger: 'item'
						},
						legend: {
							x: '800',
							data: ['上期发案数量', '本期发案数量']
						},
						toolbox: {
							show: true,
							feature: {
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						xAxis: [{
							type: 'category',
							splitLine: {
								lineStyle: {
									width: 1,
									color: ['#eee'],
									type: 'solid'
								}
							},
							axisLine: {
								lineStyle: {
									width: 2,
									color: '#aaa',
									type: 'solid'
								}
							},
							axisLabel: {
								rotate: -15
							},
							splitArea: {
								show: true,
								areaStyle: {
									"color": [
										"#fff",
										"rgba(200,200,200,0.1)"
									],
									type: 'default'
								}
							},
							splitNumber: 10,
							data: []
						}],
						yAxis: [{
								type: 'value',
								name: '单位(起)',
								nameTextStyle: {
									color: '#888'
								},
								splitLine: {
									lineStyle: {
										width: 1,
										color: ['#eee'],
										type: 'solid'
									}
								},
								axisLine: {
									lineStyle: {
										width: 1,
										color: '#eee',
										type: 'solid'
									}
								}
							},
							{
								type: 'value',
								splitLine: {
									lineStyle: {
										width: 1,
										color: ['#eee'],
										type: 'solid'
									}
								},
								axisLine: {
									lineStyle: {
										width: 1,
										color: '#eee',
										type: 'solid'
									}
								}
							}
						],
						series: [{
								name: '上期发案数量',
								type: 'bar',
								itemStyle: {
									normal: {
										color: '#ffca3a'
									}
								},
								barMaxWidth: 30,
								barGap: 10,
								data: []
							},
							{
								name: '本期发案数量',
								type: 'bar',
								itemStyle: {
									normal: {
										color: '#ff763a'
									},
									emphasis: {
										color: '#ffad89'
									}
								},
								barMaxWidth: 30,
								barGap: 10,
								data: []
							}
						]
					}, //类案
					'seriesCase': {}
				},
				'platform': {
					'system': {
						'cpu': {
							'title': {
								'textStyle': {
									'color': '#333'
								}
							},
							'tooltip': {
								'textStyle': {
									color: '#fff'
								},
								'lineStyle': {
									color: '#d8034e'
								}
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										color: '#848484'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#848484'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										areaStyle: { //渐变填充
											color: [
												[0, 'rgba(255,170,137,1)'],
												[0.5, 'rgba(255,129,166,1)']
											]
										},
										lineStyle: { // 折线样式
											color: '#ff4683'
										},
									}
								}
							}
						},
						'memory': {},
						'disk': {},
						'net': {
							'title': {
								'textStyle': {
									'color': '#333'
								}
							},
							'tooltip': {
								'textStyle': {
									color: '#fff'
								},
								'lineStyle': {
									color: '#d8034e'
								}
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										color: '#848484'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#848484'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#333'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#ccc"
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										areaStyle: { //渐变填充
											color: [
												[0, 'rgba(255,170,137,1)'],
												[0.5, 'rgba(255,129,166,1)']
											]
										},
										lineStyle: { // 折线样式
											color: '#ff4683'
										},
									}
								}
							}
						},
						'monitor': {
							'right': {
								'color': "#8fc31f"
							},
							'error': {
								'color': "#ec6941"
							},
							'other': {
								'color': "#f3f3f3"
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#7a93ae'
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#798796'
								},
								'splitLine': {
									'lineStyle': {
										'color': '#c1d2da'
									}
								},
								'axisLabel': {
									'textStyle': {
										'color': '#666'
									}
								}
							},
							'series': [{
								'markPoint': {
									'itemStyle': {
										'normal': {
											'color': '#8fc31f'
										}
									}
								},
								'itemStyle': {
									'normal': {
										'color': '#8fc31f'
									}
								}
							}, {
								'markPoint': {
									'itemStyle': {
										'normal': {
											'color': '#ec6941'
										}
									}
								},
								'itemStyle': {
									'normal': {
										'color': '#ec6941'
									}
								}
							}]
						}
					},
					'log': {
						'statistics': {
							title: {
								textStyle: {
									"fontSize": 18,
									"fontWeight": "bolder",
									"color": "#333"
								}
							},
							xAxis: {
								axisLabel: {
									textStyle: {
										color: '#999'
									}
								},
								splitLine: {
									lineStyle: {
										color: '#ccc'
									}
								}
							},
							yAxis: {
								axisLine: {
									lineStyle: {
										color: '#ccc',
										width: 1,
										type: 'solid'

									}
								},
								axisLabel: {
									textStyle: {
										color: '#333'
									}
								},
								splitLine: {
									lineStyle: {
										color: '#ccc'
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										color: '#ff8632',
										lineStyle: {
											color: '#ff8632'
										},
										areaStyle: {
											color: ['rgba(255, 134, 50,.3)'],
											type: 'default'
										}
									}
								}
							}

						}
					}
				}

			},
			'dark': {
				'home': {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						textStyle: {
							color: '#999'
						}
						//data: [title]
					},
					//calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#999'
							}
						},
						splitLine: {
							lineStyle: {
								color: '#293340'
							}
						}
						//data: ['2016-04-30', '2016-05-01', '2016-05-02', '2016-05-03', '2016-05-04', '2016-05-05', '2016-05-06']
					}],
					yAxis: [{
						name: '单位：（万）',
						nameTextStyle: {

							color: '#999'
						},
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: '#293340',
								width: 1,
								type: 'solid'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#999'
							},
							formatter: function(value, index) {
								return value / 10000;
							}
						},
						splitLine: {
							lineStyle: {
								color: '#293340'
							}
						}
					}],
					series: [{
						symbolSize: 4,
						itemStyle: {
							normal: {
								color: '#5bdaf1',
								lineStyle: {
									color: '#83dff2'
								}
								/*areaStyle: {
								 type: 'default',
								 color: '#0075a9'
								 }*/
							}
						},
						//name: title,
						smooth: true,
						type: 'line',
						//data: numList,
						symbol: 'emptyCircle'

					}]
				},
				'statistic': {
					'trend': {
						'line': {
							'xAxis': {
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#86a4c6'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#606e85'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							}
						},
						'bar': {
							'xAxis': {
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#86a4c6'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#606e85'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							}
						}
					},
					'area': {
						'map': {},
						'heat': {}
					},
					'car': {
						'flow': {
							'title': {
								'textStyle': {
									'color': '#86a4c6'
								}
							},
							'xAxis': {
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#86a4c6'
								},
								'axisLine': {
									'lineStyle': {
										'color': '#86a4c6'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': '#606e85'
									}
								}
							}
						},
						'amount': {
							'title': {
								'textStyle': {
									'color': '#86a4c6'
								},
								'subtextStyle': {
									'color': '#ffffff'
								}
							},
							'xAxis': {
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#606e85"
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#86a4c6'
								},
								'axisLine': {
									'lineStyle': {
										'color': '#86a4c6'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#a5a5a5'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': '#606e85'
									}
								}
							}
						}
					}

				},
				'judge': {
					'warn': {},
					'similarCase': {
						title: {
							text: '辖区类案发案数量统计图表',
							//subtext: startTime + '-' + endTime,
							x: 'center',
							textStyle: {
								fontSize: 22,
								color: '#86a4c6'
							},
							subtextStyle: {
								fontSize: 16,
								color: '#86a4c6'
							},
							padding: [0, 0, 100, 0]
						},
						tooltip: {
							trigger: 'item'
						},
						legend: {
							x: '800',
							textStyle: {
								color: '#c4c4c4'
							},
							data: ['上期发案数量', '本期发案数量']
						},
						toolbox: {
							show: true,
							feature: {
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						xAxis: [{
							type: 'category',
							splitLine: {
								lineStyle: {
									width: 1,
									color: ['#86a4c6'],
									type: 'solid'
								}
							},
							axisLine: {
								lineStyle: {
									width: 2,
									color: '#86a4c6',
									type: 'solid'
								}
							},
							axisLabel: {
								rotate: -15,
								textStyle: {
									color: '#c4c4c4'
								}
							},
							splitArea: {
								show: false,
								areaStyle: {
									"color": [
										"#fff",
										"rgba(200,200,200,0.1)"
									],
									type: 'default'
								}
							},
							splitNumber: 10,
							data: []
						}],
						yAxis: [{
								type: 'value',
								name: '单位(起)',
								nameTextStyle: {
									color: '#c4c4c4'
								},
								splitLine: {
									lineStyle: {
										width: 1,
										color: ['#86a4c6'],
										type: 'solid'
									}
								},
								axisLine: {
									lineStyle: {
										width: 1,
										color: '#86a4c6',
										type: 'solid'
									}
								},
								axisLabel: {
									textStyle: {
										color: '#c4c4c4'
									}
								}
							},
							{
								type: 'value',
								splitLine: {
									lineStyle: {
										width: 1,
										color: ['#eee'],
										type: 'solid'
									}
								},
								axisLine: {
									lineStyle: {
										width: 1,
										color: '#eee',
										type: 'solid'
									}
								}
							}
						],
						series: [{
								name: '上期发案数量',
								type: 'bar',
								itemStyle: {
									normal: {
										color: '#ffca3a'
									}
								},
								barMaxWidth: 30,
								barGap: 10,
								data: []
							},
							{
								name: '本期发案数量',
								type: 'bar',
								itemStyle: {
									normal: {
										color: '#ff763a'
									},
									emphasis: {
										color: '#ffad89'
									}
								},
								barMaxWidth: 30,
								barGap: 10,
								data: []
							}
						]
					},
					'seriesCase': {}
				},
				'platform': {
					'system': {
						'cpu': {
							'title': {
								'textStyle': {
									'color': '#86a4c6'
								}
							},
							'tooltip': {
								'textStyle': {
									color: '#B0B0B0'
								},
								'lineStyle': {
									color: '#E1BB07'
								}
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										color: '#2F3540'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#323844"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#323844'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#606e85'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#323844"
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										areaStyle: { //渐变填充
											color: [
												[0, 'rgba(14,100,166,1)'],
												[0.5, 'rgba(30,57,80,1)']
											]
										},
										lineStyle: { // 折线样式
											color: '#01F7F8'
										},
									}
								}
							}

						},
						'memory': {},
						'disk': {},
						'net': {
							'title': {
								'textStyle': {
									'color': '#86a4c6'
								}
							},
							'tooltip': {
								'textStyle': {
									color: '#B0B0B0'
								},
								'lineStyle': {
									color: '#E1BB07'
								}
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										color: '#2F3540'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#323844"
									}
								}
							},
							'yAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#323844'
									}
								},
								'axisTick': {
									'lineStyle': {
										'color': '#606e85'
									}
								},
								'axisLabel': {
									'color': '#c4c4c4'
								},
								'splitLine': {
									'lineStyle': {
										'color': "#323844"
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										areaStyle: { //渐变填充
											color: [
												[0, 'rgba(14,100,166,1)'],
												[0.5, 'rgba(30,57,80,1)']
											]
										},
										lineStyle: { // 折线样式
											color: '#01F7F8'
										},
									}
								}
							}

						},
						'monitor': {
							'right': {
								'color': "#2c922a"
							},
							'error': {
								'color': "#f8781f"
							},
							'other': {
								'color': "#303f54"
							},
							'xAxis': {
								'axisLine': {
									'lineStyle': {
										'color': '#3e4858'
									}
								}
							},
							'yAxis': {
								'nameTextStyle': {
									'color': '#959da3'
								},
								'splitLine': {
									'lineStyle': {
										'color': '#3e4858'
									}
								},
								'axisLabel': {
									'textStyle': {
										'color': '#959da3'
									}
								}
							},
							'series': [{
								'markPoint': {
									'itemStyle': {
										'normal': {
											'color': '#2c922a'
										}
									}
								},
								'itemStyle': {
									'normal': {
										'color': '#2c922a'
									}
								}
							}, {
								'markPoint': {
									'itemStyle': {
										'normal': {
											'color': '#f8781f'
										}
									}
								},
								'itemStyle': {
									'normal': {
										'color': '#f8781f'
									}
								}
							}]
						}
					},
					'log': {
						'statistics': {
							title: {
								textStyle: {
									"fontSize": 18,
									"fontWeight": "bolder",
									"color": "#a0a0a0"
								}
							},
							xAxis: {
								axisLabel: {
									textStyle: {
										color: '#86a4c6'
									}
								},
								splitLine: {
									lineStyle: {
										color: '#2b4460'
									}
								}
							},
							yAxis: {
								axisLine: {
									lineStyle: {
										color: '#2b4460',
										width: 1,
										type: 'solid'

									}
								},
								axisLabel: {
									textStyle: {
										color: '#86a4c6'
									}
								},
								splitLine: {
									lineStyle: {
										color: '#2b4460'
									}
								}
							},
							series: {
								itemStyle: {
									normal: {
										color: '#ff8632',
										lineStyle: {
											color: '#ff8632'
										},
										areaStyle: {
											color: ['rgba(255, 134, 50,.3)'],
											type: 'default'
										}
									}
								}
							}

						}
					}
				}
			}
		},
		districtName: [
			['齐修南苑', '12', true]
		]
	}
});