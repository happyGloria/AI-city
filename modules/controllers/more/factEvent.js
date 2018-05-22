/**
 * 实有事件
 * Created by mww on 2017/12/13.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate', 'yituFace'],
  function(app, controllers, $, configFile, common, notify, laydate, yituFace) {
    var factEventCtrl = ['$scope', '$state', '$http', '$stateParams', 'moreService', '$compile', '$timeout', 'communityService', 'communityRightModuleService',
      function($scope, $state, $http, $stateParams, moreService, $compile, $timeout, communityService, rightService) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode || '';
        $scope.facePath = {
          arr: [],
          img: ""
        };
        var villageName="";
        villageName = configFile.communityCodeToName[villageCode];
        var newCaseAddress = configFile.communityCodeToCaseAddress[villageCode];
        $scope.villageName = villageName;
        $scope.villageNameMap = configFile.villageNameMap;
        //处置状态
        $scope.processState = [ 
          { 'code':'0', 'name':'未处理'},
          { 'code':'1', 'name':'已处理'}
        ];
        var initStartTime;
        var initEndTime;
        var obj = {};
        obj.source = "";
        /**页面初始化
         *
         */
        function init() {
          debugger
          $scope.doorNotCloseParams = null;
          $scope.abnormalCardParams = null;
          //判断入口是不是多小区首页
          $scope.judgeAllCommunityFlag = false;
          var key = "factEvent" + villageCode;
          if (localStorage.getItem(key) && "undefined" != localStorage.getItem(key)) {
            obj = JSON.parse(localStorage.getItem(key));
            localStorage.removeItem(key);
            if (obj.source == "AllCommunity") {
              $scope.judgeAllCommunityFlag =true;
              //初始化时间为当天
              initStartTime = moment().format("YYYY-MM-DD 00:00:00");
              initEndTime = moment().format("YYYY-MM-DD HH:mm:ss");
              if (obj.type == "senseFindOrLeave") {
                $scope.changeTab("people");
              }
              if (obj.type == "monitor") {
                $scope.changeTab("monitor");
              }
              if (obj.type == "fireNotice") {
                $scope.changeTab("notice");
                $scope.changeChildTab("fireNotice");
                fireNoticeFun();
              }
              if (obj.type == "doorNotClose") {
                $scope.changeTab("notice");
                $scope.changeChildTab("doorNotClose");
                doorNotCloseFun();
              }
              if (obj.type == "abnormalCard") {
                $scope.changeTab("notice");
                $scope.changeChildTab("abnormalCard");
                abnormalCardFun();
              }
              if (obj.type == "carSenseFind") {
                $scope.changeTab("car");
                $scope.changeChildTab("carSenseFind");
                carSenseFindFun();
              }
              if (obj.type == "carSenseLeave") {
                $scope.changeTab("car");
                $scope.changeChildTab("carSenseLeave");
                carSenseLeaveFun();
              }
               if (obj.type == "analysis") {
                $scope.changeTab("notice");
                $scope.changeChildTab("analysis");
                abnormalCardFun();
              }
               if (obj.type == "receivedCase") {
                $scope.changeTab("case");
                $scope.changeChildTab("receivedCase");
                receivedCaseFun();
              }
              if (obj.type == "warning") {
                $scope.changeTab("case");
                $scope.changeChildTab("warning");
                warningFun();
              }
              if (obj.type == "outCarStay") {
                $scope.changeTab("car");
                $scope.changeChildTab("outCarStay");
                outCarStayFun();
              }
            }else{
              if (obj.type == "senseFindOrLeave") {
                debugger
                $scope.changeTab("people");
              }
              if (obj.type == "monitor") {
                $scope.changeTab("monitor");
              }
              if (obj.type == "fireNotice") {
                $scope.changeTab("notice");
                $scope.changeChildTab("fireNotice");
                fireNoticeFun();
              }
              if (obj.type == "doorNotClose") {
                $scope.changeTab("notice");
                $scope.changeChildTab("doorNotClose");
                doorNotCloseFun();
              }
              if (obj.type == "abnormalCard") {
                $scope.changeTab("notice");
                $scope.changeChildTab("abnormalCard");
                abnormalCardFun();
              }
              if (obj.type == "carSenseFind") {
                $scope.changeTab("car");
                $scope.changeChildTab("carSenseFind");
                carSenseFindFun();
              }
              if (obj.type == "carSenseLeave") {
                $scope.changeTab("car");
                $scope.changeChildTab("carSenseLeave");
                carSenseLeaveFun();
              }
               if (obj.type == "analysis") {
                $scope.changeTab("notice");
                $scope.changeChildTab("analysis");
                abnormalCardFun();
              }
               if (obj.type == "receivedCase") {
                $scope.changeTab("case");
                $scope.changeChildTab("receivedCase");
                receivedCaseFun();
              }
              if (obj.type == "warning") {
                $scope.changeTab("case");
                $scope.changeChildTab("warning");
                warningFun();
              }
              if (obj.type == "outCarStay") {
                $scope.changeTab("car");
                $scope.changeChildTab("outCarStay");
                outCarStayFun();
              }
            }

          } else {
            monitorFun()
          }

        }
        /**布控告警
         *
         */
        function monitorFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.monitorParams = $scope.monitorParams || {            
            "condition": {
              "eventId": "",
              "name": "",
              "personId": "",
              "eventDealState": ""
            },
            "pageSize": 10,
            "pageNumber": 1
          };
          $scope.monitorParamsPage = {
            totalRow: 0,
            count: 0
          };   
          $scope.processState = [{
            code: "0",
            name: "待分配"
          },{
            code: "61",
            name: "待接警"
          },{
            code: "62",
            name: "已接警"
          },{
            code: "64",
            name: "处理中"
          },{
            code: "65",
            name: "已完成"
          }];       
          $scope.queryMonitorList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.monitorParams.pageNumber = 1;
            }
            var req1 = {              
              pageSize: $scope.monitorParams.pageSize,
              pageNumber: $scope.monitorParams.pageNumber,
              condition: {
                eventId: $scope.monitorParams.eventId||'',
                name: $scope.monitorParams.name ||'',
                personId: $scope.monitorParams.personId ||'',
                eventDealState: $scope.monitorParams.eventDealState ||'',
                villageCode:villageCode
              }
            };
            $.ajax({
              type: "post",
              url: "/zhsq/facelibMapper/alert",
              dataType: "json",
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(req1),
              success: function(resp) {
                $scope.loader = false;
                if (resp.resultCode == 200) {
                  var listData = resp.data.list;
                  listData.forEach(function(item) {
                    item.similarity = Number(item.similarity).toFixed(2);
                    item.faceImageBase64 = "data:image/png;base64," + item.faceImageBase64;
                    item.targetFaceImageBase64 = "data:image/png;base64," + item.targetFaceImageBase64;
                    item.captureTime = item.captureTime.split(".")[0];
                    item.villageName = configFile.communityCodeToName[item.villageCode];
                  })
                  $scope.monitorData = listData;                    
                  $scope.monitorParamsPage.totalRow = resp.data.totalRow;
                }                  
                $scope.$apply();
              },
              error: function(err) {
                $scope.loader = false;                  
              }
            });           
          };
          $scope.queryMonitorList();
        }
        /**110警情
         *
         */
        function warningFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.warningParams = {
            villageCode: "",
            inboundTimeStart: initStartTime || start,
            inboundTimeEnd: initEndTime || end,
            pageSize: 10,
            pageNumber: 1,
            caseId: "",
            calleeNo: "",
            callerName: "",
            caseAddress: newCaseAddress || "",
            caseDesc: "",
            eventDealState: ""
          };
          $scope.warningPage = {
            totalRow: 0,
            count: 0
          };
          $scope.stateMap = [{
            code: "0",
            name: "待分配"
          },{
            code: "61",
            name: "待接警"
          },{
            code: "62",
            name: "已接警"
          },{
            code: "64",
            name: "处理中"
          },{
            code: "65",
            name: "已完成"
          }];
          laydate.render({
            elem: '#warningStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.warningParams.inboundTimeStart = value;
            }
          });

          laydate.render({
            elem: '#warningEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.warningParams.inboundTimeEnd = value;
            }
          });

          $scope.queryWarnList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.warningParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: "",
              pageSize: $scope.warningParams.pageSize,
              pageNumber: $scope.warningParams.pageNumber,
              inboundTimeStart: $scope.warningParams.inboundTimeStart,
              inboundTimeEnd: $scope.warningParams.inboundTimeEnd,
              caseId: $scope.warningParams.caseId,
              calleeNo: $scope.warningParams.calleeNo,
              callerName: $scope.warningParams.callerName,
              caseAddress: $scope.warningParams.caseAddress,
              caseDesc: $scope.warningParams.caseDesc,
              eventDealState: $scope.warningParams.eventDealState,
            };
            var promise = moreService.warningList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.warningListData = resp.data.list;
                $scope.warningPage.totalRow = resp.data.totalRow;
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.queryWarnList();
          $scope.changeCode = function(val){
            $scope.warningParams.caseAddress = val;
          };
        };

        /**案件接报
         *
         */
        function receivedCaseFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00")
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.receivedCaseParams = {
            villageCode: villageCode,
            startTime: initStartTime || start,
            endTime: initEndTime || start,
            pageSize: 10,
            pageNumber: 1,
            bjsymc:"",
            fsddqc: "",
            bjxsmc:"",
            bjflmc:"",
            jyqkms: "",
            dealState: ""
          };
          $scope.receivedCasePage = {
            totalRow: 0,
            count: 0
          };
          

          laydate.render({
            elem: '#receivedCaseStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.receivedCaseParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#receivedCaseEndTime',
            type: "datetime",
            value: initEndTime || start,
            done: function(value, date, endDate) {
              $scope.receivedCaseParams.endTime = value;
            }
          });

          $scope.receivedCaseList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.receivedCaseParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.receivedCaseParams.villageCode,
              pageSize: $scope.receivedCaseParams.pageSize,
              pageNumber: $scope.receivedCaseParams.pageNumber,
              startTime: $scope.receivedCaseParams.startTime,
              endTime: $scope.receivedCaseParams.endTime,
              bjsymc:$scope.receivedCaseParams.bjsymc,
              fsddqc: $scope.receivedCaseParams.fsddqc,
              bjxsmc:$scope.receivedCaseParams.bjxsmc,
              bjflmc:$scope.receivedCaseParams.bjflmc,
              jyqkms: $scope.receivedCaseParams.jyqkms,
              dealState: $scope.receivedCaseParams.dealState
            };
            var promise = moreService.getReceivedCase(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.receivedCaseData = resp.data.list;
                $scope.receivedCasePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.receivedCaseList();
        };

        /**人口感知
         *
         */
        function senseFindFun() {
            var height = $("html").height();
            $(".population-per").css("height",height+"px");
            var villageCode = $stateParams.villageCode;
            if(!villageCode){
              $("#yituIframe").attr("src","http://15.233.18.229:11180/#/estate/perception");
            }else{
              $("#yituIframe").attr("src","http://15.233.18.229:11180/#/estate/perception?estate_id="+villageCode);
            }
        }

        /**外来车辆滞留
         *
         */
        function outCarStayFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.initParams = {
            villageCode: villageCode,
            plateNumber: "",
            startTime: initStartTime || start,
            endTime: initEndTime || end,
            pageSize: 10,
            pageNumber: 1
          };

          $scope.page1 = {
            totalRow: 0,
            count: 0
          };
          $scope.inOutArr = [{
            code: "",
            name: "请选择"
          }, {
            code: "1",
            name: "驶入"
          }, {
            code: "2",
            name: "驶出"
          }];
          

          laydate.render({
            elem: '#startTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.initParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#endTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.initParams.endTime = value;
            }
          });

          $scope.captrueCarList = function(value) {
            $scope.loader = true;
            $scope.initParams.pageNumber=1;
            var req1 = {
              villageCode: $scope.initParams.villageCode,
              plateNumber: $scope.initParams.plateNumber,
              startTime: $scope.initParams.startTime,
              endTime: $scope.initParams.endTime,
              pageSize: $scope.initParams.pageSize,
              pageNumber: $scope.initParams.pageNumber
            };

            var promise = moreService.senseCar(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.carListData = resp.data;
                $scope.page1.totalRow = resp.data.length;
                if (resp.data.length == 0) {
                  $scope.listData = [];
                }else{
                  $scope.queryNotLeave();
                }
              }
            }).catch(function() {}).finally(function() {
              // layer.close(index);
              $scope.loader = false;
            });
          };
          $scope.queryNotLeave = function() {
            $scope.listData = [];
            var totalPage = $scope.page1.totalRow % $scope.initParams.pageSize == 0 ? parseInt($scope.page1.totalRow / $scope.initParams.pageSize) :parseInt($scope.page1.totalRow / $scope.initParams.pageSize) + 1;
            var start = ($scope.initParams.pageNumber - 1) * 10;
            var end = $scope.initParams.pageNumber % 10;
            if ($scope.initParams.pageNumber == totalPage) {
              end = $scope.page1.totalRow % $scope.initParams.pageSize;
            } else {
              end = $scope.initParams.pageSize;
            }
            for (var i = start; i < start + end; i++) {
              $scope.listData.push($scope.carListData[i])
            }
            console.log($scope.listData)
          };

          $scope.doorImgClick = function(item) {
            // communityService.queryDoorImg(req).then(function(resp){
            var src = '/zhsq/file/show?path=' + item;
            var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
            var carLayer = layer.open({
              type: 1,
              title: false,
              area: ['640px', '360px'],
              shade: 0.8,
              closeBtn: 0,
              shadeClose: true,
              content: img,
              end: function() {
                layer.close(carLayer);
              },
              success: function(layero) {
                $(layero).append(iframe);
              }
            });
            // })
          }



          $scope.captrueCarList();
        };

        /**车辆感知发现
         *
         */
        function carSenseFindFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00")
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.carSenseFindParams = $scope.carSenseFindParams || {
            pageSize: 10,
            pageNumber: 1,
            villageCode: villageCode,
            eventDealState:"",
            startTime: initStartTime || start,
            endTime: initEndTime || end
          };
          $scope.carSenseFindPage = {
            totalRow: 0,
            count: 0
          };

          laydate.render({
            elem: '#carSenseFindStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.carSenseFindParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#carSenseFindEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.carSenseFindParams.endTime = value;
            }
          });

          $scope.querycarSenseFind = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.carSenseFindParams.pageNumber = 1;
            }
            var req1 = {
              pageSize: $scope.carSenseFindParams.pageSize,
              pageNumber: $scope.carSenseFindParams.pageNumber,
              villageCode: $scope.carSenseFindParams.villageCode,
              startTime: $scope.carSenseFindParams.startTime,
              endTime: $scope.carSenseFindParams.endTime,
              eventDealState:$scope.carSenseFindParams.eventDealState
            };
            var promise = moreService.carSenseFind(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.carSenseFindData = resp.data.list;
                $scope.carSenseFindPage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.querycarSenseFind();
          // $scope.onChange = function(){
          //   debugger
          //   $('#findCarSelectVillage').on('change',function(){
          //     $scope.querycarSenseFind();
          //     $scope.$apply()
          //   })
          // };
          // $scope.onChange();
        }

        /**车辆感知离开
         *
         */
        function carSenseLeaveFun() {
          //初始化参数
          var start = moment().subtract(8,'days').format("YYYY-MM-DD 00:00:00");
          var end = moment().subtract(8, 'days').format("YYYY-MM-DD 23:59:59");

          $scope.carSenseLeaveParams = $scope.carSenseLeaveParams || {
            startTime: moment().subtract(8, 'days').format("YYYY-MM-DD 00:00:00"),
            endTime: moment().subtract(8, 'days').format("YYYY-MM-DD 23:59:59"),
            pageSize: 10,
            pageNumber: 1,
            plateNumber: "",
            villageCode: villageCode,
            eventDealState:"",
          };
          $scope.carSenseLeavePage = {
            totalRow: 0,
            count: 0
          };
          
          laydate.render({
            elem: '#carSenseLeaveStartTime',
            type: "datetime",
            value: start,
            done: function(value, date, endDate) {
              $scope.carSenseLeaveParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#carSenseLeaveEndTime',
            type: "datetime",
            value: end,
            done: function(value, date, endDate) {
              $scope.carSenseLeaveParams.endTime = value;
            }
          });

          //查询1
          $scope.queryCarSenseLeave = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.carSenseLeaveParams.pageNumber = 1;
            }
            var req1 = {
              pageSize: $scope.carSenseLeaveParams.pageSize,
              pageNumber: $scope.carSenseLeaveParams.pageNumber,
              startTime: $scope.carSenseLeaveParams.startTime,
              endTime: $scope.carSenseLeaveParams.endTime,
              plateNumber: $scope.carSenseLeaveParams.plateNumber,
              villageCode: $scope.carSenseLeaveParams.villageCode,
              eventDealState: $scope.carSenseLeaveParams.eventDealState,
            };
            var promise = moreService.carSenseLeave(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.carSenseLeaveData = resp.data.list;
                $scope.carSenseLeavePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.queryCarSenseLeave();
        }

        /**门未关
         *
         */
        function doorNotCloseFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.doorNotCloseParams = $scope.doorNotCloseParams || {
            villageCode:villageCode,
            startTime: initStartTime || start,
            endTime: initEndTime || end,
            pageSize: 10,
            pageNumber: 1,
            deviceName: "",
          };
          
          $scope.doorNotClosePage = {
            totalRow: 0,
            count: 0
          };
          $scope.statusArr = [{
            code: "",
            name: "请选择"
          }, {
            code: "0",
            name: "未处理"
          }, {
            code: "1",
            name: "已处理"
          }];

          laydate.render({
            elem: '#doorNotCloseStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.doorNotCloseParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#doorNotCloseEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.doorNotCloseParams.endTime = value;
            }
          });
         
          $scope.notCloseDoor = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.doorNotCloseParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.doorNotCloseParams.villageCode,
              startTime: $scope.doorNotCloseParams.startTime,
              endTime: $scope.doorNotCloseParams.endTime,
              pageSize: $scope.doorNotCloseParams.pageSize,
              pageNumber: $scope.doorNotCloseParams.pageNumber,
              deviceName: $scope.doorNotCloseParams.deviceName,
            };
            var promise = moreService.getNotCloseList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.notCloseData = resp.data.list;
                $scope.doorNotClosePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.notCloseDoor();
        };

        /**刷卡异常
         *
         */
        function abnormalCardFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");

          $scope.abnormalCardParams = $scope.abnormalCardParams || {
            villageCode:villageCode,
            pageSize: 10,
            pageNumber: 1,
            startTime: initStartTime || start,
            endTime: initEndTime || end,
            villageCode: villageCode,
            type: "",
            peopleName: "",
            credentialNo: "",
            eventDealState: ""
          };
          $scope.abnormalCardPage = {
            totalRow: 0,
            count: 0
          };
          $scope.abnormalCardWarnType = [
            // {
            // code:"",
            // name:"请选择"
            // },
            {
              code: "1",
              name: "每日通行频次大于10次预警"
            }, {
              code: "2",
              name: "80岁老人5天未出行预警"
            }
          ];
          laydate.render({
            elem: '#abnormalCardStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.abnormalCardParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#abnormalCardEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.abnormalCardParams.endTime = value;
            }
          });

          $scope.doorAlarm = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.abnormalCardParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.abnormalCardParams.villageCode,
              peopleName: $scope.abnormalCardParams.peopleName,
              credentialNo: $scope.abnormalCardParams.credentialNo,
              startTime: $scope.abnormalCardParams.startTime,
              endTime: $scope.abnormalCardParams.endTime,
              pageSize: $scope.abnormalCardParams.pageSize,
              pageNumber: $scope.abnormalCardParams.pageNumber,
              type: $scope.abnormalCardParams.type,
              eventDealState: $scope.abnormalCardParams.eventDealState
            };
            var promise = moreService.getDoorAlarmList(req1);
            promise.then(function(resp) {

              if (resp.resultCode == 200) {
                $scope.doorAlarmData = resp.data.list;
                $scope.abnormalCardPage.totalRow = resp.data.totalRow;
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.doorAlarm();
        };

        /**消防告警
         *
         */
        function fireNoticeFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.fireParams = $scope.fireParams || {
            villageCode: villageCode,
            pageSize: 10,
            pageNumber: 1,
            startTime: initStartTime || start,
            endTime: initEndTime || end,
            deviceNo: "",
            detailAddress:"",
            buildingNo:"",
            floorNo:"",
            houseNo:"",
            type:"",
            eventDealState:""
          };
          $scope.firePage = {
            totalRow: 0,
            count: 0
          };
          $scope.fireNoticeType = [{
            code: "1",
            name: "火警"
          }, {
            code: "2",
            name: "电表"
          },{
            code: "3",
            name: "室外消火栓"
          },{
            code: "4",
            name: "电弧"
          },{
            code: "5",
            name: "室内消火栓"
          }];
          laydate.render({
            elem: '#fireStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
              $scope.fireParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#fireEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
              $scope.fireParams.endTime = value;
            }
          });

          $scope.smokeAlarmList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.fireParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.fireParams.villageCode,
              deviceNo: $scope.fireParams.deviceNo,
              startTime: $scope.fireParams.startTime,
              endTime: $scope.fireParams.endTime,
              pageSize: $scope.fireParams.pageSize,
              pageNumber: $scope.fireParams.pageNumber,
              detailAddress:$scope.fireParams.detailAddress,
              buildingNo:$scope.fireParams.buildingNo,
              type:$scope.fireParams.type,
              floorNo:$scope.fireParams.floorNo,
              houseNo:$scope.fireParams.houseNo,
              eventDealState:$scope.fireParams.eventDealState
            };

            var promise = moreService.smokeAlarmList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                
                $scope.smokeData = resp.data.list;
                $scope.firePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.smokeAlarmList();
        };

        /**智能分析
         *
         */
        function analysisFun() {
          var start = moment().format("YYYY-MM-DD 00:00:00");
          var end = moment().format("YYYY-MM-DD HH:mm:ss");
          $scope.analysisParams = {
            villageCode: villageCode,
            startTime: initStartTime || start,
            endTime: initEndTime || end,
            pageSize: 10,
            pageNumber: 1,
            eventAddress: "",
            eventAnalysisType: ""
          };
          $scope.analysisPage = {
            totalRow: 0,
            count: 0
          };
          $scope.analysisSelect = [
          // {
          //   code: "2",
          //   name: "攀爬告警"
          // }, 
          {
            code: "1",
            name: "占道告警"
          },{
            code: "3",
            name: "攀爬告警"
          }
          // ,{
          //   code: "4",
          //   name: "逆向行驶"
          // }
          ];
           $scope.matchAnalysisSelect = {
            "1": "占道告警",
            // "2": "攀爬告警",
            "3": "攀爬告警",
            // "4": "逆向行驶"
          };
          $scope.filterFun = function(value){
            return $scope.matchAnalysisSelect[value]
          }

          laydate.render({
            elem: '#analysisStartTime',
            type: "datetime",
            value: initStartTime || start,
            done: function(value, date, endDate) {
             
              $scope.analysisParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#analysisEndTime',
            type: "datetime",
            value: initEndTime || end,
            done: function(value, date, endDate) {
             
              $scope.analysisParams.endTime = value;
            }
          });

          $scope.queryAnalysis = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.analysisParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.analysisParams.villageCode,
              startTime: $scope.analysisParams.startTime,
              endTime: $scope.analysisParams.endTime,
              pageSize: $scope.analysisParams.pageSize,
              pageNumber: $scope.analysisParams.pageNumber,
              eventAddress: $scope.analysisParams.eventAddress,
              eventAnalysisType: $scope.analysisParams.eventAnalysisType
            };

            var promise = moreService.analysis(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
             
                $scope.analysisData = resp.data.list;
                $scope.analysisPage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.queryAnalysis();
          $scope.clickPicToLarge = function(item) {
            var src = item.imgArr[0];
            var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
            layer.open({
              type: 1,
              title: false,
              area: ['640px', '360px'],
              shade: 0.8,
              closeBtn: 0,
              shadeClose: true,
              content: img,
              end: function(index, layero) {
                // swObj.shade.show("false");
              },
              success: function(layero) {
                $(layero).append(iframe);
              }
            });
          }
        };

        /**上传图片
         *
         */
        var picBase64Arr = [];
        $scope.faceFeature = null;
        $scope.resultsPicUrl = [];
        $scope.str = "";
        $scope.uploadImg = function() {
          debugger
          $('#imageFile').unbind("change").bind("change", function() {
            // ;
            inputToBase64(this, addLi);
          });

        };

        //input选中的图片转成base64
        function inputToBase64(input_file, callBack) {
          // 
          /*input_file：文件按钮对象*/
          /*get_data: 转换成功后执行的方法*/
          // ;
          if (typeof(FileReader) === 'undefined') {
            alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
          } else {
            try {
              /*图片转Base64 核心代码*/
              var file = input_file.files[0];
              //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件  
              if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
              }
              var reader = new FileReader();
              reader.onload = function() {
                var base64 = this.result.split(",")[1];
                // console.log(base64)
                picBase64Arr.push(base64);
                console.log(picBase64Arr);
                callBack(base64);
              }
              reader.readAsDataURL(file);
            } catch (e) {
              alert('图片转Base64出错啦！' + e.toString())
            }
          }
        }

        //点上传增量一个li
        function addLi(picBase64) {
          
          $scope.str = '<li class="untreate-photo-li img-box-li">';
          $scope.str += '<div class="img-box">';
          $scope.str += '<img src="data:image/png;base64,' + picBase64 + '" />';
          $scope.str += '</div>';
          // str+= '<span class="delect-span">';
          // str+= '<i class="delect-icon-new">';
          // str+= '</i>删除';
          // str+= '</span>';
          // str+= '<div class="delect-oper clearfix">';
          // str+= '<span class="pull-left">确认';
          // str+= '</span>';
          // str+= '<span class="pull-left">取消';
          // str+= '</span>';
          // str+= '</div>';
          $scope.str += '</li>';
          $("#lastLi").before($scope.str);
          uploadPicFun();
        }

        //上传图片到服务器
        function uploadPicFun() {
          // console.log(1)
          
          var data = new FormData();
          var filesArr = document.querySelector('input[type=file]').files;
          data.append('mpFile', filesArr[0]);
          console.log(data)
          $http({
            method: 'POST',
            url: "/zhsq/file/uploadPfsFile",
            data: data,
            headers: {
              'Content-Type': undefined
            },
            // processData:false,
            transformRequest: angular.identity
          }).success(function(resp) {
            
            //上传成功的操作
            if (!!resp.data) {
              
              // console.log(resp.data.path)
              $scope.resultsPicUrl.push(resp.data.path);
              console.log($scope.resultsPicUrl)
              $('#imageFile').unbind("change").bind("change", function() {
                inputToBase64(this, addLi);
              });
            } else {
              notify.warn('图片上传失败！');

            }
          }).error(function(error) {});
        }

        /**弹窗
         *
         */
        $scope.dealResultData = '';
        var untreatedLayer = null;
        var treatedLayer = null;
        $scope.clickUntreated = function(item, $index) {
          var obj = document.getElementById('imageFile');

          if (item.dealState == "0") {
            //清空数据
            $scope.textRemark = "";
            $scope.str = "";
            $scope.resultsPicUrl = [];
            $("#ulId >li").filter(function(index){  
              return index!=$("#ulId").find("li").length-1;  
              }).remove();  

            //参数初始化
            var currentItem = item;
            var req = {
              villageCode: villageCode,
              eventId: "",
              eventType: "",
              dealContent: "",
              pic: "",
              dealSate: ""
            };
            untreatedLayer = layer.prompt({
              type: 1,
              title: "处理事件",
              btn: ['有效', '无效', '暂不处理'],
              area: ['600px', '400px'], //$scope.area
              shadeClose: true,
              skin: 'untreatedLayer',
              closeBtn: 1,
              content: $('#untreatedLayer'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
              end: function() {

              },
              yes: function(index, layero) {
                var pic
                if ($scope.resultsPicUrl.length != 0) {
                  pic = $scope.resultsPicUrl.join();
                }else{
                  pic = "";
                }

                req = {
                  villageCode: currentItem.villageCode,
                  eventId: currentItem.eventId,
                  eventType: currentItem.eventType,
                  dealContent: $scope.textRemark,
                  pic: pic,
                  dealState: 1
                };
                var promise = moreService.detailEvent(req);
                promise.then(function(resp) {
                  if (resp.resultCode == 200) {
                    layer.close(untreatedLayer);
                    //调列表接口刷新列表
                    var eventType = currentItem.eventType;
                      switch(eventType){
                      case 1:
                        senseLeaveFun();
                        break;
                      case 2:
                        senseFindFun();
                        break;
                      case 3:
                        carSenseLeaveFun();
                        break;
                      case 4:
                        carSenseFindFun();
                        break;
                      case 5:
                        outCarStayFun();
                        break;
                      case 6:
                        warningFun();
                        break;
                      case 7:
                        receivedCaseFun();
                        break;
                      case 8:
                        abnormalCardFun();
                        break;
                      case 9:
                        fireNoticeFun();
                        break;
                      case 10:
                        analysisFun();
                        break;
                      case 11:
                        doorNotCloseFun();
                        break;
                      case 12:
                        monitorFun();
                        break;
                      default:
                        break;
                     }

                  }
                }).catch(function() {}).finally(function() {

                });
              },
              btn2: function() {
                var pic
                if ($scope.resultsPicUrl.length != 0) {
                  pic = $scope.resultsPicUrl.join();
                }else{
                  pic = "";
                }

                req = {
                  villageCode: currentItem.villageCode,
                  eventId: currentItem.eventId,
                  eventType: currentItem.eventType,
                  dealContent: $scope.textRemark,
                  pic: pic,
                  dealState: 2
                };
                var promise = moreService.detailEvent(req);
                promise.then(function(resp) {
                  if (resp.resultCode == 200) {
                    layer.close(untreatedLayer);
                    //调列表接口刷新列表
                    if (currentItem.eventType == 1) {
                      senseLeaveFun();
                    }
                    if (currentItem.eventType == 2) {
                      senseFindFun();
                    }
                    if (currentItem.eventType == 3) {
                      carSenseLeaveFun();
                    }
                    if (currentItem.eventType == 4) {
                      carSenseFindFun();
                    }
                    if (currentItem.eventType == 5) {
                      outCarStayFun();
                    }
                    if (currentItem.eventType == 6) {
                      warningFun();
                    }
                    if (currentItem.eventType == 7) {
                      receivedCaseFun();
                    }
                    if (currentItem.eventType == 8) {
                      abnormalCardFun();
                    }
                    if (currentItem.eventType == 9) {
                      fireNoticeFun();
                    }
                    if (currentItem.eventType == 10) {
                      analysisFun();
                    }
                    if (currentItem.eventType == 11) {
                      doorNotCloseFun();
                    }
                    if (currentItem.eventType == 12) {
                      monitorFun();
                    }

                  }
                }).catch(function() {}).finally(function() {

                });
              },
              btn3: function() {
                
              },
              cancel: function(index, layero) {

              }
            });
          } else if (item.dealState != "0") {
            $scope.dealResultData = item;
            //$scope.dealResultData.pic    逗号字符串
            $scope.dealResultData.picArr = [];
            if ($scope.dealResultData.pic != null && $scope.dealResultData.pic != 'undefined') {
              if ($scope.dealResultData.pic.indexOf(",") > -1) {
                $scope.dealResultData.picArr = $scope.dealResultData.pic.split(',');
              } else {
                $scope.dealResultData.picArr.push($scope.dealResultData.pic);
              }
            }
            // console.log($scope.dealResultData.picArr)
            // console.log($scope.dealResultData.picArr.length)
            treatedLayer = layer.open({
              type: 1,
              title: "查看处理记录",
              area: ['800px', '450px'], //$scope.area
              shadeClose: true,
              closeBtn: 1,
              skin: 'treatedLayer',
              content: $('#treatedLayer'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
              end: function() {


              },
              yes: function(index, layero) {},
              cancel: function(index, layero) {
                // console.log(1)
              }
            });
          }

        };

        /**跳转一人一档
         *
         */
        $scope.lalerPeopleFile = function(index) {
          var id = index;
          url = window.location.href.split("/#")[0] + "/#index/peoplefile/" + id + "/" + villageCode;
          window.open(url);
        };

        /**切换父tab页
         *
         */
        $scope.showTab = {
          "monitor": true,
          "case": false,
          "people": false,
          "car": false,
          "notice": false
        }

        $scope.changeTab = function(tabName) {
          
          for (var key in $scope.showTab) {
            $scope.showTab[key] = false;
          }
          $scope.showTab[tabName] = true;
          if (tabName == "monitor") {
            monitorFun();
          }
          if (tabName == "case") {
            $scope.changeChildTab("warning");
          }
          if (tabName == "people") {
            $scope.changeChildTab("senseFind");
          }
          if (tabName == "car") {
            $scope.changeChildTab("outCarStay");
          }
          if (tabName == "notice") {
            $scope.changeChildTab("abnormalCard");
          }
        }

        /**切换子tab页
         *
         */
        $scope.showChildTab = {
          "warning": true,
          "receivedCase": false,
          "senseFind": false,
          "senseLeave": false,
          "peopleCount": false,
          "outCarStay": false,
          "doorNotClose": false,
          "abnormalCard": false,
          "fireNotice": false,
          "analysis": false,
          "carSenseFind": false,
          "carSenseLeave": false
        }

        $scope.changeChildTab = function(tabName) {
          if (obj.source) {
            if (obj.source == "AllCommunity" && tabName =="carSenseLeave") {
              initStartTime = moment().subtract(8, 'days').format("YYYY-MM-DD 00:00:00");
              initEndTime = moment().subtract(8, 'days').format("YYYY-MM-DD HH:mm:ss");
            }else if(obj.source == "AllCommunity" && tabName !="carSenseLeave"){
              initStartTime = moment().format("YYYY-MM-DD 00:00:00");
              initEndTime = moment().format("YYYY-MM-DD HH:mm:ss");
            }
          }
          for (var key in $scope.showChildTab) {
            $scope.showChildTab[key] = false;
          }
          $scope.showChildTab[tabName] = true;
          if (tabName == "warning") {
            warningFun();
          }
          if (tabName == "receivedCase") {
            receivedCaseFun();
          }
          if (tabName == "senseFind") {
            senseFindFun();
          }
          if (tabName == "senseLeave") {
            senseLeaveFun();
          }
          if (tabName == "peopleCount") {
            peopleCountFun();
          }
          if (tabName == "outCarStay") {
            outCarStayFun();
          }
          if (tabName == "doorNotClose") {
            doorNotCloseFun();
          }
          if (tabName == "abnormalCard") {
            abnormalCardFun();
          }
          if (tabName == "fireNotice") {
            fireNoticeFun();
          }
          if (tabName == "analysis") {
            analysisFun();
          }
          if (tabName == "carSenseFind") {
            carSenseFindFun();
          }
          if (tabName == "carSenseLeave") {
            carSenseLeaveFun();
          }
        }

        //查看详细照片
        var swiper = null;
        $scope.viewPicFun = function(item) {
          if (item.eventType = 4) {
            $scope.captureFacePic = item.vehicleInOutPic;
          }else{
            $scope.captureFacePic = "";
          }
          // $scope.captureFacePic = item.captrueList;
          // $scope.$apply()
          //点击天数调用接口
          setTimeout(function() {
            layer.open({
              type: 1,
              title: "抓拍照片",
              area: ['640px', '360px'],
              shade: 0.8,
              skin: 'dark-layer',
              closeBtn: 1,
              shadeClose: true,
              content: $("#realPowerPhoto"),
              end: function(index, layero) {},
              success: function(layero) {
                if (!!swiper) {
                  swiper.destroy();
                }
                swiper = new Swiper('.swiper-container', {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  slidesPerGroup: 3,
                  // loop: true,
                  // loopFillGroupWithBlank: true,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }
                });
              }
            });
          }, 0)
        }

        //住户信息
        $scope.toResident = function(item) {
          var obj = {
            "villageCode":item.villageCode,
            "buildingNo":item.buildingNo,
            "houseNo":item.houseNo
          };
          var key = "resident_" + villageCode;
          localStorage.setItem(key, JSON.stringify(obj));
          ///var url = hrefHead + "/#/index/clickResident/"+villageCode;
          var url="/template/html/modules/buildingHouse/house.html?villageCode="+villageCode
          var residentLayer = layer.open({
            type: 2,
            title: "住户信息",
            skin: 'dark-layer',
            shade: 0.7,
            shadeClose: true,
            area: ['8.8rem', '530px'],
            anim: 2,
            scrollbar: false,
            content: [url, 'no'], //iframe的url，no代表不显示滚动条
            end: function() { //此处用于演示
            },
            success: function(layero, index) {
              $(layero).find("iframe").eq(0).contents().find("html").css('font-size','83px') 
            }
          });
        };

        //派单
        $scope.policeGpsData = [];
        $scope.currentSelected = [];
        $scope.selectAll = false;
        $scope.dutyMap = configFile.dutyArea;
        function getPoliceList(){
          $scope.workStatusMap = [{
            "bg": "gongzuo-label",
            "name": "工作",
            "active": true,
            "code":1
          },{
            "bg": "daiming-label",
            "name": "待命",
            "active": false,
             "code":2
          },{
            "bg": "xiuxi-label",
            "name": "休息",
            "active": false,
             "code":3
          }];
          $scope.serviceModeMap = [{
            "bg": "jiemianqinwu-label",
            "name": "街面勤务",
            "active": true,
            "code":3
          },{
            "bg": "shequqinwu-label",
            "name": "社区勤务",
            "active": false,
             "code":4
          },{
            "bg": "chuangkoufuwu-label",
            "name": "窗口服务",
            "active": false,
             "code":5
          },{
            "bg": "dajipoan-label",
            "name": "侦查办案",
            "active": false,
             "code":2
          },{
            "bg": "zonghezhihui-label",
            "name": "综合指挥",
            "active": false,
             "code":1
          }];
          // var initStartTime = moment().format("2018-03-27 HH:mm:ss");
          // var initEndTime = moment().format("2018-03-27 HH:mm:ss");
          $scope.policeGpsParams = {
            pageSize:999,
            pageNumber:1,
            villageCode:villageCode,
            peopleName:"",
            policeNumber:"",
            serviceMode:"",
            // startTime:initStartTime,
            // endTime:initEndTime,
            serviceMode:"",
            telephone:"",
            regionCode:"",
            departmentNo:"",
            workStatus:""
          };

          $scope.policeGps = function(){
            $scope.policeGpsPage={
               totalRow:0,
               count:0
            };
            var statusStr = $scope.policeGpsParams.workStatus;
            var modelStr = $scope.policeGpsParams.serviceMode;
            $.each($scope.workStatusMap,function(i,v){
              if (v.active) {
                if (statusStr.indexOf(',') ==0) {
                  statusStr = statusStr.substring(1,statusStr.length);
                }
                statusStr = statusStr + v.code + ',';
              }
            })
            statusStr = statusStr.substring(0,statusStr.length-1);
            $.each($scope.serviceModeMap,function(i,v){
              if (v.active) {
                if (modelStr.indexOf(',') ==0) {
                  modelStr = modelStr.substring(1,modelStr.length);
                }
                modelStr = modelStr + v.code + ',';
              }
            })
            modelStr = modelStr.substring(0,modelStr.length-1);

            var req = {
              pageSize:$scope.policeGpsParams.pageSize,
              pageNumber:$scope.policeGpsParams.pageNumber,
              villageCode:$scope.policeGpsParams.villageCode,
              peopleName:$scope.policeGpsParams.peopleName,
              policeNumber:$scope.policeGpsParams.policeNumber,
              serviceMode:modelStr,
              // startTime:$scope.policeGpsParams.startTime,
              // endTime:$scope.policeGpsParams.endTime,
              telephone:$scope.policeGpsParams.telephone,
              regionCode:$scope.policeGpsParams.regionCode,
              departmentNo:$scope.policeGpsParams.departmentNo,
              workStatus:statusStr
            };
            moreService.getPoliceTable(req).then(function(resp){
              debugger
              var i = 0;
              $.each(resp.data.list,function(i,v){
                v.communityName = configFile.communityCodeToName[v.villageCode];
                v.serviceName = configFile.serviceModeToName[v.serviceMode];
                v.statusName = configFile.workStatusToName[v.workStatus];
                
              })
              $scope.policeGpsData = resp.data.list;
              $scope.policeGpsPage.totalRow=resp.data.totalRow
            })
          };
          $scope.policeGps(); 
        };
        $scope.selectLabel = function(item){
          item.active = !item.active
        }
        $scope.checkRow = function(item){
            item.checked = !item.checked;
            var obj = {
                "name":item.peopleName,
                "idcardNo":item.idcardNo
              }
            if (item.checked) {
              $scope.currentSelected.push(obj);
              if ($scope.currentSelected.length == $scope.policeGpsData.length) {
                $scope.selectAll = true;
              }
            }else{
              $.each($scope.currentSelected,function(i,v){
                $scope.currentSelected[i] = JSON.stringify(v)
              })
              var $index = _.indexOf($scope.currentSelected,JSON.stringify(obj));
              $scope.currentSelected.splice($index,1);
              $.each($scope.currentSelected,function(i,v){
                $scope.currentSelected[i] = JSON.parse(v)
              })
              if ($scope.currentSelected.length < $scope.policeGpsData.length) {
                $scope.selectAll = false;
              }
            }
            console.log($scope.currentSelected)
          };
        $scope.checkAll = function(){
          debugger
            $scope.selectAll = !$scope.selectAll;
            if ($scope.policeGpsData.length>0) {
              if ($scope.selectAll) {
                $scope.currentSelected = [];
                $.each($scope.policeGpsData,function(i,v){
                  v.checked = true;
                  var obj = {
                    "name":v.peopleName,
                    "idcardNo":v.idcardNo
                  };
                  $scope.currentSelected.push(obj)
                })
              }else{
                $.each($scope.policeGpsData,function(i,v){
                  v.checked = false;
                });
                $scope.currentSelected = [];
              }
            }else{
              notify.warn("请选择人物!")
            }
            console.log($scope.currentSelected)
        };
        $scope.removeCurrent = function(item){
          debugger
          $.each($scope.policeGpsData,function(i,v){
            if (item.idcardNo == v.idcardNo) {
              $scope.policeGpsData[i].checked = false;
            }
          });
          var obj = {
              "name":item.name,
              "idcardNo":item.idcardNo
            };
          $.each($scope.currentSelected,function(i,v){
              $scope.currentSelected[i] = JSON.stringify(v)
            })
          var $index = _.indexOf($scope.currentSelected,JSON.stringify(obj));
          $scope.currentSelected.splice($index,1);
          $.each($scope.currentSelected,function(i,v){
            $scope.currentSelected[i] = JSON.parse(v)
          })
          if ($scope.currentSelected.length < $scope.policeGpsData.length) {
            $scope.selectAll = false;
          }
          console.log($scope.currentSelected)
        }
        //警务流程处理弹窗
        var policeLayer = null;
        var policeDetailLayer = null;
        var receiverArr = [];
        $scope.policeDeal = function(item,$index){
            policeLayer = layer.prompt({
              type: 1,
              title: "警员选择",
              btn: '',
              area: ['1060px', '500px'], //$scope.area
              shadeClose: true,
              skin: '',
              closeBtn: 1,
              scrollbar:false,
              content: $('#policeLayer'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
              success:function(){
                $scope.selectAll = false;
                $scope.currentSelected = [];
                getPoliceList();
              },
              yes: function(index, layero) {
              },
              cancel: function(index, layero) {
              }
            });
            //
            $scope.submit = function(){
              if ($scope.currentSelected.length ==0) {
                  notify.warn('请选择分配警员！');
                  return;
                }else{
                  dealFun(item);
                  layer.close(policeLayer);
                }
            };
            $scope.cancel = function(){
              layer.close(policeLayer);
            };
        };
        
        function dealFun(item){
          if(item.eventType == 6){
              item.eventType_weixin = 7;
          }else if(item.eventType == 9){
            item.eventType_weixin = 5;
          }else if(item.eventType == 13){
            item.eventType_weixin = 1;
          }else if(item.eventType == 7){
            item.eventType_weixin = 4;
          }
          var req1 = {
            data:JSON.stringify(item),
            peopleInfo:JSON.stringify($scope.currentSelected),
            subscribeType:item.eventType_weixin
          };
          var promise = moreService.shouDongPaiDang(req1);
            promise.then(function(resp) {
              if (resp.data.isSuccess) {
                var req2 = {
                  villageCode:item.villageCode,
                  eventId:item.eventId, 
                  eventType:item.eventType, 
                  operatorId:"", 
                  operatorName:"",
                  receiverInfo:JSON.stringify($scope.currentSelected),
                  dealContent:"", 
                  pic:"", 
                  oprateFrom:1, 
                  dealState:61
                };
                var promise = moreService.dealPoliceInfo(req2);
                promise.then(function(resp) {
                  if (resp.resultCode == 200) {
                    layer.close(policeLayer);
                    var eventType = item.eventType;
                      switch(eventType){
                      case 6:
                        warningFun();
                        break;
                      case 9:
                        fireNoticeFun();
                        break;
                      case '13':
                        monitorFun();
                        break;
                      default:
                        break;
                     }
                    notify.success('分配成功！');
                  }
                }).catch(function() {}).finally(function() {});
              }else{
                notify.warn('分配失败！');
              }
            }).catch(function() {}).finally(function() {});
        };
        //查看
        $scope.detailItem = '';
        $scope.detailType = '';
        $scope.lookDetail = function(item,$index,tabName){
          $scope.processArr = [
           {
             processName:"已分配",
             processState:'61',
             isOn:false
           },{
             processName:"已接警",
             processState:'62',
             isOn:false
           },{
             processName:"处理中",
             processState:'64',
             isOn:false
           },{
             processName:"已完成",
             processState:'65',
             isOn:false
           },
          ];
          switch(item.eventType){
            case 6:
              $scope.detailType = 6;
            break;
            case 9:
              $scope.detailType = 9;
            break;
            case '13':
              $scope.detailType = 13;
            break;
          };
          $scope.detailItem = item;
          $scope.currentTabName = tabName;
          policeDetailLayer = layer.prompt({
              type: 1,
              title: "查看流程",
              btn:'',
              area: ['600px', '400px'], //$scope.area
              shadeClose: true,
              skin: 'untreatedLayer',
              closeBtn: 1,
              content: $('#policeLayerDetail'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
              success: function(index, layero) {
                var req = {
                  villageCode:item.villageCode,
                  eventId:item.eventId, 
                  eventType:item.eventType, 
                };
                var promise = moreService.lookDetail(req);
                promise.then(function(resp) {
                  if (resp.resultCode == 200) {
                    $.each($scope.processArr,function(i,v){
                      $.each(resp.data,function(k,w){
                        var resCode = w.processState;
                        switch(resCode){
                          case '61':
                            w.processName = "已分配";
                          break;
                          case '62':
                            w.processName = "已接警";
                          break;
                          case '64':
                            w.processName = "处理中";
                          break;
                          case '65':
                            w.processName = "已完成";
                          break;
                          default:
                          break;
                        }
                        if (v.processState == w.processState) {
                          if (w.dealTime) {
                            w.dealTime = w.dealTime.slice(0,19)
                          }
                          $scope.processArr[i] = w;
                          $scope.processArr[i].isOn = true;
                        }
                        if (v.processState=='64' && w.processState =='63') {
                          $scope.processArr[i].dealTime2 = w.dealTime.slice(0,19) || '';
                          $scope.processArr[i].operatorName2 = w.operatorName || '';
                          $scope.processArr[i].pic2 = v.pic || '';
                        }
                      })
                    })
                  }
                }).catch(function() {}).finally(function() {});
              }
            });
        }
      
        //结束
        $scope.endProcess = function(item){
          var req = {
            villageCode:item.villageCode,
            eventId:item.eventId, 
            eventType:item.eventType, 
            operatorId:"", 
            operatorName:"",
            receiverInfo:JSON.stringify($scope.currentSelected),
            dealContent:"", 
            pic:"", 
            oprateFrom:1, 
            dealState:65
          };
          var promise = moreService.dealPoliceInfo(req);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                layer.close(policeLayer);
                var eventType = item.eventType;
                  switch(eventType){
                  case 6:
                    warningFun();
                    break;
                  case 9:
                    fireNoticeFun();
                    break;
                  case '13':
                    monitorFun();
                    break;
                  default:
                    break;
                 }
                notify.success('结束成功！');
              }
            }).catch(function() {}).finally(function() {
               
            });
        }

        init();

      }
    ];
    return factEventCtrl;


  });