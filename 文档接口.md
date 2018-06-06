# 文档接口

## 1. peopleTypeCount

* URL: `/zhsq/people/peopleTypeCount`

* 请求方式：`POST`

* 请求参数：

  ```json
  {
      villageCode: ''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "labelRecord": [
              { "num": 0, "name": "失智人员" },
              { "num": 0, "name": "独居老人" },
              { "num": 0, "name": "安置帮教" },
              { "num": 0, "name": "志愿者" },
              { "num": 0, "name": "视线对象" },
              { "num": 0, "name": "涉毒对象" },
              { "num": 0, "name": "楼组长" },
              { "num": 0, "name": "精神病人" }
          ],
          "genderRecord": [
              { "num": 8375, "name": "男" },
              { "num": 7271, "name": "女" },
              { "num": 0, "name": "未知" }
          ],
          "ageRecord": {
              "age4": 2052, "age3": 5251, "age5": 407, "age2": 6381, "age1": 1552
          },
          "peopleRecord": {
              "peopleCount": 15646, "peopleDiscoveryCount": 0, "peopleLeaveCount": 0
          },
          "peopleTypeRecord": [
              { "num": 4620, "name": "户籍人员" },
              { "num": 11021, "name": "来沪人员" },
              { "num": 5, "name": "境外人员" }
          ]
      }
  }
  ```

  ​


## 2. getPoliceAlerts

* URL: `/zhsq/policeAlert/getPoliceAlerts`

* 请求方式：`POST`

* 请求参数：

  ```json
  {
      villageCode: '',
      pageSize:10,
      pageNumber:1,
      inboundTimeStart:2018-05-31 00:00:00,
      inboundTimeEnd:2018-05-31 17:07:52,
      caseId:'',
      calleeNo:'',
      callerName:'',
      caseAddress:'',
      caseDesc:'',
      eventDealState:''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalRow": 26,
          "isMore": 1,
          "totalPage": 3,
          "startIndex": 0,
          "list": [
              {
                  "id": 1034708,
                  "villageCode": "310104006001",
                  "recordId": "20180531165449373007",
                  "caseId": "20180531165449373007",
                  "inboundCallTypeId": 1,
                  "inboundCallId": "20180531165439373007",
                  "inboundTime": "2018-05-31 16:54:49",
                  "inboundTimeStart": null,
                  "inboundTimeEnd": null,
                  "callerNo": "13023131093",
                  "calleeNo": "",
                  "callOperatorId": "001266",
                  "callCardId": null,
                  "callOperatorName": "王志豪",
                  "agentRecordId": "201805311019278",
                  "callerName": "陈丽萍,身份证:310106195403182902",
                  "callerSex": "2",
                  "callerCompany": "",
                  "callerFaxNo": "",
                  "callerEmailAddress": "",
                  "callerAddress": "上海",
                  "occurTime": "2018-05-31 16:54:49",
                  "coordinateX": 1.3517896265421905E7,
                  "coordinateY": 3655932.3695077817,
                  "roadNam": null,
                  "crossRoadName": "",
                  "caseAddress": "华石路73号门口",
                  "caseAddresses": null,
                  "siteName": "",
                  "precinctName": "徐汇分局田林新村派出所",
                  "beatId": 0.0,
                  "title": "",
                  "caseCategoryId": 249.0,
                  "caseDesc": "轿车单车事故.请民警到场处理。",
                  "caseStatusId": 8.0,
                  "processStatusId": 5.0,
                  "updateTime": "2018-05-31 16:52:53",
                  "isResponseViewed": 1.0,
                  "createTime": "2018-05-31 16:54:49.0",
                  "mrowTime": "2018-05-31 16:57:01.0",
                  "villageName": "田林十二村",
                  "eventId": "1034708",
                  "eventType": 6,
                  "dealState": "61",
                  "dealTime": null,
                  "dealUserId": -1,
                  "dealUserName": "",
                  "dealContent": "系统自动(-1)已派单给：邱文震(310107197609060412)  陈建平(310110196304264653)  尤庭耀(310104198612277255)  毛恒成(310102196807202817)  林  峰(440507197801309776)  刘继业(310104196306160818)  ",
                  "pic": "",
                  "credentialNo": null,
                  "credentialType": null,
                  "regionInfo": null,
                  "qyzrhf": "1604",
                  "queryNumber": 0,
                  "peopleInfo": null,
                  "type": null
              }
          ]
      }
  }
  ```

  ​

## 3. real-power

* URL: `/zhsq/statistics/real-power`

* 请求方式： `POST`

* 请求参数：

  ```json
  {
      villageCode: ''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "jy": 0,
          "zyz": 2,
          "jwgb": 2,
          "bl": 1,
          "lzz": 1,
          "ba": 5
      }
  }
  ```

## 4. all-sense

* URL: `/zhsq/statistics/all-sense`

* 请求参数:

* 返回结果：

  ```json
  {
      "resultCode":200,
      "resultMessage":"OK",
      "villageName":"",
      "data":63
  }
  ```

## 5.getFacelibMapper

* URL: `/zhsq/facelibMapper/getFacelibMapper`

* 请求参数：

  ```json
  {
      villageCode: ''
  }
  ```

* 返回结果：

  ```json
  {"resultCode":200,"resultMessage":"OK","villageName":"","data":[]}
  ```

  ​

## 6. getRealPowerGroupByLabel

* URL: `/zhsq/realPowerEquip/getRealPowerGroupByLabel`

* 请求参数：

  ```json
  {
      pageSize:999,
      pageNumber:1,
      credentialNo:'',
      certificatesName:'',
      residentialAddress:'',
      phonenumber:'',
      mac:'',
      label:'',
      villageCode:'',
      policeNumber:'',
  	department:''
  }
  ```

  ​





## 7. sixEntityCount (一标六实)

* URL：`/zhsq/statistics/sixEntityCount`

* 请求方式：`GET`

* 请求参数：

  ```json
  {
      villageCode:''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "田林十二村",
      "data": {
          "policeEventCount": 119,
          "peopleCount": 18455,
          "buildingCount": 8159,
          "realPowerEquipmentCount": 816,
          "realPowerCount": 722,
          "securityEquipmentCount": 1905,
          "realEquipmentCount": 94,
          "realCompany": 26
      }
  }
  ```

  ​


## 8. getFaceAlertSUM

* URL：`/zhsq/facelibMapper/getFaceAlertSUM`

* 请求参数：

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": [
          {
              "num": 0,
              "name": "在逃人员"
          },
          {
              "num": 8,
              "name": "维稳对象"
          },
          {
              "num": 37,
              "name": "吸毒人员"
          },
          {
              "num": 0,
              "name": "精神病人"
          },
          {
              "num": 215,
              "name": "前科人员"
          },
          {
              "num": 33,
              "name": "社区服刑"
          }
      ]
  }
  ```

  ​

## 9. alertEx

* URL：`/zhsq/facelibMapper/alertEx`

* 请求方式：`POST`

* 请求参数:

  ```json
  {
  	ytFaceLibId:301,
  	ytFaceLibType:1,
  	pageNumber:1,
  	pageSize:4,
  	currentIndex:1,
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 4,
          "totalRow": 0,
          "isMore": 0,
          "totalPage": 0,
          "startIndex": 0,
          "list": []
      }
  }
  ```

  ​

## 10. day-sense

* URL：`/zhsq/statistics/day-sense`

* 请求方式：`POST`

* 请求参数:

* 返回结果

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": [
          { "valueDeal": 0, "name": "门未关", "value": 278 },
          { "valueDeal": 1, "name": "刷卡异常", "value": 84 },
          { "valueDeal": 20, "name": "110警情", "value": 26 },
          { "valueDeal": 0, "name": "车辆感知离开", "value": 19 },
          { "valueDeal": 0, "name": "车辆感知发现", "value": 2 },
          { "valueDeal": 0, "name": "智能分析", "value": 0 },
          { "valueDeal": 7, "name": "消防告警", "value": 0 },
          { "valueDeal": 0, "name": "案件接报", "value": 0 }
      ]
  }
  ```

## 11.day-sense-byState
* URL: ``
* 请求方式：`POST`
* 返回结果:
  ```json
  {
    "resultCode": 200,
    "resultMessage": "OK",
    "villageName": "",
    "data": {
        "待派单": { "110警情": 0, "消防告警": 0, "总数": 0, "重点关注人员": 0, "案件接报": 0 },
        "已派单": { "110警情": 18, "消防告警": 0, "总数": 18, "重点关注人员": 0, "案件接报": 0 },
        "结束": { "110警情": 11, "消防告警": 0, "总数": 11, "重点关注人员": 0, "案件接报": 0 },
        "已接警": { "110警情": 0, "消防告警": 0, "总数": 0, "重点关注人员": 0, "案件接报": 0 },
        "处理中": { "110警情": 5, "消防告警": 0, "总数": 6, "重点关注人员": 1, "案件接报": 0 }
    }
}
  ```



## 12.week-sense
* URL: `/zhsq/statistics/week-sense`

* 请求方式:`POST`

* 请求参数:

  ```json
  {
      group:villageCode
  }
  ```

  ​

* 返回

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": [
          { "value": 131299, "name": "高知楼" },
          { "value": 42799, "name": "田林十四村" },
          { value": 24939, "name": "田林十三村" },
          { "value": 21851, "name": "宜山路655弄2-4号" },
          { "value": 17830, "name": "田林十二村" },
          { "value": 10933, "name": "华鼎广场" },
          { "value": 8232, "name": "东航公寓" },
          { "value": 6970, "name": "千鹤2/4" },
          { "value": 6957, "name": "吴中公寓" },
          { "value": 1599, "name": "钦州路785弄" }
      ]
  }
  ```

  ​

## 13. today

* URL: `/zhsq/policeSituation/today`

* 请求方式：`POST`

* 请求参数:

* 返回结果:

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "fireAlarm": [
              { "total": 0, "state": 60 },
              { "total": 0, "state": 61 },
              { "total": 0, "state": 62 },
              { "total": 0, "state": 63 },
              { "total": 0, "state": 65 }
          ],
          "hitAlert": [
              { "total": 0, "state": 60 },
              { "total": 0, "state": 61 },
              { "total": 0, "state": 62 },
              { "total": 1, "state": 63 },
              { "total": 0, "state": 65 }
          ],
          "police110": [
              { "total": 0, "state": 60 },
              { "total": 10, "state": 61 },
              { "total": 0, "state": 62 },
              { "total": 5, "state": 63 },
              { "total": 11, "state": 65 }
          ],
          "name": [
              "110警情",
              "重点人员",
              "火警"
          ]
      }
  }
  ```

  ​

## 14. getCameraByType

* URL: `/zhsq/camera/getCameraByType`

* 请求方式：`POST`

* 请求参数：

  ```json
  {
  	villageCode: '',
  	cameraName: '',
  	cameraType:5,
  	pageNumber:1,
  	pageSize:999
  }
  ```

  ​

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 999,
          "totalRow": 83,
          "isMore": 0,
          "totalPage": 1,
          "startIndex": 0,
          "list": [
              {
                  "id": 201,
                  "villageCode": "310104006001",
                  "cameraId": "31010416841310000188",
                  "name": "门洞11内",
                  "cameraIp": "110.1.3.1",
                  "cameraPort": 80,
                  "login": "admin",
                  "password": "tianlin12",
                  "streamSource": null,
                  "buildingNo": "11",
                  "cameraType": 1,
                  "thridType": 0,
                  "inOutFlag": 1,
                  "tollgateID": null,
                  "vehicleCapDirection": null,
                  "isUsed": null,
                  "isOnline": 1,
                  "createTime": 1517626696000,
                  "lon": 1.35173384117999E7,
                  "lat": 3655230.5705,
                  "isDelete": null,
                  "rowTime": 1517626696000,
                  "mrowTime": 1517999516000,
                  "ytCameraId": "248",
                  "villageName": null,
                  "pvgChannelID": "851d852c-f120-4ba0-a821-77da00afd84c",
                  "count": null
              }
          ]
      }
  }
  ```

  ​

## 15. getBuildings （实有房屋） 

* URL: `/zhsq/village/getBuildings`

* 请求方式：`POST`

* 请求参数:

  ```json
  {
      villageCode: ''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": [
          {
              "id": 35,
              "villageCode": "310104006001",
              "buildingNo": "46",
              "floorTotal": 6,
              "houseTotal": 24,
              "lon": 1.35175072163E7,
              "lat": 3655133.4682,
              "rowTime": 1517798307000,
              "mrowTime": 1526625161000
          }
      ]
  }
  ```

* /zhsq/village/getHouseByBuilding

* ```json
  {	
  	buildingNo:20,
  	villageCode:310104006002
  }
  ```

* ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "田林十四村",
      "data": [
          {
              "list": [
                  {
                      "id": 12034,
                      "villageCode": "310104006002",
                      "buildingNo": "20",
                      "houseNo": "101",
                      "floor": "1",
                      "type": null,
                      "rowTime": 1518220464000,
                      "mrowTime": 1526957555000,
                      "label": null
                  },
                  {
                      "id": 12501,
                      "villageCode": "310104006002",
                      "buildingNo": "20",
                      "houseNo": "102",
                      "floor": "1",
                      "type": null,
                      "rowTime": 1518220464000,
                      "mrowTime": 1526957555000,
                      "label": "楼组长"
                  },
                  {
                      "id": 12757,
                      "villageCode": "310104006002",
                      "buildingNo": "20",
                      "houseNo": "103",
                      "floor": "1",
                      "type": "出租房",
                      "rowTime": 1518220464000,
                      "mrowTime": 1526957556000,
                      "label": null
                  },
                  {
                      "id": 10341,
                      "villageCode": "310104006002",
                      "buildingNo": "20",
                      "houseNo": "104",
                      "floor": "1",
                      "type": null,
                      "rowTime": 1518220464000,
                      "mrowTime": 1526957555000,
                      "label": null
                  }
              ],
              "floorName": "1"
          }
      ]
  }
  ```

* ​

## 16. getRealCompanyList (实有单位)

* URL：`/zhsq/village/getRealCompanyList`

* 请求方式：

* 请求参数：

  ```json
  {
      villageCode:'',
      pageNumber:1,
      pageSize:999
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 999,
          "totalRow": 1,
          "isMore": 0,
          "totalPage": 1,
          "startIndex": 0,
          "list": [
              {
                  "companyid": "c00046",
                  "villageCode": "310104006010",
                  "companyName": "农工商",
                  "companyAdress": "上海市徐汇区中山西路2368号106室-1",
                  "companyPic": "/real_company/2018/2/2/ngs1.jpg",
                  "lon": 1.35177857326999E7,
                  "lat": 3656204.3061,
                  "mrowTime": null
              }
          ]
      }
  }
  ```

## 17. getManholecoverList（窨井盖）
* URL: `/zhsq/cover/getManholecoverList`
* 请求方式：`POST`
* 请求参数：
 ```json
 {
     villageCode:'',
	pageNumber:1,
	pageSize:999,
	startTime:'',
	endTime:'',
 }
 ```
* 返回结果：
```json
{
    "resultCode": 200,
    "resultMessage": "OK",
    "villageName": "",
    "data": {
        "pageNumber": 1,
        "pageSize": 999,
        "totalRow": 131,
        "isMore": 0,
        "totalPage": 1,
        "startIndex": 0,
        "list": [
            {
                "pageNumber": 1,
                "pageSize": 10,
                "startTime": null,
                "endTime": null,
                "id": "262",
                "villageName": null,
                "wellType": "雨水井",
                "villageCode": "310104006001",
                "coverType": null,
                "coverSize": null,
                "subordinateUnits": null,
                "latestHeartbeatTime": null,
                "state": null,
                "stateTime": null,
                "remark": null,
                "coordType": null,
                "alerterPic": null,
                "nameplatePic": null,
                "wellPatternPic": null,
                "panoramaPic": null,
                "equipmentNo": "sh000067",
                "equipmentAddress": "田林十二村40号田林第六幼儿园附近田林十二村23号",
                "buildTime": null,
                "diameter": null,
                "stuff": null,
                "pressure": null,
                "lon": "13517387.085900000",
                "lat": "3655224.533399990",
                "mrowTime": null,
                "picUrl": "/manholecover/1.jpg",
                "isDisplacement": "报警测试",
                "displaceTime": null
            }
        ]
    }
}
```



## 18.getVillageEntranceExit（小区出入口） 

* URL:`/zhsq/village/getVillageEntranceExit`

* 请求方式：`POST`

* 请求参数：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": [
          {
              "lon": "13517550",
              "picUrl": "/village_entrance_exit/2018/2/2/70b59c93d2724e609af3707f0f0cc908.JPG",
              "villageCode": "310104006001",
              "name": "正门（机动车出入口）",
              "lat": "3655211"
          }
      ]
  }
  ```

  ​

## 19. （实有安防设施-wifi）

* URL：`/zhsq/wifi/getWifiDeviceList`

* 请求方式：`POST`

* 请求参数：

  ```json
  {
  	villageCode:'',
  	deviceId:'',
  	detailAddress:'',
  	pageNumber:1,
  	pageSize:999
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 999,
          "totalRow": 72,
          "isMore": 0,
          "totalPage": 1,
          "startIndex": 0,
          "list": [
              {
                  "id": 22,
                  "apName": "田林十四村45号",
                  "lon": 1.35169398519999E7,
                  "picUrl": "/wifi_device/1.jpg",
                  "villageCode": "310104006002",
                  "name": "田林十四村45号",
                  "coordType": 3,
                  "mrowTime": 1527764584000,
                  "lat": 3655651.2637,
                  "deviceId": "ACCF23E6A816",
                  "rowTime": 1526751269000,
                  "detailAddress": "田林十四村45号"
              }
          ]
      }
  }
  ```
  ​

  ​



## 20. （实有安防设施-门禁）

* URL：`/zhsq/access/getAccessDeviceList`

* 请求方式：`POST`

* 请求参数:

  ```json
  {
  	villageCode:'',
  	deviceId:'',
  	deviceType:'',
  	mac:'',
  	buildingNo:'',
  	houseNo:'',
  	state:'',
  	pageNumber:1,
  	pageSize:999
  }
  ```

* 返回结果

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 999,
          "totalRow": 376,
          "isMore": 0,
          "totalPage": 1,
          "startIndex": 0,
          "list": [
              {
                  "pageNumber": 1,
                  "pageSize": 10,
                  "startTime": null,
                  "endTime": null,
                  "id": "237",
                  "villageName": null,
                  "villageCode": "310104006001",
                  "deviceType": 1,
                  "mac": "3481F40D48E6",
                  "buildingNo": "14",
                  "houseNo": null,
                  "state": 0,
                  "stateDesc": "离线",
                  "stateTime": 1526350889000,
                  "lon": 1.35172804679E7,
                  "lat": 3655204.6413,
                  "rowTime": 1517905286000,
                  "mrowTime": 1526350890000,
                  "deviceId": "003a9a056117b85d389e0e2a8268ee85",
                  "deviceName": "十二村14号",
                  "stateName": "离线",
                  "picUrl": "/ac_device/2.jpg"
              }
          ]
      }
  }
  ```

  ​



## 21. findGpsByPage（警员信息）

* URL：`/zhsq/gps/findGpsByPage`

* 请求地址：`POST`

* 请求参数：

  ```json
  {
      pageSize:10,
      pageNumber:1,
      pcMark:2,
      pcNumber:'',
      department:'',
      policeName:'',
      policeMobileNo:''
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalRow": 5,
          "isMore": 0,
          "totalPage": 1,
          "startIndex": 0,
          "list": [
              {
                  "pageNumber": 1,
                  "pageSize": 10,
                  "startTime": null,
                  "endTime": null,
                  "id": null,
                  "villageName": null,
                  "villageCode": "310104006001",
                  "radioID": "44180",
                  "gpsDataTime": "2018-05-31 18:31:26",
                  "pcNumber": "021669",
                  "pcMark": "2",
                  "policeUnit": "田林新村派出所",
                  "lon": "13516451.013",
                  "lat": "3656204.775",
                  "mrowTime": null,
                  "policeName": "朱耀明",
                  "policeMobileNo": "13386266697",
                  "department": "上海市公安局徐汇分局田林新村派出所"
              }
          ]
      }
  }
  ```

## 22. queryPoliceSchedule
* URL: `/zhsq/police/queryPoliceSchedule`

* 请求方式：`POST`

* 请求参数:

  ```json
  {
      pageSize:10,
      pageNumber:1,
      villageCode:'',
      peopleName:'',
      policeNumber:'',
      serviceMode:'1,2,3,4,5',
      startTime:'2018-05-31 00:00:00',
      endTime:'2018-05-31 23:59:59',
      telephone:'',
      regionCode:'',
      departmentNo:'',
      workStatus:'0,1,2,3',
      type:1
  }
  ```

* 返回结果：

  ```json
  {
      "resultCode": 200,
      "resultMessage": "OK",
      "villageName": "",
      "data": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalRow": 63,
          "isMore": 0,
          "totalPage": 0,
          "startIndex": 0,
          "list": [
              {
                  "pageNumber": 1,
                  "pageSize": 10,
                  "startTime": null,
                  "endTime": null,
                  "id": "11185",
                  "villageName": null,
                  "date": null,
                  "regionName": "第一责任区块",
                  "policeNumber": "023401",
                  "peopleName": "唐正隽",
                  "serviceModeName": "社区勤务",
                  "serviceModeName1": null,
                  "serviceModeName2": null,
                  "serviceModeName3": null,
                  "serviceModeName4": null,
                  "serviceModeName5": null,
                  "serviceModeName6": null,
                  "serviceModeName7": null,
                  "startWorkTime": "2018-05-31 00:00:00.0",
                  "endWorkTime": "2018-05-31 23:59:00.0",
                  "villageCode": "0",
                  "regionCode": "1601",
                  "idcardNo": "310104198501254413",
                  "telephone": "13386268339",
                  "serviceMode": "4",
                  "departmentNo": "310104570000",
                  "department": "上海市公安局徐汇分局田林新村派出所",
                  "remark": null,
                  "mrowTime": "2018-05-30 20:20:24.0",
                  "lon": null,
                  "lat": null,
                  "workStatus": "1",
                  "checked": false
              }
          ]
      }
  }
  ```

  ​
