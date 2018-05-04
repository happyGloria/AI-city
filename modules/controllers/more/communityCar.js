/**
 * car
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode || '';
        $scope.villageName = configFile.communityCodeToName[villageCode];
        var key1 = "carParam_" + villageCode;
        if (localStorage.getItem(key1)) {
          $scope.initParams = JSON.parse(localStorage.getItem(key1));
          localStorage.removeItem(key1);
        }
        var key2 = "PlateNumber_" + '';
        if (localStorage.getItem(key2)) {
          var carNumber = localStorage.getItem(key2);
          $scope.initParams = {
            villageCode: villageCode,
            startTime: '',
            endTime: "",
            pageSize: 10,
            pageNumber: 1,
            pushType:3,
            plateNumber:"",
            inOutType: "",
            tollgateName: "",
            address: "",
          };
          localStorage.removeItem(key2);
        }

        $scope.initParams = $scope.initParams || {
          villageCode: villageCode,
          startTime: '',
          endTime: "",
          pageSize: 10,
          pageNumber: 1,
          pushType:3,
          plateNumber:"",
          inOutType: "",
          tollgateName: "",
          address: "",
        };
        $scope.page1 = {
          totalRow: 0,
          count: 0
        };
        $scope.inOutArr = [
           {
            code: "1",
            name: "进入"
          }, {
            code: "2",
            name: "离开"
          }
        ];
        var _req = {
            villageCode:$scope.initParams.villageCode,
            pageNumber:"1",
            pageSize:"999"
        };
        var getAcross = moreService.getVehicleTollgateList(_req);
        getAcross.then(function(resp) {
            $scope.ChannelInOutTypeArr = resp.data.list;
        }).catch(function() {}).finally(function() {
          
        });
        
        laydate.render({
          elem: '#startTime',
          type: "datetime",
          value: "",
          done: function(value, date, endDate) {
            $scope.initParams.startTime = value;
          }
        });

        laydate.render({
          elem: '#endTime',
          type: "datetime",
          value: "",
          done: function(value, date, endDate) {
            $scope.initParams.endTime = value;
          }
        });

        $scope.captrueCarList = function(value) {
          $scope.loader = true;
          if (value) {
            $scope.initParams.pageNumber = 1;
          }
          var req1 = {
            villageCode:$scope.initParams.villageCode,
            startTime: $scope.initParams.startTime,
            endTime: $scope.initParams.endTime,
            pageSize: $scope.initParams.pageSize,
            pageNumber: $scope.initParams.pageNumber,
            pushType:$scope.initParams.pushType,
            plateNumber: $scope.initParams.plateNumber,
            inOutType: $scope.initParams.inOutType,
            tollgateID: $scope.initParams.tollgateName,
            address: $scope.initParams.address
          };

          var promise = moreService.captrueCarList(req1);
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              $scope.carListData = resp.data.acrossVehicle.list;
              $scope.page1.totalRow = resp.data.acrossVehicle.totalRow
            }
          }).catch(function() {}).finally(function() {
            // layer.close(index);
            $scope.loader = false;
          });
        };
        $scope.captrueCarList();

        $scope.doorImgClick = function(item) {
          var src = common.getUrl(item);;
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
        $scope.toResident = function(item) {
          var obj = {
            "villageCode":villageCode,
            "buildingNo":item.buildingNo,
            "houseNo":item.houseNo
          };
          var key = "resident_" + item.villageCode;
          localStorage.setItem(key, JSON.stringify(obj));
          var url ="../../../template/html/modules/buildingHouse/house.html?villageCode="+item.villageCode;
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
              $(layero).find("iframe").eq(0).contents().find("html").css('font-size','83px');
            }
          });
        };

        $scope.replaceMac = function(item) {
          localStorage.setItem('toMacParams'+ villageCode, JSON.stringify(item));
          window.open("#/index/fromcartomac");
        }

      }
    ];
    return doorRecordCtrl;
  });