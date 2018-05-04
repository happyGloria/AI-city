/**
 * car
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify','laydate'],
  function(app, controllers, $, configFile, common, notify,laydate) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode || '';
        // RV: 登记车辆
        // RNV: 外来车辆
        // RNVNL: 外来车辆滞留
        // IV: 进小区车辆
        // OV: 出小区车辆
        var key = "carSenseType_" + villageCode;
        var start = moment().format("YYYY-MM-DD 00:00:00");
        var end = moment().format("YYYY-MM-DD HH:mm:ss");
        if (localStorage.getItem(key)) {
          var obj = JSON.parse(localStorage.getItem(key));
          $scope.showTab = {
            "RV": true,
            "RNV": false,
            "RNVNL": false,
            "IV": false,
            "OV": false
          };
          for (var key in $scope.showTab) {
            $scope.showTab[key] = false;
            if (obj.params == key) {
              $scope.showTab[key] = true;
            }
          }
          $scope.initParams = {
            pageSize: 10,
            pageNumber: 1,
            queryType: obj.params,
            villageCode:villageCode,
            plateNumber: "",
            inOutType: "",
            startTime: start,
            endTime: end
          };
        }

        $scope.initParams = $scope.initParams || {
            pageSize: 10,
            pageNumber: 1,
            queryType: "IV",
            villageCode:villageCode,
            plateNumber: "",
            inOutType: "",
            startTime: start,
            endTime: end
        };
        $scope.page1 = {
          totalRow: 0,
          count: 0
        };
        $scope.inOutArr = [{
          code: "1",
          name: "驶入"
        }, {
          code: "2",
          name: "驶出"
        }];
        $timeout(function() {
          laydate.render({
          elem: '#startTime',
          type: "datetime",
          value: start,
          done: function(value, date, endDate) {
            $scope.initParams.startTime = value;
          }
        });
        }, 10);
        
        $timeout(function(){
          laydate.render({
          elem: '#endTime',
          type: "datetime",
          value: end,
          done: function(value, date, endDate) {
            $scope.initParams.endTime = value;
          }
        });
        },10)
        

        //查询开门记录
        $scope.captrueCarList = function(value) {
          $scope.loader = true;
          if (value) {
            $scope.initParams.pageNumber = 1;
          }
          var req1 = {
            villageCode: $scope.initParams.villageCode,
            pageSize: $scope.initParams.pageSize,
            pageNumber: $scope.initParams.pageNumber,
            queryType:$scope.initParams.queryType,
            plateNumber: $scope.initParams.plateNumber,
            startTime: $scope.initParams.startTime,
            endTime: $scope.initParams.endTime,
            inOutType: $scope.initParams.inOutType,
          };

          var promise = moreService.queryDiffTypeVehicle(req1);
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              debugger
              $scope.carListData = resp.data.list;
              $scope.page1.totalRow = resp.data.totalRow;
              localStorage.removeItem(key);

              if ($scope.showTab.RNVNL) {
                if (resp.data.list.length == 0) {
                  $scope.listData = [];
                }else{
                  $scope.queryNotLeave();
                }
                
              }else{
                return;
              }
            }
          }).catch(function() {}).finally(function() {
            $scope.loader = false;
          });
        };
        $scope.captrueCarList();
        //分页
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
          };

        $scope.doorImgClick = function(item) {
          var src = common.getUrl(item);
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

        $scope.toResident = function(value) {
          debugger
          var residentParam = {
            "villageCode":villageCode,
            "buildingNo":value.buildingNo,
            "houseNo":value.houseNo
          };
          localStorage.setItem('resident_'+ villageCode, JSON.stringify(residentParam));
          var url = '../../../template/html/modules/buildingHouse/house.html?villageCode=' + villageCode;
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
             // $(layero).append(iframe);
              $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size')) 
            }
          });
        };

        // init();


      }
    ];
    return doorRecordCtrl;
  });