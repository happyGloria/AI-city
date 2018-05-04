/**
 * car
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService','$compile','$timeout',
            function ($scope,$state,$stateParams,moreService,$compile,$timeout) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"'+'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';

               //初始化参数
               $scope.initParams = {
                  PlateNumber:"",
                  startTime:'',
                  endTime:"",
                  pageSize:10,
                  pageNumber:1,
                  inOut:"",
                  // ChannelInOutType:"",
                  // liveAddress:"",
               };
               $scope.page1={
                  totalRow:0,
                  count:0
               };
               $scope.inOutArr = [
                {
                  code:"",
                  name:"请选择"
                },
                {
                  code:"1",
                  name:"驶入"
                
                },
                {
                  code:"2",
                  name:"驶出"
                }
               ];
               
               //时间初始化
                   // $scope.initParams.startTime = common.changeDayToString(common.addDays(new Date(), -365*50)) + " " + "00:00:00"; //初始化查询的结束日期
                   // $scope.initParams.endTime = common.changeDayToString(common.addDays(new Date(), 0)) + " " + "00:00:00"; //初始化查询的开始日期

                   $timeout(function () {
                       common.initTwoDatePicker($('#startTime'),{
                           onSelectDate:function(current_time,$i){
                               $scope.initParams.startTime = common.changeDayToString(current_time);
                           }
                       });
                       common.initTwoDatePicker($('#endTime'),{
                           onSelectDate:function(current_time,$i){
                               $scope.initParams.endTime = common.changeDayToString(current_time);
                           }
                       });
                   },0);

               //查询开门记录
               $scope.captrueCarList = function(value){
                $scope.loader = true;
                 if (value) {
                            $scope.initParams.pageNumber = 1;
                        }
                debugger
                 var req1 = {
                    PlateNumber:$scope.initParams.PlateNumber,
                    startTime:$scope.initParams.startTime,
                    endTime:$scope.initParams.endTime,
                    pageSize:$scope.initParams.pageSize,
                    pageNumber:$scope.initParams.pageNumber,
                    inOut:$scope.initParams.inOut,
                    // ChannelInOutType:$scope.initParams.ChannelInOutType,
                    // liveAddress:$scope.initParams.liveAddress,
                 };
                  
                  var promise = moreService.captrueCarList(req1);
                     promise.then(function (resp) {
                      debugger
                        if (resp.resultCode == 200) {
                          debugger
                           $scope.carListData = resp.data.list;
                           $scope.page1.totalRow=resp.data.totalRow          
                        }
                     }).catch(function() {}).finally(function() {
                      // layer.close(index);
                      $scope.loader = false;
                     });
               };
               $scope.captrueCarList();
               
               $scope.doorImgClick = function(item){
                        debugger;
                        // communityService.queryDoorImg(req).then(function(resp){
                           // debugger;
                           var src = item;
                           var img = '<img src="'+src+'" style="width:100%;height:100%"/>';
                           var carLayer = layer.open({
                               type: 1,
                               title: false,
                               area: ['640px', '360px'],
                               shade: 0.8,
                               closeBtn: 0,
                               shadeClose: true,
                               content: img,
                               end : function() {
                                layer.close(carLayer);
                               },
                               success:function(layero){
                                    $(layero).append(iframe);
                               }
                           });
                        // })
                     }
          



            }
        ];
        return doorRecordCtrl;
    });