/**
 * 黑白名单
 * Created by lzh on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/lib/other/socket.io.js','/modules/config/configFile.js','select2'],
    function (app, controllers, $,io,configFile,select2) {
        var communityCtrl = ['$scope', '$state', '$stateParams', 'communityService','$compile',
            function ($scope,$state,$stateParams,communityService,$compile) {
                // debugger;
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"'+'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
                var coordinateMap = {
                     "田林十二村2号":{
                         x:"-46.71014",
                         y:"20.80563",
                         z:"-150.6792",
                         name:"zhuzhai2"
                     },
                     "田林十二村3号":{
                         x:"-23.19212",
                         y:"19.12016",
                         z:"-145.0295",
                         name:"zhuzhai3"
                     },
                     "田林十二村4号":{
                         x:"-5.70706",
                         y:"18.70857",
                         z:"-138.8447",
                         name:"zhuzhai4"
                     },
                     "田林十二村5号":{
                         x:"10.56665",
                         y:"18.79555",
                         z:"-131.5534",
                         name:"zhuzhai5"
                     },
                     "田林十二村6号":{
                         x:"34.54404",
                         y:"18.90994",
                         z:"-120.5715",
                         name:"zhuzhai6"
                     },
                     "田林十二村7号":{
                         x:"48.97047",
                         y:"19.00045",
                         z:"-114.1553",
                         name:"zhuzhai7"
                     },
                     "田林十二村8号":{
                         x:"63.92631",
                         y:"18.57542",
                         z:"-108.9886",
                         name:"zhuzhai8"
                     },
                     "田林十二村9号":{
                         x:"-54.31493",
                         y:"19.59851",
                         z:"-123.0495",
                         name:"zhuzhai9"
                     },
                     "田林十二村10号":{
                         x:"-30.9821",
                         y:"18.97736",
                         z:"-120.9624",
                         name:"zhuzhai10"
                     },
                     "田林十二村11号":{
                        x:"-17.6091", 
                        y:"18.91796",
                        z:"-115.4581",
                        name:"zhuzhai11"
                     },
                     "田林十二村12号":{
                        x:"-6.457411",
                        y:"19.23",
                        z:"-109.7207",
                        name:"zhuzhai12"
                     },
                     "田林十二村13号":{
                        x:"22.38717", 
                        y:"19.43823",
                        z:"-96.68077",
                        name:"zhuzhai13"
                     },
                     "田林十二村14号":{
                        x:"36.55702", 
                        y:"19.04967",
                        z:"-91.77559",
                        name:"zhuzhai14"
                     },
                     "田林十二村15号":{
                        x:"46.77942", 
                        y:"19.11709",
                        z:"-87.13807",
                        name:"zhuzhai15"
                     },
                     "田林十二村16号":{
                        x:"-72.03403",
                        y:"20.34905",
                        z:"-97.72955",
                        name:"zhuzhai16"
                     },
                     "田林十二村17号":{
                        x:"-40.89864",
                        y:"18.9615",
                        z:"-97.83845",
                        name:"zhuzhai17"
                     },
                     "田林十二村18号":{
                        x:"-26.87445",
                        y:"18.6525",
                        z:"-92.77571",
                        name:"zhuzhai18"
                     },
                     "田林十二村19号":{
                        x:"-16.49548",
                        y:"19.11229",
                        z:"-86.87685",
                        name:"zhuzhai19"
                     },
                     "田林十二村20号":{
                        x:"12.57677", 
                        y:"19.15134",
                        z:"-74.42409",
                        name:"zhuzhai20"
                     },
                     "田林十二村21号":{
                        x:"27.39825",
                        y:"19.33538",
                        z:"-67.44378",
                        name:"zhuzhai21"
                     },
                     "田林十二村22号":{
                        x:"39.03278", 
                        y:"19.15582",
                        z:"-62.91431",
                        name:"zhuzhai22"
                     },
                     "田林十二村23号":{
                        x:"-83.1864", 
                        y:"19.20597",
                        z:"-70.85053",
                        name:"zhuzhai23"
                     },
                     "田林十二村24号":{
                        x:"-52.90517",
                        y:"19.30774",
                        z:"-73.15298",
                        name:"zhuzhai24"
                     },
                     "田林十二村25号":{
                        x:"-37.96341",
                        y:"19.37462",
                        z:"-66.38113",
                        name:"zhuzhai25"
                     },
                     "田林十二村26号":{
                        x:"27.65105", 
                        y:"19.58414",
                        z:"-33.72528",
                        name:"zhuzhai26"
                     },
                     "田林十二村27号":{
                        x:"49.37312", 
                        y:"19.79277",
                        z:"-26.79022",
                        name:"zhuzhai27"
                     },
                     "田林十二村28号":{
                        x:"63.30305", 
                        y:"19.18134",
                        z:"-22.66137",
                        name:"zhuzhai28"
                     },
                     "田林十二村29号":{
                        x:"-63.80886",
                        y:"19.34987",
                        z:"-49.72495",
                        name:"zhuzhai29"
                     },
                     "田林十二村30号":{
                        x:"-47.87144",
                        y:"19.19526",
                        z:"-43.11061",
                        name:"zhuzhai30"
                     },
                     "田林十二村31号":{
                        x:"-20.54359",
                        y:"19.68516",
                        z:"-29.4756",
                        name:"zhuzhai31"
                     },
                     "田林十二村32号":{
                        x:"-7.541371",
                        y:"19.24546",
                        z:"-25.09402",
                        name:"zhuzhai32"
                     },
                     "田林十二村33号":{
                        x:"41.50977", 
                        y:"18.81414",
                        z:"-5.312251",
                        name:"zhuzhai33"
                     },
                     "田林十二村34号":{
                        x:"53.30193", 
                        y:"19.09826",
                        z:"0.7731867",
                        name:"zhuzhai34"
                     },
                     "田林十二村35号":{
                        x:"-170.8077",
                        y:"20.00755",
                        z:"-63.6347",
                        name:"zhuzhai35"
                     },
                     "田林十二村36号":{
                        x:"-158.8217",
                        y:"20.12407",
                        z:"-57.96068",
                        name:"zhuzhai36"
                     },
                     "田林十二村37号":{
                        x:"-119.6769",
                        y:"20.21623",
                        z:"-40.21181",
                        name:"zhuzhai37"
                     },
                     "田林十二村38号":{
                        x:"-105.543", 
                        y:"19.91865",
                        z:"-34.85625",
                        name:"zhuzhai38"
                     },
                     "田林十二村39号":{
                        x:"-93.53275",
                        y:"20.17357",
                        z:"-26.64508",
                        name:"zhuzhai39"
                     },
                     "田林十二村41号":{
                        x:"-9.038288",
                        y:"20.30022",
                        z:"10.91756",
                        name:"zhuzhai41"
                     },
                     "田林十二村42号":{
                        x:"8.16048",  
                        y:"20.3861",
                        z:"16.40641",
                        name:"zhuzhai42"
                     },
                     "田林十二村43号":{
                        x:"21.40089", 
                        y:"19.87627",
                        z:"20.54842",
                        name:"zhuzhai43"
                     },
                     "田林十二村44号":{
                        x:"39.75996", 
                        y:"19.9786",
                        z:"45.14836",
                        name:"zhuzhai44"
                     },
                     "田林十二村45号":{
                        x:"-176.5353",
                        y:"20.17016",
                        z:"-36.27334",
                        name:"zhuzhai45"
                     },
                     "田林十二村46号":{
                        x:"-160.2072",
                        y:"20.32096",
                        z:"-28.64515",
                        name:"zhuzhai46"
                     },
                     "田林十二村47号":{
                        x:"-128.3267",
                        y:"20.26526",
                        z:"-14.99047",
                        name:"zhuzhai47"
                     },
                     "田林十二村48号":{
                        x:"-117.2936",
                        y:"20.0436",
                        z:"-10.86001",
                        name:"zhuzhai48"
                     },
                     "田林十二村49号":{
                        x:"-102.1602",
                        y:"20.11913",
                        z:"-1.927478",
                        name:"zhuzhai49"
                     },
                     "田林十二村50号":{
                        x:"-20.34833",
                        y:"18.87952",
                        z:"30.39753",
                        name:"zhuzhai50"
                     },
                     "田林十二村51号":{
                        x:"-2.882476",
                        y:"19.24084",
                        z:"36.82145",
                        name:"zhuzhai51"
                     },
                     "田林十二村52号":{
                        x:"8.712715", 
                        y:"19.46843",
                        z:"42.46107",
                        name:"zhuzhai52"
                     },
                     "田林十二村53号":{
                        x:"-185.3771",
                        y:"20.29147",
                        z:"-11.17214",
                        name:"zhuzhai53"
                     },
                     "田林十二村54号":{
                        x:"-173.1875",
                        y:"20.3333",
                        z:"-5.66543",
                        name:"zhuzhai54"
                     },
                     "田林十二村55号":{
                        x:"-140.5043",
                        y:"20.09308",
                        z:"8.82841",
                        name:"zhuzhai55"
                     },
                     "田林十二村56号":{
                        x:"-129.0549",
                        y:"19.97366",
                        z:"13.49537",
                        name:"zhuzhai56"
                     },
                     "田林十二村57号":{
                        x:"-113.6531",
                        y:"19.87923",
                        z:"22.1078",
                        name:"zhuzhai57"
                     },
                     "田林十二村58号":{
                        x:"-77.4201", 
                        y:"20.24465",
                        z:"36.16942",
                        name:"zhuzhai58"
                     },
                     "田林十二村59号":{
                        x:"-65.03828",
                        y:"20.46564",
                        z:"42.24305",
                        name:"zhuzhai59"
                     },
                     "田林十二村60号":{
                        x:"-47.20887",
                        y:"19.95373",
                        z:"67.55846",
                        name:"zhuzhai60"
                     },
                     "田林十二村61号":{
                        x:"-4.766707",
                        y:"19.96189",
                        z:"67.11823",
                        name:"zhuzhai61"
                     },
                     "田林十二村62号":{
                        x:"8.951409", 
                        y:"19.7807",
                        z:"72.55811",
                        name:"zhuzhai62"
                     },
                     "田林十二村63号":{
                        x:"24.08218", 
                        y:"19.95862",
                        z:"81.82314",
                        name:"zhuzhai63"
                     },
                     "田林十二村64号":{
                        x:"-199.7957",
                        y:"21.29214",
                        z:"11.45231",
                        name:"zhuzhai64"
                     },
                     "田林十二村65号":{
                        x:"-153.4404",
                        y:"20.16531",
                        z:"33.45913",
                        name:"zhuzhai65"
                     },
                     "田林十二村66号":{
                        x:"-139.0269",
                        y:"20.16692",
                        z:"41.60962",
                        name:"zhuzhai66"
                     },
                     "田林十二村67号":{
                        x:"-125.8347",
                        y:"20.23602",
                        z:"47.62004",
                        name:"zhuzhai67"
                     },
                     "田林十二村68号":{
                        x:"-90.47449",
                        y:"20.13135",
                        z:"59.59046",
                        name:"zhuzhai68"
                     },
                     "田林十二村69号":{
                        x:"-76.87987",
                        y:"20.13773",
                        z:"65.33155",
                        name:"zhuzhai69"
                     },
                     "田林十二村70号":{
                        x:"-14.9164", 
                        y:"19.70969",
                        z:"91.5022",
                        name:"zhuzhai70"
                     },
                     "田林十二村71号":{
                        x:"-1.599592",
                        y:"19.74685",
                        z:"97.45854",
                        name:"zhuzhai71"
                     },
                     "田林十二村72号":{
                        x:"11.80169", 
                        y:"20.11533",
                        z:"106.58",
                        name:"zhuzhai72"
                     },
                     "田林十二村73号":{
                        x:"-203.0604",
                        y:"21.0342",
                        z:"46.16074",
                        name:"zhuzhai73"
                     },
                     "田林十二村74号":{
                        x:"-165.4796",
                        y:"20.16962",
                        z:"56.72248",
                        name:"zhuzhai74"
                     },
                     "田林十二村75号":{
                        x:"-148.049", 
                        y:"19.93437",
                        z:"65.37888",
                        name:"zhuzhai75"
                     },
                     "田林十二村76号":{
                        x:"-135.8469",
                        y:"20.40428",
                        z:"72.07595",
                        name:"zhuzhai76"
                     },
                     "田林十二村77号":{
                        x:"-99.72453",
                        y:"19.97337",
                        z:"83.74316",
                        name:"zhuzhai77"
                     },
                     "田林十二村78号":{
                        x:"-87.44669",
                        y:"20.39216",
                        z:"90.03674",
                        name:"zhuzhai78"
                     },
                     "田林十二村79号":{
                        x:"-56.19168",
                        y:"19.9321",
                        z:"110.3851",
                        name:"zhuzhai79"
                     },
                     "田林十二村80号":{
                        x:"-24.11126",
                        y:"19.88046",
                        z:"113.1881",
                        name:"zhuzhai80"
                     },
                     "田林十二村81号":{
                        x:"-13.07304",
                        y:"20.13603",
                        z:"118.7675",
                        name:"zhuzhai81"
                     },
                     "田林十二村82号":{
                        x:"2.187776", 
                        y:"19.91174",
                        z:"126.8855",
                        name:"zhuzhai82"
                     },
                     "田林十二村83号":{
                        x:"-204.1761",
                        y:"20.91459",
                        z:"77.43447",
                        name:"zhuzhai83"
                     },
                     "田林十二村84号":{
                        x:"-177.7941",
                        y:"20.2232",
                        z:"90.61901",
                        name:"zhuzhai84"
                     },
                     "田林十二村85号":{
                        x:"-146.8787",
                        y:"21.02546",
                        z:"97.71205",
                        name:"zhuzhai85"
                     },
                     "田林十二村86号":{
                        x:"-109.4823",
                        y:"19.90224",
                        z:"106.4253",
                        name:"zhuzhai86"
                     },
                     "田林十二村87号":{
                        x:"-96.78634",
                        y:"20.17727",
                        z:"112.7502",
                        name:"zhuzhai87"
                     },
                     "沁春园97号东":{
                        x:"-96.78634",
                        y:"20.17727",
                        z:"112.7502",
                        name:"zhuzhai87"
                     }
                };
                var configMap = {
                    ip:"15.128.21.231",
                    "110.1.222.1":"15.128.74.241:1935",
                    "gs_PanoUrl":"http://15.128.21.231/yyspano/viewer.html"
                };
                var faceImgUrl = {
                  path:"http://15.128.21.207/bimg_upload/"
                };
               $(".layout").find("div").eq(0).css({"padding-top":"0px"});
               // window.onResize = function() {
               //         var baseWidth = 1920;
               //         var screenWidth = document.body.clientWidth;
               //         windowHtmlSize = screenWidth / baseWidth * 100;
               //         var defSize = screenWidth / baseWidth;
               //         var axisFontSize = defSize * 24;
               //         $("html").css({
               //             fontSize: windowHtmlSize + 'px'
               //         });
               //     }
               // // onResize();
               // $(window).resize(function() {
               //     onResize();
               // })
                $scope.cameraList = [];
                var player,queryFaceListInteval;
                function init(){
                    $scope.queryCameraList();
                    // IE放开
                    $scope.changeMap();
                    $scope.queryDoorRecords();
                    smokeMachineFun();
                    queryMacListFun();
                    queryFaceListFun();
                    queryCarListFun();
                    queryFaceListInteval = setInterval(function(){
                     queryFaceListFun();
                    },3000);
                    // socketFaceFun();
                    chooseFaceCameraInit();
                }
                //查询摄像头列表
                $scope.queryCameraList = function(){
                    debugger;
                    communityService.queryCameraList().then(function(resp){
                        debugger;
                        $scope.cameraList = resp.data.list;
                        $.each($scope.cameraList,function(i,v){
                            v.isPlay = false;
                        })
                        formatCameraData($scope.cameraList);
                        formartMapCamera();
                    });
                }

                //根据id查询当前摄像头视频
                $scope.queryVideoById = function(item){
                    debugger;
                    // swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
                    // swObj.shade.show("true");
                    if(item.src){
                        sessionStorage.setItem("videoSrc",item.src);
                            cameraId = layer.open({
                            type: 2,
                            title: false,
                            area: ['600px', '400px'],
                            shade: 0.8,
                            closeBtn: 0,
                            shadeClose: true,
                            content: ['../../../lib/video/video.html', 'no'],
                            end : function(index, layero) {
                                cameraId = null;
                                swObj.shade.show("false");
                            }
                        });
                        return;
                    }
                    communityService.queryVideoById(item.Id).then(function(resp){
                         debugger;
                         // resp.data = "rtmp://118.178.191.199:1935/live/camera_1";
                         item.src = resp.Data.replace(/110.1.222.1/,"15.128.74.241:1935");
                         sessionStorage.setItem("videoSrc",item.src);
                         cameraId = layer.open({
                            type: 2,
                            title: false,
                            area: ['600px', '400px'],
                            shade: 0.8,
                            closeBtn: 0,
                            shadeClose: true,
                            content: ['../../../lib/video/video.html', 'no'],
                            end : function(index, layero) {
                                cameraId = null;
                                swObj.shade.show("false");
                            }
                        });
                    })
                }

                var onLineArr = [];
                var initFlag = true;
                var onLineLen = 1;
                function formatCameraData(data){
                    $.each(data,function(i,v){
                        if(v.IsOnline){
                            onLineArr.push(v);
                        }
                    })
                    circlePlayVideo(onLineArr[0]);
                    interValId = setInterval(function(){
                        circlePlayVideo(onLineArr[onLineLen]);
                    },10000)
                }

                //视频播放相关方法
                function videoFun(src){
                    var width = windowHtmlSize*2.1+"px";
                    var height = windowHtmlSize*1.56+"px";
                    player = videojs('player', {
                        height:height,
                        width:width,
                        techOrder:['flash','html5'],
                        controls:true,
                        'autoplay':true,
                        sources:[{
                          // src:"rtmp://118.178.191.199:1935/live/camera_1"
                          src:src || ""
                        }]
                      }, function(){
                      });
                    initFlag = false
                }

                var interValId;
                function circlePlayVideo(data){
                        //debugger;
                        if(!initFlag){
                           onLineLen++;
                        }
                        if(data.src){
                            $.each($scope.cameraList,function(i,v){
                                v.isPlay = false;
                            })
                            data.isPlay = true;
                            player.src(data.src);
                            player.play();
                            $scope.$apply();
                            // locateChoosedCameraFun();
                            // console.log(player.src());
                        }else{
                            communityService.queryVideoById(data.Id).then(function(resp){
                                data.src = resp.Data.replace(/110.1.222.1/,"15.128.74.241:1935");
                                $.each($scope.cameraList,function(i,v){
                                    v.isPlay = false;
                                })
                                data.isPlay = true;
                                //$scope.$apply();
                                // locateChoosedCameraFun();
                                if(initFlag){
                                    videoFun(data.src);
                                    return;
                                 }else{
                                    player.src(data.src);
                                    player.play();
                                 }
                                // console.log(player.src());
                            }) 
                        }
                        if(onLineLen == onLineArr.length){
                            onLineLen = 0;
                            clearInterval(interValId);
                            interValId = setInterval(function(){
                                circlePlayVideo(onLineArr[onLineLen]);
                            },10000)
                        }
                }

                //场景加载完成事件
            window.u_onInitFinish = function() {
                var data = '[' +
                '{"IP":"'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "building"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "zhuzhai"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "dixing"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "daolu"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "lvhua"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "tree"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "xiaopin"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "camera"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "xiaofang"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "menpai"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "yangan"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "jiankong"},' +
                '{"IP": "'+configMap.ip+'", "WEBCONFIG": "diting", "PREFABNAME": "menjin"}' +
                ']';
                swObj.layer.addLayer(data);
                swObj.toolbar.show("true");
                socketFun();
                // viewFullMapFun();
            }

            //切换二三维地图
            $scope.changeMap = function(num) {
                $("#twoMap").hide();
                $("#threeMap").show();
                var ls_width = $(".map-con .item-con").width();
                var ls_height = $(".map-con .item-con").height() - $("#headThree").height();
                var unityUrl = "/modules/controllers/community/diting.unity3d";
                // swObj = new uzft("threeMap", unityUrl, ls_width, ls_height);
                window.swObj = new uzft("threeMap", unityUrl, ls_width, ls_height);
                swObj.init();
            }

            window.u_onRightBtd = function(pVal) {
                var obj = jQuery.parseJSON(pVal);
                var x = obj.x;
                var y = obj.y;
                var z = obj.z;
                swObj.monv.quit();
            }
            var buildparam;
            window.u_onLeftBtd = function(pVal) {
                // console.log(pVal);
                // layer.close(cameraId);
                layer.closeAll();
                swObj.shade.show("false");
                var obj = jQuery.parseJSON(pVal);
                debugger;
                //人物浏览模式
                if(peopleModel){
                  var x = obj.x;
                  var y = obj.y;
                  var z = obj.z;
                  swObj.monv.start('{"x":"'+x+'","y":"'+y+'","z":"'+z+'"}');
                  peopleModel = 0;
                }

                //判断点击位置是否为楼栋
                // debugger
                var flag = false;
                if(obj.tag == "building-top" || obj.tag == "floor-top"){
                    flag = true
                }
                if (flag) {
                    $scope.buildNum = obj.objname.split("_")[1];
                    // $scope.buildNum = "沁春园92号"
                     buildparam = {
                        name:$scope.buildNum
                     };
                    $scope.clickBuilding();
                    // localStorage.setItem('build', JSON.stringify(buildparam));
                    //  var url = window.location.href.split("/#")[0]+"/#/index/clickBuilding/";
                    //  $scope.buildayer = null;
                    //  $scope.buildayer = layer.open({
                    //    type: 2,
                    //    title:"楼栋信息",
                    //    skin: 'dark-layer',
                    //    shadeClose: true,
                    //    area: ['7.2rem', '600px'],
                    //    scrollbar: false,
                    //    closeBtn : 1,
                    //    content: [url, 'no'], //iframe的url，no代表不显示滚动条
                    //    end: function(){ //此处用于演示
                    //    },
               
                    //  });


                }
                if(obj.tag == "jiankong-top"){
                     if(!cameraConfig[obj.objname].isOnline){
                        layer.msg("此摄像机离线",{
                        success:function(layero){
                           $(layero).append(iframe); 
                        },
                        time:1000
                        },function(index){
                           setTimeout(function(){
                              layer.close(index);
                           })
                        })
                        return
                     }
                     $scope.queryVideoById(cameraConfig[obj.objname]);
                }
                if(obj.tag == "menjin-top"){
                  var num= obj.objname.replace(/[^0-9]/ig,"");
                  localStorage.setItem("menjinRecord",JSON.stringify({
                     pName:"",
                     IdentityCard:"",
                     deviceName:num,
                     startTime:"",
                     endTime:"",
                     pageSize:10,
                     pageNumber:1,
                     OpenType:""
                  }));
                  $scope.clickMore(1);
                }
            }

            //点击摄像头
            var cameraId;

            $scope.clickCamera = function(obj) {
                $scope.queryVideoById(obj);
            }

            $scope.clickFloor = function(objName){
                 // swObj.controlObjMesh(objName,true);
                 swObj.flyToObj(objName,200);
                 swObj.highObj(objName);
                 setModelName(objName);
            }

            $scope.doorRecords = [];
            //门禁记录列表
            $scope.queryDoorRecords = function(){
                communityService.queryDoorRecords().then(function(resp){
                    // debugger;
                    $scope.doorRecords = resp.data.list;
                    var len = $scope.doorRecords.length;
                    if(len <= 10){
                        return;
                    }else{
                        $scope.doorRecords = $scope.doorRecords.slice(0,10);
                    }
               })
            }
            var smokeAlarmNo = [];
            //门禁信息socket
            function socketFun(){
                var socket;
                // if(typeof(WebSocket) == "undefined") {
                //     alert("您的浏览器不支持WebSocket");
                //     return;
                // }
                var socketIp = "ws://15.128.20.66:9092";
                var socket =  io.connect(socketIp);
                socket.on("dataPush",function(resp){
                    // console.log(resp);
                    // debugger;
                    if(resp.type == "doorRecord"){
                        // debugger;
                        var socketDoorList = resp.data.sourcedata;
                        $.each(socketDoorList,function(i,v){
                            socketDoorList[i] = JSON.parse(v);
                        })
                        $scope.doorRecords = socketDoorList.concat($scope.doorRecords);
                        var len = $scope.doorRecords.length;
                        if(len > 10){
                            $scope.doorRecords = $scope.doorRecords.slice(0,10);
                        }
                        $scope.$apply();
                        //IE放开
                        $.each(socketDoorList,function(i,v){
                            //var str = '{"text":"'+v.pName+'在'+v.buildingName+'刷卡","id":"'+v.DeviceId+'","window":{"width":"200","height":"150"'+',"x":"'+'0'+'","y":"'+'0'+'","z":"'+'0'+'"'+',"fontsize":"12","fontleft":"40","fontcolor":{"r":"111","g":"1","b":"111","a":"1"},"style":"4"}}';
                            var str = '{"id":"'+v.DeviceId+'","clickcb":"communityAlarm","text":[{"value":"'+v.OpenedTime+'","fontsize":"14","top":"10","left":"90","fontcolor":{"r":"255","g":"255","b":"255","a":"1"}},{"value":"'+v.pName+'在'+v.buildingName+'刷卡","fontsize":"14","top":"30","left":"56","fontcolor":{"r":"255","g":"255","b":"255","a":"1"}}],"window":{"width":"250","height":"80",'+'"x":"'+coordinateMap[v.buildingName]['x']+'","y":"'+coordinateMap[v.buildingName]['y']+'","z":"'+coordinateMap[v.buildingName]['z']+'"'+',"style":"6"}}';
                            swObj.userData.bubbleBox.init(str);
                            setTimeout(function(){
                                swObj.userData.bubbleBox.destroy(v.DeviceId);
                            },3000)
                        })
                    }else if(resp.type == "carRecord"){
                        // debugger;
                        var socketCarList = resp.data.sourcedata;
                        $.each(socketCarList,function(i,v){
                            socketCarList[i] = JSON.parse(v);
                            // socketCarList[i].picUrl = '/template/img/community/'+socketCarList[i].pic;
                        })
                        $scope.carList = socketCarList.concat($scope.carList);
                        var len = $scope.carList.length;
                        if(len > 10){
                            $scope.carList = $scope.carList.slice(0,10);
                        }
                        $scope.$apply();

                    }else if(resp.type == "macRecord"){
                        // debugger;
                        var socketMacList = resp.data.sourcedata;
                        $.each(socketMacList,function(i,v){
                            socketMacList[i] = JSON.parse(v);
                            // socketMacList[i].time = moment(new Date(socketMacList[i].time*1000)).format('YYYY-MM-DD HH:mm:ss');
                        })
                        $scope.macList = socketMacList.concat($scope.macList);
                        var len = $scope.macList.length;
                        if(len > 10){
                            $scope.macList = $scope.macList.slice(0,10);
                        }
                        $scope.$apply();
                    }
                    else if(resp.type == "xfygDeviceState" || resp.type == "xfygAlarm"){
                        // debugger;
                        var socketSmokeList = [];
                        resp.data.sourcedata.alarmMsg = resp.data.sourcedata.latestAlarm.alarmMsg;
                        resp.data.sourcedata.alarmType = resp.data.sourcedata.latestAlarm.alarmType;
                        resp.data.sourcedata.alarmTime = resp.data.sourcedata.latestAlarm.alarmTime;
                        resp.data.sourcedata.buildingNo = "田林十二村"+resp.data.sourcedata.buildingNo+"号";
                        socketSmokeList.push(resp.data.sourcedata);
                        $scope.machineList = socketSmokeList.concat($scope.machineList);
                        changeSmokeStatusFun(socketSmokeList);
                        //推送过来时时改变烟感机状态
                        function changeSmokeStatusFun(smokeArr){
                            $.each(smokeArr,function(i,v){
                                smokeAlarmNo.push(v.deviceNo);
                                var str = '{"id":"'+v.deviceNo+'","clickcb":"testck","text":[{"value":"'+v.alarmTime+'","fontsize":"12","top":"10","left":"70","fontcolor":{"r":"255","g":"255","b":"255","a":"1"}},{"value":"'+v.buildingNo+v.floorNo+v.alarmMsg+'","fontsize":"12","top":"25","left":"30","fontcolor":{"r":"255","g":"255","b":"255","a":"1"}}],"window":{"width":"200","height":"60",'+'"x":"'+coordinateMap[v.buildingNo]['x']+'","y":"'+coordinateMap[v.buildingNo]['y']+'","z":"'+coordinateMap[v.buildingNo]['z']+'"'+',"style":"8"}}';
                                swObj.userData.bubbleBox.init(str);
                                $.each($scope.machineList,function(j,w){
                                    if(v.deviceNo == w.deviceNo){
                                        w.stateCode = v.stateCode;
                                        w.alarmType = v.alarmType;
                                        return false;
                                    }
                                })
                            })
                        }
                        var len = $scope.machineList.length;
                        if(len > 10){
                            $scope.machineList = $scope.machineList.slice(0,10);
                        }
                        $scope.$apply();
                    }else if(resp.type == "doorAlert"){
                        // debugger;
                        var socketAlertList = resp.data.sourcedata;
                        if(socketAlertList.length <= 0){
                           return;
                        }
                        var name = socketAlertList[0].deviceName || socketAlertList[0].name;
                        var desc = socketAlertList[0].desc;
                        if(!socketAlertList[0].Id){
                           //边缘弹出
                           layer.open({
                             type: 0
                             ,offset: 'rb' //具体配置参考：offset参数项
                             ,content: name+desc
                             ,btn: '进入告警页面'
                             ,skin:'dark-layer'
                             ,btnAlign: 'c' //按钮居中
                             ,area:['280px','180px']
                             ,shade: 0 //不显示遮罩
                             ,yes: function(index,layero){
                                 layer.close(index);
                                 localStorage.setItem("alarmType","notOpenDoor");
                                 $scope.clickMore(1);
                             }
                           });
                        }else{
                           //边缘弹出
                           layer.open({
                             type: 0
                             ,offset: 'rb' //具体配置参考：offset参数项
                             ,content: name+desc
                             ,btn: ['播放视频','进入告警页面']
                             ,skin:'dark-layer'
                             ,btnAlign: 'c' //按钮居中
                             ,area:['280px','180px']
                             ,shade: 0 //不显示遮罩
                             ,yes: function(index,layero){
                                 $scope.queryVideoById({Id:socketAlertList[0].Id});
                             },btn2:function(index, layero){
                                 localStorage.setItem("alarmType","openDoor");
                                 $scope.clickMore(1);
                             }
                           });
                        }
                    }
                })
                
                window.communityAlarm = function(paBubbleId){
                    swObj.userData.bubbleBox.destroy(paBubbleId);
                }
            }

            //烟感机
            function smokeMachineFun(){
                $scope.machineList = [];
                communityService.querySmokeRecords().then(function(resp){
                    debugger;
                    $scope.machineList = resp.data.list;
                    $.each($scope.machineList,function(i,v){
                        v.stateCode = Number(v.stateCode);
                    })
                })
            }

            $scope.macList = [];
            
            //获取mac列表信息
            function queryMacListFun(){
                communityService.queryMacRecords().then(function(resp){
                    // debugger;
                    // $.each(resp.data,function(i,v){
                    //     v.time = moment(new Date(v.time*1000)).format('YYYY-MM-DD HH:mm:ss');
                    // })
                    $scope.macList = resp.data.list;
                })
            }

            $scope.faceList = [];
            //获取人脸信息
            function queryFaceListFun(cameraId){
               var camearIdArr = [];
               if(cameraId){
                  camearIdArr.push(cameraId);
               }
               var req = {
                  json:{
                     "imagePath":"",
                     "taskId":"",
                     "arrCameraId":camearIdArr,
                     "startTime":"2017-11-20 00:00:00",
                     "endTime":moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                     "arrGender":[],
                     "maxAge":null,
                     "minAge":null,
                     "arrEyeGlasses":[],
                     "arrMask":[],
                     "threshold":90,
                     "pageSize":20,
                     "currentPage":1,
                     "featureType":"Unknow",
                     "choiceId":"",
                     "isDescending":true
                  }
               };
               var jsonStr =  JSON.stringify(req.json);
               req.json = jsonStr;
                communityService.queryFaceRecords(req).then(function(resp){
                    //debugger;
                    if("200" != resp.code){
                        // notify.error("人像请求错误")
                        return;
                    }
                     var socketFaceList = resp.data.result;
                     if($scope.faceList.length > 0 && socketFaceList.length > 0 && socketFaceList[0].AccessLog.ID == $scope.faceList[0].AccessLog.ID){
                        return;
                     }
                     if(socketFaceList.length == 0){
                        return;
                     }
                     $scope.faceList = socketFaceList.concat($scope.faceList);
                     var len = $scope.faceList.length;
                     if(len > 20){
                         $scope.faceList = $scope.faceList.slice(0,20);
                     }
                     //$scope.$apply();
                    $.each($scope.faceList,function(i,v){
                        v.AccessLog.FacePath = faceImgUrl.path+v.AccessLog.FacePath;
                        v.AccessLog.ScenePath = faceImgUrl.path+v.AccessLog.ScenePath;
                    })
                })
            }

            $scope.carList = [];
            //获取车辆信息
            function queryCarListFun(){
                communityService.queryCarRecords().then(function(resp){
                    // debugger;
                    $scope.carList = resp.data.list;
                    // $.each($scope.carList,function(i,v){
                    //     v.picUrl = '/template/img/community/'+v.pic;
                    // })
                })
            }

            //高亮楼栋
            $scope.hightLightBuild = function(item){
                // debugger;
                //高亮对象
                swObj.highObj('{"Name":"'+coordinateMap[item.buildingName].name+'","Color":{"r":"255","g":"230","b":"80","a":"100"}}');
                swObj.flyToObj(coordinateMap[item.buildingName].name,50);
            }
            window.testck = function(paBubbleId){
               swObj.userData.bubbleBox.destroy(paBubbleId);
            }


            
            //点击楼栋弹窗
            var buildData = $scope.buildData=  [];
            var buildingLayer = null;
            var buildNum = $scope.buildNum = '';
            $scope.laberMap = {
                   "独居老人":"oldMan-icon,独居老人",
                   "楼组长":"worthy-icon,楼组长",
                   "志愿者":"love-icon,志愿者",
                   "精神病人":"psychopath-icon,精神病人",
                   "安置帮教":"anzhibangjiao-icon,安置帮教",
                   "涉毒对象":"addict-icon,涉毒对象",
                   "视线对象":"sightPeople-icon,视线对象"
                }; 
             $scope.smokeMap = [
                '2101','3401','4204','4403','5204',
                '6304','6404','7102','7203','10302','11102','12101',
                '12204','15501','13504','15204','16101','16201',
                '16304','17104','18502','18604','19103','19202',
                '19303','20303','20401','20602','21402','21403',
                '23101','23501','24203','25303','27402','27504',
                '28101','28203','29101','32302','33101','33202',
                '35403','35501','38501','42503','43201','44106',
                '45201','46204','48302','50204','50504','51302',
                '51402','51504','53101','53203','54203','54503',
                '55103','55402','57202','59102','59204','60102',
                '60301','61102','61303','61504','62604','64103',
                '64302','65304','66402','66502','67401','67604',
                '69601','70104','70301','70503','70504','73303',
                '73501','74301','77101','77104','84302','84403',
                '84603','87104','87301','87404','87501','87601'
                ];

            $scope.clickBuilding = function(){
                var buildparam = {
                                name:$scope.buildNum
                            };
                //调建筑信息接口
                communityService.buildingInfo(buildparam).then(function(resp){
                    debugger;
                    if (resp.resultCode === '200') {
                        $scope.buildData = resp.data;

                        $.each($scope.buildData,function(i,v){
                            $.each(v.list,function(k,w){
                                 //加烟感
                                $.each($scope.smokeMap,function(m,n){
                                 var str = $scope.buildNum + '' + w.houseName;
                                 if (n == str) {
                                    debugger
                                    w.smoke = "smoke-icon";
                                 }
                                })
                                //加人物标签
                                w.lableArr = [];
                                if(w.bq != null){
                                   var lablerArr = w.bq.split(",");
                                   w.lableArr = w.lableArr.concat(lablerArr);
                                   $.each(w.lableArr,function(j,x){
                                       if("" != x){
                                          w.lableArr[j] = {};
                                           w.lableArr[j].bg = $scope.laberMap[x].split(",")[0];
                                           w.lableArr[j].name = $scope.laberMap[x].split(",")[1];
                                           // w.lableArr[j] = "addict-icon"
                                       }
                                   })
                                 }


                            })
                        })
                        buildingLayer = layer.open({
                           // index:1,
                           type: 2,
                           title: false,
                           area: ['7.2rem', '600px'],//$scope.area
                           shadeClose: true,
                           content: ' ',
                           scrollbar: false,
                           closeBtn : 0,
                           shadeClose: true,
                           skin:'custom-layer',
                        success: function (layero, index) {
                            // debugger;
                            angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-building').html())($scope));
                            $scope.$apply();
                            layer.style(index, {
                            // "width":$("#myHouse").width(),
                              "background-color":'transparent'
                            }); 
                        },
                        end: function () {
                            // alert(222);
                            layer.close(buildingLayer);
                        },
                        yes: function (index, layero) {
                        },
                        cancel: function (index, layero) {
                        }
                    }); 
                    }
                })
            };
            //点击某室弹窗
            $scope.peopleArrMap = {
                  "独居老人":"bg-blue,独居老人",
                   "楼组长":"bg-orange,楼组长",
                   "志愿者":"bg-mauve,志愿者",
                   "精神病人":"bg-red,精神病人",
                   "安置帮教":"bg-green,安置帮教",
                   "涉毒对象":"bg-yellow,涉毒对象",
                   "视线对象":"bg-brown,视线对象"
            }
            var residentLayer = null;
            $scope.clickResident = function(id){
            // alert("1")
            var houseparam = {
                "houseId":id
            };
            layer.close(buildingLayer);
            residentLayer = layer.open({
                     type: 2,
                     title: false,
                     area: ['8.6rem', '500px'],//$scope.area
                     shadeClose: true,
                     closeBtn : 0,
                     skin:'custom-layer',
                     content: ' ',
                     scrollbar: false,
                     success: function (layero) {
                           angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#layer-resident').html())($scope));
                           //调住户信息接口
                           communityService.residengtInfo(houseparam).then(function(resp){
                              if (resp.resultCode === '200') {
                                 debugger
                                 $scope.houseData = resp.data;
                                 // console.log($scope.houseData);
                                 $.each(resp.data.list,function(k,w){
                                      w.lableArr = [];
                                      if(w.bq != null){
                                         var lablerArr = w.bq.split(",");
                                         w.lableArr = w.lableArr.concat(lablerArr);
                                         $.each(w.lableArr,function(j,x){
                                             if("" != x){
                                                w.lableArr[j] = {};
                                                 w.lableArr[j].bg = $scope.peopleArrMap[x].split(",")[0];
                                                 w.lableArr[j].name = $scope.peopleArrMap[x].split(",")[1];
                                                 // w.lableArr[j] = "addict-icon"
                                             }
                                         })
                                       }

                                 })
                                 $scope.queryResidentCar();
                                 //户弹窗中的水电煤
                                 $scope.electricNum = [];
                                 $scope.gasNum = [];
                                 $scope.waterNum = [];
                                 //电
                                 $.each($scope.houseData.electricpower,function(k,w){
                                    $scope.electricNum.push(w.electricusage);
                                    // debugger
                                 })
                                 $scope.electricModel ='' + $scope.electricNum[10];
                                 //煤
                                 $.each($scope.houseData.gasusage,function(k,w){
                                    $scope.gasNum.push(w.gasusage);
                                    // debugger
                                 })
                                 $scope.gasModel ='' + $scope.gasNum[10];
                                 //水
                                 $.each($scope.houseData.waterusage,function(k,w){
                                    $scope.waterNum.push(w.waterusage);
                                    // debugger
                                 })
                                 $scope.waterModel ='' + $scope.waterNum[10];
                                 $scope.$apply();

                                 $scope.onChange = function(){
                                    debugger
                                    $("#selectMonth").on('change', function(){
                                       var month = parseInt($(this).val());
                                       debugger
                                       //改变水电煤ng-model
                                       if(11 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[10];
                                          $scope.electricModel = '' + $scope.electricNum[10];
                                          $scope.gasModel = '' + $scope.gasNum[10];
                                       } else if(10 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[9];
                                          $scope.electricModel = '' + $scope.electricNum[9];
                                          $scope.gasModel = '' + $scope.gasNum[9];
                                       } else if(9 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[8];
                                          $scope.electricModel = '' + $scope.electricNum[8];
                                          $scope.gasModel = '' + $scope.gasNum[8];
                                       } else if(8 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[7];
                                          $scope.electricModel = '' + $scope.electricNum[7];
                                          $scope.gasModel = '' + $scope.gasNum[7];
                                       } else if(7 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[6];
                                          $scope.electricModel = '' + $scope.electricNum[6];
                                          $scope.gasModel = '' + $scope.gasNum[6];
                                       } else if(6 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[5];
                                          $scope.electricModel = '' + $scope.electricNum[5];
                                          $scope.gasModel = '' + $scope.gasNum[5];
                                       } else if(5 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[4];
                                          $scope.electricModel = '' + $scope.electricNum[4];
                                          $scope.gasModel = '' + $scope.gasNum[4];
                                       } else if(4 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[3];
                                          $scope.electricModel = '' + $scope.electricNum[3];
                                          $scope.gasModel = '' + $scope.gasNum[3];
                                       } else if(3 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[2];
                                          $scope.electricModel = '' + $scope.electricNum[2];
                                          $scope.gasModel = '' + $scope.gasNum[2];
                                       } else if(2 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[1];
                                          $scope.electricModel = '' + $scope.electricNum[1];
                                          $scope.gasModel = '' + $scope.gasNum[1];
                                       } else if(1 == month) {
                                          $scope.waterusage = '' + $scope.waterNum[0];
                                          $scope.electricModel = '' + $scope.electricNum[0];
                                          $scope.gasModel = '' + $scope.gasNum[0];
                                       }
                                       $scope.$apply()
                                    })
                                 };
                                 $scope.onChange();
                                 $scope.queryWaterElectric  = function(){
                                    var electricData = $scope.electricNum;
                                    var gasData = $scope.gasNum;
                                    var waterData = $scope.waterNum;
                                    debugger
                                    // 存储值：将对象转换为Json字符串
                                    sessionStorage.setItem('user', JSON.stringify(electricData));
                                    sessionStorage.setItem('user2', JSON.stringify(gasData));
                                    sessionStorage.setItem('user3', JSON.stringify(waterData));
                                    
                                    var url = window.location.href.split("/#")[0]+"/#/index/waterElectricChart/";
                                    window.open(url);
                                    // layer.open({
                                    //   type: 2,
                                    //   title: '水电煤',
                                    //   skin: 'dark-layer',
                                    //   shade: 0.7,
                                    //   shadeClose: true,
                                    //   area: ['100%', '100%'],
                                    //   anim: 2,
                                    //   content: [url, 'yes'], //iframe的url，no代表不显示滚动条
                                    //   end: function(){ //此处用于演示
                                    //   }
                                    // });
                                 };
                             }
                           });
                           //车辆接口
                           $scope.carListData = "";
                           $scope.queryResidentCar = function(){
                              // alert("1")
                              debugger
                              // 田林十二村 $scope.buildNum号$scope.houseData.houseInfo.houseNum室
                              var liveAddressStr = "田林十二村" + $scope.buildNum + "号" + $scope.houseData.houseInfo.houseNum + "室";
                              var carParam = {
                                 "pageSize":1,
                                 "pageNumber":1,
                                 "liveAddress":liveAddressStr,
                              };
                              communityService.residentCar(carParam).then(function(resp2){

                                 // alert("2")
                                 debugger
                                 if (resp2.resultCode == '200') {
                                     // alert("3")
                                    debugger
                                    $scope.carListData = resp2.data.list[0];
                                    debugger
                                 }
                              });
                           };
                           
                     },
                     end: function () {
                        // $scope.electricNum.length = 0;
                        layer.close(residentLayer);
                        $scope.clickBuilding();
                     },
                     yes: function (index, layero) {
                     },
                     cancel: function (index, layero) {
                     }
                  });     
            };

   $scope.closeBtn = function(num){
      if (num == 1) {
         layer.close(buildingLayer);
      }else{
         layer.close(residentLayer);
      }
   };
   
   


   /**
    * 更多 
    */
   $scope.clickMore = function(index){
      debugger;
      var url = "www.baidu.com";
      var title = "标题"
      //判断点击哪个模块“更多”
      if (index == 1) {
         url = window.location.href.split("/#")[0]+"/#/index/doorrecord/";
         title = "开门记录";
      }else if (index == 2) {
         url = window.location.href.split("/#")[0]+"/#/index/smoke/";
         title = "烟感报警";
      }else if (index == 3){
         url = window.location.href.split("/#")[0]+"/#/index/communityCar/";
         title = "小区车辆";
      }else if(index ==4){
         url = window.location.href.split("/#")[0]+"/#/index/communityMac/";
         title = "小区Mac";
      }
      window.open(url);
      // var moreLayer = null;
      // moreLayer = layer.open({
      //   type: 2,
      //   title:title,
      //   skin: 'dark-layer',
      //   shade: 0.7,
      //   shadeClose: true,
      //   area: ['100%', '100%'],
      //   anim: 2,
      //   content: [url, 'yes'], //iframe的url，no代表不显示滚动条
      //   end: function(){ //此处用于演示
      //   },
      //   success:function(layero, index){
      //       $(layero).append(iframe);
      //   }
      // });
   };
   //三维地图查看全景地图方法
   function viewFullMapFun(){
            var pointStrs = '1,-198,-91:2,-221,60:3,-53,-174:4,-59,-31:5,69,26:6,-2,-38:7,-178,28:8,-21,-12:9,10,-100:10,17,-119:11,-28,9:12,22,-104:13,-131,-62:14,-73,-61:15,28,8:16,-53,-108:17,-32,-155:18,-9,-61:19,37,-35:20,49,-7:21,-154,-7:22,-192,71:23,-141,91:24,-163,47:25,-120,38:26,-115,-20:27,-183,-51:28,-60,64:29,-88,109:30,-44,114:31,-28,79:32,26,72:33,8,120:34,-49,-32:35,8,34:36,-68,116';
            var lar_Points = pointStrs.split(":");
            for(var i = 0;i<lar_Points.length;i++){
                var lar_ObjPoints = lar_Points[i].split(",");
                var x = lar_ObjPoints[1];
                var y = 0.02;
                var z = lar_ObjPoints[2];
                var id = lar_ObjPoints[0];
                var str = '{"id":"'+id+'","clickcb":"viewMap","text":[{"value":"","fontsize":"20","top":"55","left":"46","fontcolor":{"r":"111","g":"111","b":"111","a":"1"}}],"window":{"width":"30","height":"30",'+'"x":"'+x+'","y":"'+y+'","z":"'+z+'"'+',"style":"3"}}';
                swObj.userData.bubbleBox.init(str);
            }
   }   
   window.viewMap = function(paBubbleId){
      window.open(configMap.gs_PanoUrl+"?id="+paBubbleId);
   }

   //点击标签进入全景地图
   $scope.viewFullMap = function(){
      window.open(configMap.gs_PanoUrl+"?id=1");
   }
   //门禁图片接口
   $scope.doorImgClick = function(item){
      debugger;
      var req = {
         logId:item.logId
      };
      communityService.queryDoorImg(req).then(function(resp){
         // debugger;
         var src = resp.data.ImagePath;
         swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
         swObj.shade.show("true");
         var img = '<img src="'+src+'" style="width:100%;height:100%"/>';
         layer.open({
             type: 1,
             title: false,
             area: ['640px', '360px'],
             shade: 0.8,
             closeBtn: 0,
             shadeClose: true,
             content: img,
             end : function(index, layero) {
               swObj.shade.show("false");
             },
             success:function(layero){
                  $(layero).append(iframe);
             }
         });
      })
   }

   var videoId;
   //门禁视频接口
   $scope.doorVideoClick = function(item){
      debugger;
      var req = {
         logId:item.logId
      };
      communityService.queryDoorVideo(req).then(function(resp){
         debugger;
         //门外
         var reqTSLOut = {
            CameraNo:resp.data[0].CameraId,
            StartTime:resp.data[0].OpenedTime-15,
            EndTime:resp.data[0].OpenedTime+15
         }

         //门内
         var reqTSLIn = {
            CameraNo:resp.data[1].CameraId,
            StartTime:resp.data[1].OpenedTime-15,
            EndTime:resp.data[1].OpenedTime+15
         }
         var videoUrlOut = "http://15.128.74.241:8004/Video/GetM3u8Url?CameraNo="+reqTSLOut.CameraNo+"&StartTime="+reqTSLOut.StartTime+"&EndTime="+reqTSLOut.EndTime;
         var videoUrlIn = "http://15.128.74.241:8004/Video/GetM3u8Url?CameraNo="+reqTSLIn.CameraNo+"&StartTime="+reqTSLIn.StartTime+"&EndTime="+reqTSLIn.EndTime;
         var videoUrl = {
            videoUrlOut:videoUrlOut,
            videoUrlIn:videoUrlIn
         };
         sessionStorage.setItem("videoSrc",JSON.stringify(videoUrl));
         swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
         swObj.shade.show("true");
          videoId = layer.open({
          type: 2,
          title: false,
          area: ['600px', '400px'],
          shade: 0.8,
          closeBtn: 0,
          shadeClose: true,
          content: ['../../../lib/vlc/video.html', 'no'],
          end : function(index, layero) {
              videoId = null;
              swObj.shade.show("false");
          }
         });
      })
   }

   //视频循环定位
   var lastScroll = 0;
   function locateChoosedCameraFun(){
      var choosedCamera=$(".isPlay");
      var height = $(".monitoring-right").height();
      var topHeight = choosedCamera.position().top;
      console.log(topHeight);
      // debugger;
      if(topHeight  < lastScroll && topHeight >= 0){
         topHeight = lastScroll;
      }
      $(".monitoring-right").animate({scrollTop: topHeight},1000,function(){
          lastScroll = topHeight;
      });
   }

   //放大人像图片
   $scope.enlargeImg = function(item){
      debugger;
      swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
      swObj.shade.show("true");
      var src = item.AccessLog.ScenePath;
      var img = '<img src="'+src+'" style="width:100%;height:100%"/>';
      layer.open({
          type: 1,
          title: false,
          area: ['640px', '360px'],
          shade: 0.8,
          closeBtn: 0,
          shadeClose: true,
          content: img,
          end : function(index, layero) {
            swObj.shade.show("false");
          },
          success:function(layero){
               $(layero).append(iframe);
          }
      });
   }

   $scope.contrastFace = null;
   //对比人脸图片
   // $scope.contrastFaceImg = function(item){
   //    debugger;
   //    var reg = new RegExp(faceImgUrl.path,"g");
   //    var reqUrl = item.AccessLog.FacePath.replace(reg,"");
   //    var req = {
   //       facePicUrl:reqUrl
   //    };
   //    communityService.queryContrastFace(req).then(function(resp){
   //       debugger;
   //       if("" == resp.data){
   //          layer.msg("暂无对比信息",{
   //             success:function(layero){
   //                $(layero).append(iframe); 
   //             },
   //             time:2000
   //          },function(index){
   //             setTimeout(function(){
   //                layer.close(index);
   //             })
   //          })
   //          return;
   //       }
   //       $scope.contrastFace = resp.data.personList[0];
   //       $scope.contrastFace.F_Image_Url = faceImgUrl.path+$scope.contrastFace.F_Image_Url;
   //       $scope.contrastFace.imageUrl = item.AccessLog.FacePath;
   //       $scope.contrastFace.F_Similarty = Number($scope.contrastFace.F_Similarty).toFixed(2);
   //       $scope.contrastFace.F_Name = $scope.contrastFace.F_Name || "--";
   //       $scope.contrastFace.F_Gender = $scope.contrastFace.F_Gender || "--";
   //       $scope.contrastFace.Lib_Name = $scope.contrastFace.Lib_Name || "--"
   //       swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
   //       swObj.shade.show("true");
   //       layer.open({
   //           type: 1,
   //           title: '人脸对比',
   //           skin:'dark-layer',
   //           area: ['480px', '250px'],
   //           shade: 0.8,
   //           scrollbar: false,
   //           closeBtn: 1,
   //           shadeClose: true,
   //           content: $("#contrastFace"),
   //           end : function(index, layero) {
   //             swObj.shade.show("false");
   //           },
   //           success:function(layero){
   //             $(layero).append(iframe); 
   //           }
   //       });
   //    })
   // }

   $scope.viewPeoplefile = function(id){
      var url = window.location.href.split("/#")[0]+"/#/index/peoplefile/" + id +"/";
      window.open(url);
      // layer.open({
      //   type: 2,
      //   title: '人员档案',
      //   skin: 'dark-layer',
      //   shade: 0.7,
      //   shadeClose: true,
      //   area: ['100%', '100%'],
      //   anim: 2,
      //   content: [url, 'yes'], //iframe的url，no代表不显示滚动条
      //   end: function(){ //此处用于演示
      //   }
      // });
   }
   window.LoadDate = function(){
      
   }
   $scope.contrastFaceImg = function(item){
      querySearchFace(item);
   }
   var socketFace = null;
   var taskId = "taskId";
   // function socketFaceFun(){
   //    if(!socketFace){
   //       var socketIp = "http://15.128.21.207:11006";
   //       socketFace =  io.connect(socketIp);
   //       var userID="8ffaabc9efa34741b81bef4c4fbb7921";
   //       var searchAccessLog = {
   //         userID:userID,
   //         //objectID:"",
   //         socketType:"SearchFace",
   //         isCancel:false,
   //       };
   //       socketFace.on('connect',function(){
   //             debugger
   //             socketFace.emit("NettyCallBackListener",searchAccessLog);
   //             socketFace.on(userID,function(resp3){
   //                debugger;
   //                var result3 = JSON.parse(decodeURIComponent(resp3))[0];
   //                if("SearchFace" == result3.resultType && "200" == result3.result.code && 0 < result3.result.count){
   //                   $scope.contrastFace = result3.result.data.result[0];
   //                   $scope.contrastFace.F_Image_Url = faceImgUrl.path+$scope.contrastFace.PersonInfo.FacePicPath[0];
   //                   $scope.contrastFace.imageUrl = sourceImageUrl;
   //                   $scope.contrastFace.F_Similarty = Number($scope.contrastFace.Score).toFixed(2);
   //                   $scope.contrastFace.F_Name = $scope.contrastFace.PersonInfo.Name || "--";
   //                   $scope.contrastFace.F_Gender = $scope.contrastFace.PersonInfo.Gender || "--";
   //                   $scope.contrastFace.Lib_Name = $scope.contrastFace.LibName || "--";
   //                   $scope.contrastFace.idCardNum  = $scope.contrastFace.PersonInfo.IDCardNumber;
   //                   $scope.contrastFace.F_Gender = "Men" == $scope.contrastFace.F_Gender ? "男" : "女";
   //                   swObj.shade.color('{"r":"0","g":"0","b":"0","a":"0.8"}');
   //                   swObj.shade.show("true");
   //                   $scope.$apply();
   //                   layer.open({
   //                       type: 1,
   //                       title: '人脸对比',
   //                       skin:'dark-layer',
   //                       area: ['480px', '250px'],
   //                       shade: 0.8,
   //                       scrollbar: false,
   //                       closeBtn: 1,
   //                       shadeClose: true,
   //                       content: $("#contrastFace"),
   //                       end : function(index, layero) {
   //                         swObj.shade.show("false");
   //                       },
   //                       success:function(layero){
   //                         $(layero).append(iframe); 
   //                       }
   //                   });
   //                   return;
   //                }
   //                if("SearchFace" == result3.resultType && "200" == result3.result.code && 0 == result3.result.count)
   //                   {
   //                   layer.msg("暂无对比信息",{
   //                      success:function(layero){
   //                         $(layero).append(iframe); 
   //                      },
   //                      time:1000
   //                   },function(index){
   //                      setTimeout(function(){
   //                         layer.close(index);
   //                      })
   //                   })
   //                   return;
   //                }
   //             })
   //       })
   //    }                   
   // }
   var sourceImageUrl = "";
   function querySearchFace(item){
      taskId = "taskId"+new Date().getTime();
      var reg = new RegExp(faceImgUrl.path,"g");
      var imagePath = item.AccessLog.FacePath.replace(reg,"");
      var choiceId = item.AccessLog.ID;
      sourceImageUrl = item.AccessLog.FacePath;
      var req = {
         json:{
            "arrLibId":["1c62981aba534e6188dc8d77b1e85658"],
            "imagePath":imagePath,
            "taskId":taskId,
            "threshold":60,
            "pageSize":3,
            "currentPage":1,
            "featureType":"AccessFeature",
            "minCount":0,
            "choiceId":choiceId
         }
      };
      req.json = JSON.stringify(req.json);
      communityService.querySearchFace(req).then(function(resp){
         debugger;
      })
   }

   //人脸摄像机筛选初始化
   var selectCamera;
   function chooseFaceCameraInit(){
      //TODO，调用查询人脸摄像机接口
      communityService.queryFaceCameraList().then(function(resp){
         debugger;
         var resultList = [];
         $.each(resp.data.list,function(i,v){
            resultList.push({
               id:v.F_ID,
               text:v.F_Name
            });
         })
         selectCamera = $("#sel_menu3").select2({
           language:'zh-CN',//转为中文版
           data:resultList,
           placeholder:'请选择摄像机'
         });
      })
   }

   //点击人脸摄像机搜索
   $scope.searchFaceCamera = function(){
      debugger;
      var cameraId = $("#sel_menu3").select2('data')[0].id;
      clearInterval(queryFaceListInteval);
      queryFaceListInteval = setInterval(function(){
         queryFaceListFun(cameraId);
      },3000);
   }

   //添加人物浏览
   var peopleModel = 0;
   $scope.addPeopleModel = function(){
      peopleModel = 1;
   }

   //匹配3d地图摄像机和tsl表里的cameraid
   var cameraConfig = {};
   function formartMapCamera(){
      //3D模型门外摄像机不超过100个,85栋楼
      for(var i = 0;i<100;i++){
         $.each($scope.cameraList,function(j,w){
            var num= w.Name.replace(/[^0-9]/ig,"");
            if(num == i && w.Name.indexOf("门外") != -1){
               cameraConfig['jiankong'+i] = {
                  Id:w.Id,
                  isOnline:w.IsOnline
               };
               return false;
            }
         })
      }
   }
   init();
   }
  ];
  return communityCtrl;
});