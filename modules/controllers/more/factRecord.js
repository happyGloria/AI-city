define(['app', 'jquery','yituFace','config/common'],
   function (app,  $,yituFace,common) {
 return  function($http,$state,$scope,communityAllService,$timeout){
 			//抓拍摄像机id数组
            $scope.yituIdArr = [];
            //分页相关
            $scope.facePage={
                totalSize:0,
                pageNumber:1,
                pageSize:24
            };
            $scope.loader = true;
            //缓存base64图片的临时变量
            $scope.tempFaceTrack='';
            //获取缓存人员信息
            $scope.tempInfo=JSON.parse(localStorage.getItem("faceInfo"));
            //图片前缀
             $scope.facePath = {
                arr: [],
                img: $scope.tempInfo.targetFaceImageBase64||"/template/img/user-man.png"
            };
            $scope.faceImgUrl = {
                path: "/template/img/user-man.png",
            };
            //查询依图摄像机
            $scope.searchYituCamera=function(){
                var req = {
                        villageCode:'',
                        cameraName:'',
                        cameraType:'5',//TODO换成和依图对接的类型5
                        pageNumber: 1,
                        pageSize: 999,
                     }
                     $scope.cameraSelectList = [];
                    //抓拍摄像机ID和摄像机name的对应关系
                    $scope.yituIdToCameraNameObj = {};
                    //抓拍摄像机对象的经纬度
                    $scope.yituIdLon = {};
                    communityAllService.queryMapInfo('camera',req).then(function(resp) {
                    if(resp.resultCode == '200') {
                        angular.forEach(resp.data.list,function(data){
                            if(data.ytCameraId){
                                var obj={
                                    F_ID:data.ytCameraId,
                                    F_Name:data.name,
                                    lon:data.lon,
                                    lat:data.lat
                                }
                             $scope.cameraSelectList.push(obj);
                             $scope.yituIdToCameraNameObj[obj.F_ID] = obj.F_Name;
                             $scope.yituIdArr.push(obj.F_ID);
                             $scope.yituIdLon[obj.F_ID] = {
                                lon:data.lon,
                                lat:data.lat
                             };
                            }
                        });
                        $scope.queryfaceRecord();
                    }
                    }).catch(function() {}).finally(function() {});
            }

			
 	  $scope.queryfaceRecord=function(index){
 	  	      $scope.loader = true;
             var param={
                	"condition":{
                		"timestamp":{
                			// "$gte": 1525219200, 
                			// "$lte": 1525910400
                			}
                		},
                		"limit":24,
                		"start":(index-1)*24||0,
                		"order":{"timestamp": -1},
                		"retrieval":{
						"camera_ids":$scope.yituIdArr,
                        "picture_image_content_base64":$scope.tempFaceTrack,
						"threshold":85,
						"using_ann":true
					   }
                } 
              yituFace.yitu_contrastFace(param, function(data) {
                if(data.message=="OK"){
                     $scope.loader = false;
                    $scope.facePage.totalSize=data.total;
                var _data=data.results,len=_data.length;
                for(var  i=0;i<len;i++){
                    //解码url
                     _data[i].face_image_uri=yituFace.yituFace_Pic + base64encode(_data[i].face_image_uri);
                     //转换时间格式
                     _data[i].timestamp=common.changeDateToString(new Date( _data[i].timestamp*1000));
                    //找到对应的摄像机抓拍位置
                    for(var j=0;j<$scope.cameraSelectList.length;j++){
                            if(_data[i].camera_id===$scope.cameraSelectList[j].F_ID){
                                _data[i].cameId=$scope.cameraSelectList[j].F_Name;
                                break;
                            }
                    }
                 }
                //抓怕人员记录数组
               $scope.tempFaceRecordArr=_data;
              $scope.$apply();
              }
         })
     }
	$scope.seeDetailImg=function(url){
        $scope.factRecordPop = layer.prompt({
                type: 1,
                title: $scope.tempInfo.name,
                btn: '',
                // area: ['350px', '250px'], //$scope.area
                area: '', //$scope.area
                shadeClose: true,
                skin: '',
                closeBtn: 1,
                scrollbar:true,
                content: $('#factRecordPop'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                success:function(){
                 $scope.faceImgUrl.path=url;
               },
               yes: function(index, layero) {
                },
                cancel: function(index, layero) {
                  layer.close($scope.factRecordPop);
                 }
                });
			}
			$scope.init=function(){
                //转化base64
               imgSrcToBase64($scope.tempInfo.faceImageBase64, function(data) {
                            $scope.tempFaceTrack= data.split(",")[1];
                        });
				//获取依图摄像机id
                $timeout(function() {
                    $scope.searchYituCamera();
                }, 500);
				
			}
			$scope.init();
	}
})