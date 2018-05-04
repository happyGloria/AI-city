/**
 * camera
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var communityPowerCtrl = ['$scope', '$state', '$stateParams', 'moreService','$compile','$timeout',
            function ($scope,$state,$stateParams,moreService,$compile,$timeout) {
              $(".layout").find("div").eq(0).css({"padding-top":"0px"});
              var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"'+'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
               /*
               *实时力量列表
               */
                var zjhms = sessionStorage.getItem("realPowerParam");
                var faceImgUrl = {
                  path:"http://15.128.21.207/bimg_upload/"
                };
                  //初始化参数
                  $scope.initParams = {
                     zjhms:zjhms,
                     pageSize:10,
                     pageNumber:1
                  };
                  $scope.page1={
                     totalRow:0,
                     count:0
                  };
                  //查询实时力量记录
                  $scope.queryRealPowerList = function(value){
                    $scope.loader = true;
                    // var index = layer.load(2, {shade: false});
                     var param = {
                        zjhms:$scope.initParams.zjhms,
                        pageSize:$scope.initParams.pageSize,
                        pageNumber:$scope.initParams.pageNumber
                     };
                     var promise = moreService.queryCommunityPowerList(param);
                        promise.then(function (resp) {
                          debugger;
                           if (resp.resultCode == 200) {
                              $scope.powerRecords = resp.data.list;
                              $scope.page1.totalRow=resp.data.totalRow;
                              $.each($scope.powerRecords,function(i,v){
                                v.photoStr = "data:image/png;base64,"+v.photoStr;
                              })         
                           }
                        }).catch(function() {}).finally(function() {
                            // layer.close(index);
                            $scope.loader = false;
                        });
                  };
                  function init(){
                    debugger;
                    $scope.queryRealPowerList();
                  }
               //跳档案
                  $scope.lalerPeopleFile = function(index){
                    var id = index;
                    var title = "档案";
                    url = window.location.href.split("/#")[0]+"/#index/peoplefile/" + id +"/";
                    window.open(url);
                  };

                  //查看抓拍图片
                  $scope.viewPicFun = function(item){
                    debugger;
                    var id = item.zjhm;
                    var req = {
                      zjhm:id
                    };
                    //TODO调用接口
                    moreService.queryCommunityPowerPic(req).then(function(resp){
                      debugger;
                      $scope.communityPowerPic = resp.data;
                      $.each($scope.communityPowerPic,function(i,v){
                        v.picUrl = faceImgUrl.path+v.picUrl;
                      })
                      if(0 == resp.data.length){
                        layer.msg("暂无人脸抓拍信息",{
                          success:function(layero){
                             $(layero).append(iframe); 
                          },
                          time:1000
                         },function(index){
                            setTimeout(function(){
                               layer.close(index);
                            })
                       })
                        return;
                      }
                      layer.open({
                        type: 1,
                        title: "当日人脸抓拍",
                        area: ['640px', '360px'],
                        shade: 0.8,
                        skin: 'dark-layer',
                        closeBtn: 1,
                        shadeClose: true,
                        content: $("#realPowerPhoto"),
                        end : function(index, layero) {
                        },
                        success:function(layero){
                          swiper = new Swiper('.swiper-container', {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            slidesPerGroup: 3,
                            loop: true,
                            loopFillGroupWithBlank: true,
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
                    })
                  }
                  init();
            }
        ];
        return communityPowerCtrl;
    });