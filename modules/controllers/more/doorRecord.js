/**
 * 开门记录
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout', 'communityService', 'communityRightModuleService',
      function($scope, $state, $stateParams, moreService, $compile, $timeout, communityService, rightService) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        debugger
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode;
        $scope.villageName = configFile.communityCodeToName[villageCode];
        function init(){
          debugger
          //from实有设施柱状图
          // if (localStorage.getItem("facility_" + villageCode)) {
          //   // $scope.showTab.openDoorRecord = false;
          //     // $scope.$apply();
          //   $scope.changeTab("deviceRecord");
          //   localStorage.removeItem("facility_" + villageCode);
          // }else{
          //    openDoorRecordFun();
          // }
          if (localStorage.getItem("menjinRecord_" + villageCode)) {
            $scope.opendoorParams = JSON.parse(localStorage.getItem("menjinRecord_" + villageCode));
            localStorage.removeItem("menjinRecord_" + villageCode);
            openDoorRecordFun()
          }
          openDoorRecordFun();
        }
        /**
         * 开门记录
         */
          function openDoorRecordFun(){
            debugger
            $scope.opendoorParams = $scope.opendoorParams || {
              villageCode:villageCode,
              startTime: "",
              endTime: "",
              pageSize: 10,
              pageNumber: 1,
              pushType:2,
              peopleName:"",
              deviceName:"",
              credentialNo:"",
              openType:""
            };
            $scope.opendoorPage = {
              totalRow: 0,
              count: 0
            };

            $scope.openType = [
              {
                code: "100101", //
                name: "IC卡开门"
              }, {
                code: "100102", //
                name: "NFC开门"
              }, {
                code: "100201", //
                name: "手机蓝牙开门"
              },
              // {
              //   code:"100301",
              //   name:"出门按钮开门"
              // },{
              //   code:"100302",
              //   name:"锁具旋钮开门"
              // },
              {
                code: "100303", //
                name: "键盘密码开门"
              },
              // {
              //   code:"100304",
              //   name:"机械钥匙开门"
              // },{
              //   code:"100401",
              //   name:"访客呼叫开门"
              // },
              {
                code: "100501", //
                name: "物业IC卡刷卡进门"
              },
              // {
              //   code:"100502",
              //   name:"管理卡刷卡"
              // },{
              //   code:"100503",
              //   name:"巡检卡刷卡"
              // },
              {
                code: "100505", //
                name: "厂商IC卡刷卡进门"
              }, {
                code: "100506", //
                name: "外来人员IC刷卡进门"
              }, {
                code: "100507", //
                name: "二代证或居住证进门"
              },
              // {
              //   code:"100508",
              //   name:"冻结卡刷卡"
              // },{
              //   code:"100509",
              //   name:"一级管理员卡刷卡"
              // },{
              //   code:"100510",
              //   name:"冻结二代证刷卡"
              // },{
              //   code:"100601",
              //   name:"其他证刷卡"
              // },{
              //   code:"100701",
              //   name:"用户IC卡初次使用"
              // },
              {
                code: "100801", //
                name: "一次性密码"
              }, {
                code: "100802", //
                name: "人脸识别开门"
              }, {
                code: "100804", //
                name: "app远程开门"
              }, {
                code: "100805", //
                name: "DTMF开门"
              }
            ];
            $scope.openDoorTypeMap = {
              "100101":"IC卡开门",
              "100805":"DTMF开门",
              "100804":"app远程开门",
              "100802":"人脸识别开门",
              "100801":"一次性密码",
              "100507":"二代证或居住证进门",
              "100506":"外来人员IC刷卡进门",
              "100505":"厂商IC卡刷卡进门",
              "100501":"物业IC卡刷卡进门",
              "100303":"键盘密码开门",
              "100201":"手机蓝牙开门",
              "100102":"NFC开门"
            }
            $scope.getOpenDoorTypeName = function(value){
              return $scope.openDoorTypeMap[value]
            }
            //时间初始化
            laydate.render({
              elem: '#startTime',
              type: "datetime",
              value: "",
              done: function(value, date, endDate) {
                $scope.opendoorParams.startTime = value;
              }
            });

            laydate.render({
              elem: '#endTime',
              type: "datetime",
              value: "",
              done: function(value, date, endDate) {
                $scope.opendoorParams.endTime = value;
              }
            });

            $scope.loader = true;
            //查询开门记录
            $scope.queryOpenRecord = function(value) {
              $scope.loader = true;
              if (value) {
                $scope.opendoorParams.pageNumber = 1;
              }
              var req1 = {
                villageCode: $scope.opendoorParams.villageCode,
                startTime: $scope.opendoorParams.startTime,
                endTime: $scope.opendoorParams.endTime,
                pageSize: $scope.opendoorParams.pageSize,
                pageNumber: $scope.opendoorParams.pageNumber,
                pushType: $scope.opendoorParams.pushType,
                peopleName: $scope.opendoorParams.peopleName,
                deviceName: $scope.opendoorParams.deviceName,
                credentialNo: $scope.opendoorParams.credentialNo,
                openType: $scope.opendoorParams.openType
              };
              // var startDate = new Date($scope.deployParams.startTime).getTime();
              // var endDate = new Date($scope.deployParams.endTime).getTime();
              // if(startDate > endDate) {
              //         notify.error("开始时间不能大于结束时间！");
              //         loading = false;
              //         return;
              // }
              var promise = moreService.openDoorRecord(req1);
              promise.then(function(resp) {
                if (resp.resultCode == 200) {
                  debugger
                  $scope.doorRecords = resp.data.openRecord.list;
                  $scope.opendoorPage.totalRow = resp.data.openRecord.totalRow
                }
              }).catch(function() {}).finally(function() {
                $scope.loader = false;
              });
            };
            // setTimeout(function() {
              $scope.queryOpenRecord();
            // }, 0)
          }
        /**
         * 设备记录
         */
          function deviceRecordFun(){
            debugger
            $scope.doorDeviceParams = {
              pageSize: 10,
              pageNumber: 1,
              villageCode:villageCode,
              deviceName: "",
              buildingName: "",
              villageName: "",
              state: "",
            };
            $scope.devicePage = {
              totalRow: 0,
              count: 0
            };
            $scope.IsOnlineArr = [
              {
                code: "1",
                name: "正常",
              }, {
                code: "0",
                name: "异常",
              }
            ];
            $scope.queryDoorDevice = function() {
              $scope.loader = true;
              var req2 = {
                pageSize: $scope.doorDeviceParams.pageSize,
                pageNumber: $scope.doorDeviceParams.pageNumber,
                villageCode: $scope.doorDeviceParams.villageCode,
                deviceName: $scope.doorDeviceParams.deviceName,
                buildingNo: $scope.doorDeviceParams.buildingName,
                villageName: $scope.doorDeviceParams.villageName,
                state: $scope.doorDeviceParams.IsOnline ||""
              };
              debugger
              var promise = moreService.doorDevice(req2);
              promise.then(function(resp) {
                if (resp.resultCode == 200) {
                  $scope.deviceData = resp.data.list;
                  $scope.devicePage.totalRow = resp.data.totalRow
                }
              }).catch(function() {}).finally(function() {
                $scope.loader = false;
              });
            };
            $scope.queryDoorDevice();
          }

        /**
         * [doorImgClick description]
         * @param  {[type]} item [description]
         * @return {[type]}      [description]
         */
          $scope.doorImgClick = function(item) {
              var src = common.getUrl(item.imgUrl.split(",")[0]);
              var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
              layer.open({
                  type: 1,
                  title: "门禁图片",
                  skin: 'dark-layer',
                  area: ['5.06rem', '6.74rem'],
                  shade: 0.8,
                  closeBtn: 1,
                  shadeClose: true,
                  content: img,
                  end: function(index, layero) {
                      // swObj.shade.show("false");
                  },
                  success: function(layero) {
                      $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                      $(layero).append(iframe);
                  }
              })
          }


        /**
         * doorVideoClick
         */
          var videoId;
          $scope.doorVideoClick = function(item) {
              sessionStorage.setItem("videoSrc", JSON.stringify(item.videoUrl));
              var url = item.videoUrl.split(",");
              var height = "650px";
              if(url.length == 1){
                  height = "350px";
              }
              videoId = layer.open({
                  type: 2,
                  title: "门禁视频",
                  skin: 'dark-layer',
                  area: ['535px', height],
                  shade: 0.8,
                  closeBtn: 1,
                  shadeClose: true,
                  content: ['../../../lib/video/video.html', 'no'],
                  end: function(index, layero) {
                      videoId = null;
                      // swObj.shade.show("false");
                  },
                  success: function(layero) {
                      $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                      $(layero).append(iframe);
                  }
              });
          }

        /**
         * tab
         * @type {Object}
         */
          $scope.showTab = {
              "openDoorRecord" : true,
              "deviceRecord" : false,
          }
          $scope.changeTab = function(tabName){
            debugger
              for(var key in $scope.showTab){
                  $scope.showTab[key] = false;
              }
              // $scope.$apply();
              $scope.showTab[tabName] = true;

              if (tabName == "openDoorRecord") {
                openDoorRecordFun();
              }
              if (tabName == "deviceRecord") {
                deviceRecordFun();
              }
          }
        
        //跳档案
        $scope.lalerPeopleFile = function(index) {
          var id = index;
          var title = "档案";
          url = window.location.href.split("/#")[0] + "#index/peoplefile/" + id + "/";
          window.open(url);
        };
        init();

      }
    ];
    return doorRecordCtrl;
  });