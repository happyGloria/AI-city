/**
 * Created by jgx on 2016/4/12.
 */
define([], function () {
    return {
        //平均增加间隔
        decompositionTime: 10000,
        //平均增长数
        addNum: 999,
        resourceCategoryInfo: [
            // {name: "公安业务数据", code: "A"},
            // {name: "社会单位数据", code: "C"},
            // {name: "视频图像数据", code: "D"},
            // {name: "互联网数据", code: "E"},
            {name: "人口类", code: "np_010"},
            {name: "案件类", code: "np_020"},
            {name: "车辆类", code: "np_030"},
            {name: "轨迹类", code: "np_060"}
        ],
        dataColor:["dataA","dataC","dataD","dataE"],
        atlasDes: {
            airtogether: '飞机同行',
            banktogether: '银行往来',
            cartogether: '汽车同行',
            casetogether: '同案',
            cohabits: '同户籍',
            hoteltogether: '酒店同住',
            // neighbor: '邻居',
            phonetogether: '通话',
            surftogether: '同上网',
            traintogether: '火车同行',
            prisontogether:'同监舍'
        },

        resourceLoseInfo: {
            "name": "数据库1",
            "loseInfo": [
                {"objectname": "字段1", "losePercent": "15%"},
                {"objectname": "字段2", "losePercent": "5%"},
                {"objectname": "字段3", "losePercent": "15%"},
                {"objectname": "字段4", "losePercent": "10%"},
                {"objectname": "字段5", "losePercent": "3%"}
            ]
        },

        secondSearch: { //二次查询条件与结果
            A001001: {
                name: '常住人口',
                inParams: {
                    idcardNo: '身份证号',
                    //mobile: '手机号',
                    name: '姓名',
                    sex: '性别'
                },
                outParams: {
                    '1-name': '姓名',
                    '2-sex': '性别',
                    '3-nation': '民族',
                    '4-idcardNo': '身份证',
                    //'5-mobile': '手机号码',
                    '6-address': '家庭住址'
                }
            },
            A002001: {
                name: '火车出行数据',
                inParams: {
                    idcardNo: '身份证号',
                    name: '姓名',
                    number: '车次',
                    outTation: '出发站',
                    inTation: '到达站',
                    timeAttr: 'outTime'
                    //outTime:'时间'
                },
                outParams: {
                    '1-name': '姓名',
                    '2-idcardNo': '身份证号',
                    '3-number': '乘车班次',
                    '4-rideDate': '乘车日期',
                    '5-outTation': '出发站',
                    '6-inTation': '到达站',
                    '7-outTime': '出发时间'
                }
            },
            A003001: {
                name: '飞机出行数据',
                inParams: {
                    idcardNo: '身份证号',
                    flightNo: '航班号',
                    nameCn: '中文名',
                    nameEn: '英文名',
                    'A003001-outTation': '起飞站',
                    'A003001-inTation': '目的站',
                    timeAttr: 'outTime'
                    //outTime:'起飞时间'
                },
                outParams: {
                    '1-nameCn': '中文名',
                    '2-nameEn': '英文名',
                    '3-sex': '性别',
                    '4-flightNo': '航班号',
                    '5-rideDate': '航班日期',
                    '6-outTime': '起飞时间',
                    '7-outTation': '起飞站',
                    '8-inTation': '目的站',
                    '9-idcardNo': '身份证号码'
                }
            },
            A004001: {
                name: '汽车出行数据',
                inParams: {
                    idcardNo: '身份证号',
                    name: '姓名',
                    outCity: '出发城市',
                    inCity: '到达城市',
                    //outTime:'出发时间',
                    timeAttr: 'outTime'
                },
                outParams: {
                    '1-name': '姓名',
                    '2-idcardNo': '身份证号',
                    '3-rideDate': '乘车日期',
                    '4-number': '车次',
                    '5-outTation': '出发车站',
                    '6-outTime': '出发时间',
                    '7-outCity': '出发城市',
                    '8-inCity': '到达城市'

                }
            },
            A005001: {
                name: '开房记录',
                inParams: {
                    idcardNo: '身份证号',
                    name: '姓名',
                    hotelName: '酒店名',
                    //inDay:'入住日期'
                    timeAttr: 'inTime'
                },
                outParams: {
                    '1-name': '姓名',
                    '2-idcardNo': '身份证号',
                    '3-hotelName': '酒店名称',
                    '4-inTime': '入住时间',
                    '5-outTime': '退房时间',
                    '6-hotelAddress': '酒店地址',
                    '7-inCity': '入住城市'
                }
            },
            A006001: {
                name: '案件信息',
                inParams: {
                    //idcardNo: '身份证号',
                    //personName: '姓名',
                    caseCode: '案件编号',
                    caseName: '案件名',
                    //upperTime:'案件时间',
                    timeAttr: 'upperTime'

                },
                outParams: {
                    '1-caseCode': '案件编号',
                    '2-caseName': '案件名',
                    '3-type': '案件类型',
                    '4-upperTime': '案件时间',
                    '5-recieveUnit': '受理单位',
                    '6-caseWhere': '案件地点名称',
                    '7-caseGoodsAll': '物品描述',
                    //'8-personName': '姓名',
                    '9-province': '户籍所在地省份',
                    '90-city': '户籍所在地市级',
                    '91-liveStreet': '现居地街道'
                    //'92-idcardNo': '身份证号'
                }
            },
            A007001: {
                name: '车辆登记记录',
                inParams: {
                    idcardNo: '身份证号',
                    carNo: '车牌号',
                    possessor: '车主姓名',
                    //registerTime:'时间',
                    timeAttr: 'registerTime'
                },
                outParams: {
                    '1-idcardNo': '身份证号',
                    '2-carNo': '车牌号',
                    '3-possessor': '机动车所有人',
                    '4-brabdCn': '中文品牌',
                    '5-color': '车身颜色',
                    '6-telephone': '联系电话',
                    '7-engineCode': '发动机号',
                    '8-carNoType': '号牌种类'

                }
            },
            A008001: {
                name: '网吧登记信息',
                inParams: {
                    idcardNo: '身份证号',
                    //surfingDay:'上网日期'
                    timeAttr: 'registrationTime'

                },
                outParams: {
                    '1-netBar': '上网服务场所',
                    '2-idcardNo': '身份证号',
                    '3-name': '姓名',
                    '4-registrationTime': '登记时间',
                    '5-downTime': '下线时间',
                    '6-address': '地址'
                }
            },
            A009001: {
                name: '银行账号',
                inParams: {
                    idcardNo: '身份证号',
                    mobile: '手机号',
                    accountName: '姓名',
                    cardNo: '卡号',
                    accountBank: '开户行',
                    timeAttr: "accounTime"
                },
                outParams: {
                    '1-accountBank': '开户行',
                    '2-accountName': '开户名',
                    '3-cardNo': '卡号',
                    '4-accounTime': '开户日期',
                    '5-idcardNo': '开户人身份证',
                    '6-cardType': '银行卡类型',
                    '7-mobile': '开户人电话'
                }
            },
            A010001: {
                name: '转账明细',
                inParams: {},
                outParams: {}
            },
            A018001: {
                name: '户籍成员信息表',
                inParams: {
                    idcardNo:'身份证号'
                },
                outParams: {
                    '1-idcardNo':'身份证号',
                    '2-accountNo':'户号',
                    '3-homeowneRs':'与房主关系',
                    '4-occupation':'职业',
                    '5-tempAdminDivision':'暂住地行政区划',
                    '6-tempAddress':'暂住地址',
                    '7-liveAdminDivision':'居住地行政区划',
                    '8-liveAddress':'居住地址',
                    '9-domiciAdminDivision':'户籍地行政区划',
                    '90-domiciAddress':'户籍地址',
                    '91-domiciType':'户籍地类型',
                    '92-liveConditions':'居住状况',
                    '93-otherCertifiname':'其他证件名称',
                    '94-otherCertificateno':'其他证件号码',
                    '95-jurisdiction':'管辖所',
                    '96-fingerPrintNo':'指纹编号',
                    '97-positivePhoto':'正面照片',
                    '98-sidePhoto':'侧面照片'
                }
            },
            A027001: {
                name: '高速公路收费信息',
                inParams: {
                    carNo:'车牌号',
                    timeAttr: 'time'
                },
                outParams: {
                    '1-highWayName':'收费站名称',
                    '2-time':'收费时间',
                    '3-carNo':'车牌号码',
                    '4-price':'金额',
                    '5-lon':'经度',
                    '6-lat':'维度'
                }
            },
            A028001: {
                name: '小区停车场信息',
                inParams: {
                    carNo:'车牌号',
                    timeAttr:'time'

                },
                outParams: {
                    '1-communityName':'小区名',
                    '2-time':'时间',
                    '3-carNo':'车牌号码',
                    '4-address':'小区详细地址',
                    '5-lon':'小区经度',
                    '6-lat':'小区纬度'

                }
            },
            A029001: {
                name: '公共停车场信息',
                inParams: {
                    carNo:'车牌号',
                    timeAttr:'time'

                },
                outParams: {
                    '1-parkingName':'停车场名称',
                    '2-time':'时间',
                    '3-carNo':'车牌号码',
                    '4-address':'停车场详细地址',
                    '5-lon':'停车场经度',
                    '6-lat':'停车场纬度'
                }
            },
            A030001: {
                name: '车辆购置信息',
                inParams: {
                    idcardNo:'身份证号'

                },
                outParams: {
                    '1-carCode':'车辆识别号',
                    '2-brabdCn':'中文品牌',
                    '3-brabdEn':'英文品牌',
                    '4-carNoType':'号牌种类',
                    '5-color':'车身颜色',
                    '6-possessor':'机动车所有人',
                    '7-idcardNo':'身份证号',
                    '8-telephone':'联系电话',

                }
            },
            A031001: {
                name: '二手车交易信息',
                inParams: {
                    idcardNo:'身份证号',
                    carNo:'车牌号',
                    mobile:'手机号'
                },
                outParams: {
                    '1-carCode':'车辆识别号',
                    '2-brabdCn':'中文品牌',
                    '3-brabdEn':'英文品牌',
                    '4-carNoType':'号牌种类',
                    '5-color':'车身颜色',
                    '6-carNo':'车牌号码',
                    '7-oriPossessor':'原机动车所有人',
                    '8-oriIdcardNo':'原机动车所有人身份证号',
                    '9-oriTelephone':'原机动车所有人联系电话',
                    '90-buyerName':'购买人姓名',
                    '91-buyerIdcerNo':'购买人身份证',
                    '92-buyerTelephone':'购买人电话'
                }
            },
            A032001: {
                name: '车辆保险信息',
                inParams: {
                    carNo:'车牌号',
                    timeAttr:'policyTime'
                },
                outParams: {
                    '1-policyNo':'保单号',
                    '2-policyCampany':'保险公司',
                    '3-carNo':'车牌号码',
                    '4-possessor':'机动车所有人',
                    '5-idcardNo':'身份证号',
                    '6-telephone':'联系电话',
                    '7-policyTime':'保单时间',
                    '8-policyItem':'保单项目'

                }
            },
            A035001: {
                name: '车辆维修信息',
                inParams: {
                    carNo:'车牌号',
                    timeAttr:'repairTime'
                },
                outParams: {
                    '1-carNo':'车牌号',
                    '2-repairTime':'维修时间',
                    '3-kolimeter':'已开公里数',
                    '4-repairItem':'维修内容',
                    '5-repairType':'维修类型'
                }
            },
            C001001: {
                name: 'GPS轨迹',
                inParams: {
                    carNo: '车牌号',
                    //mobile:"手机号",
                    //time:'时间'
                    timeAttr: 'time'
                },
                outParams: {
                    '1-carNo': '车牌号',
                    '2-time': '时间',
                    '3-lon': '纬度',
                    '4-lat': '经度'
                }
            },
            C002001: {
                name: '通话信息',
                inParams: {
                    mobile: '手机号',
                    //startTime:'开始时间'
                    timeAttr: 'startTime'
                },
                outParams: {
                    '1-calling': '主叫',
                    '2-called': '被叫',
                    '3-callDay': '通话日期',
                    '4-startTime': '开始时间'
                }
            },
            C003001: {
                name: 'WIFI采集数据',
                inParams: {
                    mobile: '手机号',
                    //qq: 'qq号',
                    imsi: 'IMSI',
                    imei: 'IMEI',
                    weixinUin: '微信',
                    sinaUid: '新浪微博uid',
                    address: '采集地点',
                    timeAttr: 'collectionTime'
                },
                outParams: {
                    '1-collectionTime': '采集时间',
                    '2-mobile': '手机号码',
                    '3-imei': '手机IMEI',
                    //'4-qq': 'QQ号码',
                    '5-sinaUid': '新浪微博UID',
                    '6-weixinUin': '微信',
                    '7-wifiMac': '无线路由MAC',
                    '8-mobileMac': '移动设备MAC',
                    '9-address': '采集地点',
                    '90-collectionEquipment': '采集设备',
                    '91-createTime': '入库时间',
                    '92-nickName': '昵称',
                    '93-sex': '性别',
                    '94-photo': '头像'
                }
            },
            C004001: {
                name: '物流信息',
                inParams: {
                    mobile: '手机号',
                    senderName: '寄件人姓名',
                    recipientsName: '收件人姓名',
                    //senderDate:'邮寄日期'
                    timeAttr: 'senderDate'
                },
                outParams: {
                    '1-senderName': '寄件人姓名',
                    '2-senderTel': '寄件人电话',
                    '3-senderAddress': '寄件人地址',
                    '4-senderDate': '邮寄日期',
                    '5-recipientsName': '收件人姓名',
                    '6-recipientsTel': '收件人电话',
                    '7-recipientsAddress': '收件人地址'
                }
            },
            C005001: {
                name: '基站信息',
                inParams: {},
                outParams: {}
            },
            C006001: {
                name: '铁路订票信息',
                inParams: {
                    'certificateNumber':'证件号码',
                    'idcardNo':'身份证号',
                    'mobile':'手机号'

                },
                outParams: {
                    '1-reserveTime':'订票/售票时间',
                    '2-passengerName':'乘车人姓名',
                    '3-certificateType ':'证件类型',
                    '4-certificateNumber':'证件号码',
                    '5-rideDate':'发车日期',
                    '6-number':'车次',
                    '7-carriageNo':'车厢',
                    '8-seatNo':'座位',
                    '80-ticketType':'车票类型',
                    '81-seatType':'席别',
                    '82-outStation':'发站',
                    '83-orderIdcardNo':'订票人证件号',
                    '84-orderMobile':'订票人手机',
                    '85-orderTel':'订票人座机',
                    '86-orderemail':'订票人电子邮箱',
                    '87-tickNo':'票号',
                    '88-windowNo':'窗口号',
                    '89-stationCode':'车站代码',
                    '90-status':'状态',
                    '91-barCode':'输入条形码',
                    '92-serialNo':'流水号',

                }
            },
            C013001: {
                name: '民航旅客出港信息',
                inParams: {
                    idcardNo:'身份证号',
                    //mobile:'手机号',
                    timeAttr:'rideDate'

                },
                outParams: {
                    '1-flightNo':'航班号',
                    '2-rideDate':'航班日期',
                    '3-outPort':'始发港',
                    '4-inPort':'到达港',
                    '5-outTime':'始发时间',
                    '6-inTime':'到达时间',
                    '7-idcardNo':'证件号',
                    '8-reservateNo':'订座编号'

                }
            },
            C017001: {
                name: '网吧信息',
                inParams: {
                    mobile:'手机号'
                },
                outParams: {
                    '1-name':'上网服务场所名称',
                    '2-legalPerson':'法定代表人',
                    '3-address':'地址',
                    '4-terminalCount':'终端数',
                    '5-responsiblePerson':'负责人联系电话',
                    '6-securityOfficer':'信息安全员'

                }
            },
            D001001: {
                name: '视频结构化数据',
                inParams: {
                    carNo: '车牌号',
                    carColor: '车身颜色',
                    carStyle: '车型',
                    //videoTime:'视频时间'
                    timeAttr: 'videoTime'
                },
                outParams: {
                    '1-videoTime': '视频时间',
                    '2-videoPlace': '录取地点',
                    '3-carNo': '车牌号',
                    '4-carStyle': '车型',
                    '5-carColor': '车身颜色'

                }
            },
            D002001: {
                name: '通行记录',
                inParams: {
                    carNo: '车牌号',
                    code: '卡口号',
                    name: '卡口名称',
                    //elapsedTime:'经过时间'
                    timeAttr: 'elapsedTime'
                },
                outParams: {
                    '1-code': '卡口编号',
                    '2-name': '卡口名称',
                    '3-carNo': '车牌号码',
                    '4-elapsedTime': '经过时间'
                }
            },
            D003001: {
                name: '卡口点位',
                inParams: {},
                outParams: {}
            },
            E001001: {
                name: '微博数据',
                inParams: {},
                outParams: {}
            }

        },

        fullSearch:{ //全景搜
            A001001:{
                name: '常住人口',
                params:['name', 'sex', 'nation', 'idcardNo'],
                detailsParams:{
                    'name':'姓名',
                    'sex':'性别',
                    'nation': '民族',
                    'idcardNo': '身份证号',
                    'birthday': '生日',
                    'mobile': '手机号码',
                    'email': '邮箱',
                    'address':'家庭住址'
                }
            },
            A002001:{
                name: '火车出行数据',
                params:['name', 'idcardNo', 'number', 'rideDate'],
                detailsParams:{
                    'name':'姓名',
                    'sex':'性别',
                    'idcardNo':'身份证号',
                    'number':'车次',
                    'rideDate':'乘车日期',
                    'carriageNo':'车厢号',
                    'seatNo':'座位号',
                    'outTation':'出发站',
                    'inTation':'到达站',
                    'outTime':'出发日期时间',
                    'arrivalTime':'到达日期时间'
                }
            },
            A003001:{
                name: '飞机出行数据',
                params:['nameCn', 'sex', 'flightNo', 'rideDate'],
                detailsParams:{
                    'nameCn':'中文名',
                    'idcardNo':'身份证号',
                    'sex':'性别',
                    'flightNo':'航班号',
                    'rideDate':'航班日期',
                    'boarding':'登机牌号',
                    'outTime':'起飞时间',
                    'arrivalTime':'到达时间',
                    'outTation':'起飞站',
                    'inTation':'目的站'
                }
            },
            A004001:{
                name: '汽车出行数据',
                params:['name', 'idcardNo', 'rideDate', 'number'],
                detailsParams:{
                    'name':'姓名',
                    'sex':'性别',
                    'idcardNo':'身份证号',
                    'rideDate':'乘车日期',
                    'number':'车次',
                    'outTation':'出发车站',
                    'outTime':'出发时间',
                    'inTation':'到达车站',
                    'arrivalTime':'到达时间',
                    'seatNo':'座位号',
                    'outCity':'出发城市',
                    'inCity':'到达城市'
                }
            },
            A005001:{
                name: '开房记录',
                params:['name', 'idcardNo', 'hotelName', 'inDay'],
                detailsParams:{
                    'name':'姓名',
                    'idcardNo':'身份证号',
                    'sex':'性别',
                    'nation':'种族',
                    'hotelName':'酒店名称',
                    'inHomeAddress':'入住人家庭地址',
                    'inTime':'入住时间',
                    'inRoomNo':'入住房号',
                    'outTime':'退房时间',
                    'hotelAddress':'酒店地址'
                }
            },
            A006001:{
                name: '案件信息',
                params:['caseCode', 'type', 'upperTime', 'recieveUnit'],
                detailsParams:{
                    'caseCode':'案事件编号',
                    'caseName':'案件名',
                    'type':'案件类型',
                    'upperTime':'案件上限时间',
                    'description':'案件描述',
                    'recieveUnit':'受理单位',
                    'caseWhere':'案发地点全地址',
                    'caseGoodsAll':'物品描述'
                }
            },
            A007001:{
                name: '车辆登记记录',
                params:['idcardNo', 'carNo', 'possessor', 'brabdCn'],
                detailsParams:{
                    'idcardNo':'身份证号',
                    'carNo':'号牌号码',
                    'possessor':'机动车所有人',
                    'brabdCn':'中文品牌',
                    'brabdEn':'英文品牌',
                    'carNoType':'号牌种类',
                    'carModel':'车辆型号',
                    'carType':'车辆类型',
                    'carCode':'车辆识别代号',
                    'color':'车身颜色',
                    'useProperty':'使用性质',
                    'telephone':'联系电话',
                    'status':'状态',
                    'engineCode':'发动机型号',
                    'registerTime':'初次登记日期',
                    'lssuingAuthority':'发证机关'
                }
            },
            A008001:{
                name: '网吧登记信息',
                params:['netbar', 'name', 'idcardNo', 'downTime'],
                detailsParams:{
                    'netBar':'上网服务场所',
                    'idcardNo':'身份证',
                    'name':'姓名',
                    'registrationTime':'登记时间',
                    'downTime':'下线时间',
                    'address':'地址'
                }
            },
            A009001:{
                name: '银行账号',
                params:['accountBank', 'accountName', 'cardNo', 'accounTime'],
                detailsParams:{
                    'accountBank':'开户行',
                    'accountName':'开户名',
                    'cardNo':'卡号',
                    'accounTime':'开户日期',
                    'idcardNo':'开户人身份证',
                    'mobile':'开户人电话'
                }
            },
            A021001:{
                name: '涉案人员信息',
                params:['caseCode', 'idcardNo', 'name', 'nation'],
                detailsParams:{
                    'caseCode':'案事件编号',
                    'idcardNo':'身份证号',
                    'name':'姓名',
                    'fromerName':'曾用名',
                    'natio':'民族',
                    'sex':'性别',
                    'age':'年龄',
                    'birthday':'出生日期',
                    'mobile':'手机号码'
                }
            },
            C001001:{
                name: 'GPS轨迹',
                params:['carNo', 'time', 'lon', 'lat'],
                detailsParams:{
                    'carNo':'车牌号',
                    'time':'时间',
                    'lon':'纬度',
                    'lat':'经度',
                    'speed':'车速',
                    'description':'描述',
                    'status':'状态',
                    'mileAge':'里程',
                    'carType':'车辆类型'
                }
            },
            C002001:{
                name: '通话信息',
                params:['calling', 'called', 'startTime','callTime'],
                detailsParams:{
                    'btsId': '基站ID号',
                    'calling': '主叫',
                    'called': '被叫',
                    'startTime': '开始时间',
                    'callTime': '通话时长',
                    'type': '通话类型'
                }
            },
            C003001:{
                name: 'WIFI采集数据',
                params:['collectionTime', 'mobile', 'imei', 'qq'],
                detailsParams:{
                    'collectionTime':'采集时间',
                    'mobile':'手机号码',
                    'imei':'手机imei',
                    'imsi':'手机imsi',
                    'qq':'qq号码',
                    'sinaUid':'新浪微博uid',
                    'weixinUin':'微信uin',
                    'wifiMac':'无线路由mac',
                    'mobileMac':'移动设备mac',
                    'address':'采集地点',
                    'collectionEquipment':'采集设备',
                    'createTime':'入库时间',
                    'nickName':'昵称',
                    'sex':'性别',
                    'photo':'头像',
                    'lon':'经度',
                    'lat':'纬度'
                }
            },
            C004001:{
                name: '物流信息',
                params:['senderName', 'senderTel', 'senderAddress', 'senderDate'],
                detailsParams:{
                    'senderName':'寄件人姓名',
                    'senderTel':'寄件人电话',
                    'senderAddress':'寄件人地址',
                    'senderDate':'邮寄日期',
                    'recipientsName':'收件人姓名',
                    'recipientsTel':'收件人电话',
                    'recipientsAddress':'收件人地址'
                }
            },
            C005001:{
                name: '基站信息',
                params:['btsId', 'address', 'lon', 'lat'],
                detailsParams:{
                    'btsId': '基站ID号',
                    'address': '基站地址',
                    'lat': '经度',
                    'lon': '纬度'
                }
            },
            D001001:{
                name: '视频结构化数据',
                params:['videoTime', 'videoPlace', 'carNo', 'carStyle'],
                detailsParams:{
                    'videoTime': '视频时间',
                    'videoPlace': '录取地点',
                    'carNo': '车牌号',
                    'carStyle': '车型',
                    'carColor': '车身颜色'
                }
            },
            D002001:{
                name: '通行记录',
                params:['code', 'name', 'carNo', 'elapsedTime'],
                detailsParams:{
                    'code':'卡口编号',
                    'name':'卡口名称',
                    'carNo':'车牌号',
                    'elapsedTime':'经过时间',
                    'lon':'经度',
                    'lat':'纬度'
                }
            },
            E001001:{
                name: '微博数据',
                params:['uid', 'nickName', 'addressAll', 'weihao'],
                detailsParams:{
                    'nickName':'用户昵称',
                    'personalDesc':'用户个人描述',
                    'userBlogAddress':'用户博客地址',
                    'url':'用户的微博统一URL地址',
                    'domain':'用户的个性化域名',
                    'weihao':'用户的微号',
                    'sex':'性别',
                    'followersCoun':'粉丝数',
                    'attentionCount':'关注数',
                    'blogCount':'微博数',
                    'collectionCount':'收藏数',
                    'createTime':'用户创建（注册）时间',
                    'isCaOrv':'是否是微博认证用户',
                    'caType':'认证类型',
                    'description':'用户备注信息',
                    'caCause':'认证原因',
                    'friendsCount':'用户的互粉数',
                    'addressAll':'用户全地址'
                }
            }
        },

       //黑白名单('0':账户名，'1':域名)
       bwListResource: {
           'black': {
               '0':{
                   '1-blackName': '账户名',
                   '2-blackList': '警号',
                   '3-creatorName': '创建人',
                   '4-createDate': '创建时间'
               },
               '1': {
                   '1-blackList': '域名',
                   '2-creatorName': '创建人',
                   '3-createDate': '创建时间'
               }
           },
           'white': {
               '0':{
                   '1-whiteName': '姓名',
                   '2-idcardNo': '身份证号',
                   '3-carNo': '车牌号',
                   '4-mobile': '手机号',
                   '5-creatorName': '创建人',
                   '6-createDate': '创建时间'
               }
           }
       },
        //pvdUrl: 'http://192.168.200.153:8886/html/index.html'
        pvdUrl: 'http://172.16.61.236:8886/html/index.html'
    }
});
