  /**
 *依图对接人脸公共js
 *create by lzh 2018-01-16
 */
define(['jquery', 'angular'], function($, angular) {
    // var yituFace_domain = "http://15.233.18.229:11180/business/api";
    var yituFace_domain = "http://15.233.18.20:11180/business/api";
    var sessionId = "";
    //设置cookie
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    //删除cookies 
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

    //读取cookies 
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }
    //获取摄像机列表，获取到摄像机后存储到localStorage
    var yitu_getCameraList = function(param,callBack) {
        $.ajax({
            type: "get",
            url: "business/api/camera?depth=3&predecessor_id=2", // 注意，这里的depth和predecessor固定的定法哈，具体业务请咨询依图技术人员
            dataType: "json",
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                setCookie("session_id", sessionId);
            },
            success: function(data) {
                var cameraList=[];
                if(data.rtn==0){
                   for (var i=0;i<data.cameras.length;i++) {
                      cameraList.push({ 'id': data.cameras[i].id , 'name': data.cameras[i].name });
                   }
                }
                localStorage.setItem('yitu_camerasList',JSON.stringify(cameraList));
            }
        });
    }

    //登录接口
    var yitu_login = function() {
        // debugger;
        var name = "dfwl";
        var password = hex_md5("dfwl");
        var param = JSON.stringify({
            "name": name,
            "password": password
        });
        $.post("business/api/login", param, function(data) {
            if (0 == data.rtn) {
                sessionId = data.session_id;
                yitu_getCameraList()
                yitu_queryRepositoryTask()
                yitu_getRepositorys()
                return data;
            }
        }, "json");
    };
    //感知发现incoming_dossier 感知离开leaving_dossier
    var yitu_dossier = function(tags,region_ids,callBack) {
        var param = {
            "tags":[],
            "region_ids":[]
        };
        param.tags.push(tags);
        param.region_ids = param.region_ids.concat(region_ids);
        // param.region_ids.push(region_ids);
        param=JSON.stringify(param);
        $.ajax({
            type: "post",
            url: "/opod/v2/dossier_set/advanced_statistic_query",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                // debugger
               // console.log("人脸抓拍" + data);
                callBack(data)
                return data;
            }
        });
    };
    var yitu_incomingAndLeaving=function(region_ids,callBack){
        var num=0;
        var obj={
              incoming_dossier:{},
              leaving_dossier:{}
        };
        yitu_dossier("incoming_dossier",region_ids,function(data){
                num++;
                $.each(data.statistic_info,function(i,v){
                     obj.incoming_dossier[v.region_id]=v.delta_num;
                });
                if(num==2){
                    callBack(obj);
                }    
           });
        yitu_dossier("leaving_dossier",region_ids,function(data){
                num++;
                $.each(data.statistic_info,function(i,v){
                     obj.leaving_dossier[v.region_id]=v.delta_num;
                });
                if(num==2){
                    callBack(obj);
                }
            });
    }
    //yitu_dossier();
    //获取人像库(repository)
    var RepositorysList=[];
    var yitu_getRepositorys= function(param,callBack) {
        $.ajax({
            type: "get",
            url: "business/api/repository",
            dataType: "json",
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                setCookie("session_id", sessionId);
            },
            success: function(data) {
                var repositoryArr = [];
                if(data.rtn == 0){
                    repositoryArr = data.results;
                }
                localStorage.setItem('yitu_repositoryList',JSON.stringify(repositoryArr));
            }
        });
    }
   
    //查询布控任务
    var yitu_queryRepositoryTask = function() {
        $.ajax({
            type: "get",
            url: "business/api/surveillance/task",
            dataType: "json",
            headers:{session_id:sessionId},
            beforeSend: function(xhr) {
                delCookie("session_id");
                setCookie("session_id", sessionId);
            },
            success: function(data) {
                var surveillancesArr = [];
                if(data.rtn == 0){
                    surveillancesArr = data.surveillances;
                }
                localStorage.setItem('yitu_surveillancesList',JSON.stringify(surveillancesArr));
            }
        });
    };

    //获取所有集群的id
    var yitu_getClusterIds = function() {
        $.ajax({
            type: "get",
            url: "business/api/cluster_ids",
            dataType: "json",
            // headers:{session_id:sessionId},
            beforeSend: function(xhr) {
                delCookie("session_id");
                setCookie("session_id", sessionId);
            },
            success: function(data) {
                return data;
            }
        });
    };

    //人脸抓拍接口 capture/fetch（所有小区）
    var yitu_getFacePics = function(param, callBack) {
        var param = JSON.stringify(param);
        $.ajax({
            type: "post",
            url: "business/api/capture/fetch",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                //console.log("人脸抓拍" + data);
                callBack(data)
                return data;
            }
        });
    };

    //人脸抓拍接口 （可以查询单小区，单个摄像头）
    var yitu_getFacePicsByCondition = function(param, callBack) {
        var param = JSON.stringify(param);
        $.ajax({
            type: "post",
            timeout:'4000',
            url: "business/api/condition/query_camera",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
               // console.log("人脸抓拍" + data);
                callBack(data)
                return data;
            }
        });
    };

    //人脸检索(对比)接口  和路人检索 传摄像头id
    var yitu_contrastFace = function(param, callBack) {
       // param.retrieval['repository_ids']=['248@DEFAULT'];
        param = JSON.stringify(param);
        $.ajax({
            type: "post",
            url: "business/api/retrieval_camera",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                //console.log("人脸对比" + data);
                callBack(data);
            }
        });
    };
    //人脸检索(对比)接口  和人像库检索 传库id
    var yitu_contrastFaceAll = function(param, callBack) {
       // param.retrieval['repository_ids']=['248@DEFAULT'];
        param = JSON.stringify(param);
        $.ajax({
            type: "post",
            url: "business/api/retrieval_repository",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                //console.log("人脸对比" + data);
                callBack(data);
            }
        });
    };

    //报警查询接口(实有力量，关注人员)
    var yitu_alarm = function(param, callBack) {
        var param = JSON.stringify(param);
        $.ajax({
            type: "post",
            timeout:'4000',
            url: "business/api/hit/alert",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                callBack(data);
            }
        });
    };

    //上传照片接口 repository/picture/synchronized
    var yitu_upLoadPic = function(param, callBack) {
        var param = JSON.stringify(param);
        $.ajax({
            type: "post",
            url: "business/api/repository/picture/synchronized",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
            },
            success: function(data) {
                callBack(data);
                return data;
            }
        });
    };
    //图片读取接口
    var yitu_getPic = function(param, callBack) {
        // var param = JSON.stringify(param);
        $.ajax({
            type: "GET",
            url: "business/api/storage/image",
            dataType: "",
            contentType: 'application/json;charset=UTF-8',
            data: param,
            headers: { session_id: sessionId },
            beforeSend: function(xhr) {
                delCookie("session_id");
                // setCookie("session_id","656038078@DEFAULT");
            },
            success: function(data) {
                callBack(data);
                return data;
            },
            error:function(data){
                console.log(data)
            }
        });
    };

    // 处理图片为base64格式，并去掉前面的 'data:image/png;base64,'
    var yitu_imageToBase64 = function(resource, callback){
        if(resource){
            var IM = null;
            IM = document.createElement('img');
            IM.setAttribute('crossOrigin', 'anonymous');
            // IM.src = yituFace_domain + "/storage/image?uri_base64=" + resource;
            IM.src = resource;
            IM.onload = function(){
                var frameCanvas = document.createElement('canvas');
                    frameCanvas.width = IM.width;
                    frameCanvas.height = IM.height;
                var canvasFill = frameCanvas.getContext('2d')
                    canvasFill.drawImage(IM, 0, 0);
                var base64enCode = frameCanvas.toDataURL('image/png', .9);
                var base64enCodeSplit = base64enCode.substring(22)
                callback(base64enCodeSplit)
            }
        }
    }
    //获取与依图相关摄像头信息接口
    
    yitu_login();
    return {
        yituFace_domain: yituFace_domain,
        yituFace_Pic: yituFace_domain + "/storage/image?uri_base64=",
        yitu_login: yitu_login,
        yitu_getRepositorys: yitu_getRepositorys,
        // // yitu_queryRepositoryTask: yitu_queryRepositoryTask,
        yitu_getCameraList:yitu_getCameraList,
        yitu_getClusterIds: yitu_getClusterIds,
        yitu_getFacePics: yitu_getFacePics,
        yitu_getFacePicsByCondition: yitu_getFacePicsByCondition,
        yitu_contrastFace: yitu_contrastFace,
        yitu_alarm: yitu_alarm,
        yitu_contrastFaceAll: yitu_contrastFaceAll,
        yitu_dossier:yitu_dossier,
        yitu_upLoadPic:yitu_upLoadPic,
        yitu_incomingAndLeaving:yitu_incomingAndLeaving,
        yitu_getPic:yitu_getPic,
        yitu_imageToBase64: yitu_imageToBase64
    };
});
