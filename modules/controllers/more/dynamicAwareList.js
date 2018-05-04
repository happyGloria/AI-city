/**
 * 动态感知数据列表
 * Created by mww on 2017/12/13.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var ctrl = ['$scope', '$state', '$http', '$stateParams', 'moreService', '$compile', '$timeout', 'communityService', 'communityRightModuleService',
      function($scope, $state, $http, $stateParams, moreService, $compile, $timeout, communityService, rightService) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode || '';
        /**
         *页面初始化
         */
        function init() {

        }

        /**
         * 人脸抓拍
         */
        function faceFun() {

        }

        /**
         * 开门记录
         */
        function doorFun() {

        }

        /**
         * 过车感知
         */
        function carFun() {

        }

        /**
         * wifi感知
         */
        function wifiFun() {

        }

        /**
         * 消防感知
         */
        function fireFun() {

        }

        /**
         * 位移感知
         */
        function manholeCoverFun() {
          
        }

        /**跳转一人一档
         *
         */
        $scope.lalerPeopleFile = function(index) {
          var id = index;
          url = window.location.href.split("/#")[0] + "/#index/peoplefile/" + id + "/" + villageCode;
          window.open(url);
        };

        /**切换tab页
         *
         */
        $scope.showTab = {
          "door": true,
          "car": false,
          "wifi": false,
          "fire": false
        }

        $scope.changeTab = function(tabName, clickTab) {
          debugger;
          for (var key in $scope.showTab) {
            $scope.showTab[key] = false;
          }
          $scope.showTab[tabName] = true;

          if (tabName == "door") {
            doorFun();
          }
          if (tabName == "car") {
            carFun();
          }
          if (tabName == "wifi") {
            wifiFun();
          }
          if (tabName == "fire") {
            fireFun();
          }
        }

        init();

      }
    ];
    return ctrl;


  });